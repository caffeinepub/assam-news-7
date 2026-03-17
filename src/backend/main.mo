import Array "mo:core/Array";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import List "mo:core/List";
import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Explicit timestamp type
  type Timestamp = Time.Time;

  type Article = {
    id : Nat;
    title : Text;
    summary : Text;
    content : Text;
    category : Category;
    author : Text;
    publishedAt : Timestamp;
    imageUrl : ?Text;
    isBreaking : Bool;
    source : Source;
    tags : [Text];
    visible : Bool;
  };

  module Article {
    public func compare(article1 : Article, article2 : Article) : Order.Order {
      // Compare by id (stable unique identifier)
      Nat.compare(article1.id, article2.id);
    };

    public func compareByPublishedTime(article1 : Article, article2 : Article) : Order.Order {
      // Just compare publishedAt (timestamp) directly, since it's already of type Int (Time.Time)
      Int.compare(article1.publishedAt, article2.publishedAt);
    };
  };

  public type Category = {
    #politics;
    #business;
    #sports;
    #entertainment;
    #technology;
    #health;
    #local;
    #national;
    #world;
  };

  public type Source = {
    #manual;
    #auto;
  };

  // Persistent storage
  let articleStore = Map.empty<Nat, Article>();
  var nextArticleId = 0;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Public Queries - accessible to all users including guests
  public query ({ caller }) func getArticle(id : Nat) : async Article {
    switch (articleStore.get(id)) {
      case (null) { Runtime.trap("Article not found") };
      case (?article) {
        // Only admins can view hidden articles, guests and users can only view visible articles
        if (not article.visible and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Article not found");
        };
        article;
      };
    };
  };

  // Admin Functions - require admin role
  public shared ({ caller }) func createArticle(
    title : Text,
    summary : Text,
    content : Text,
    category : Category,
    author : Text,
    imageUrl : ?Text,
    tags : [Text],
    isBreaking : Bool
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create articles");
    };
    let articleId = nextArticleId;
    let newArticle : Article = {
      id = articleId;
      title;
      summary;
      content;
      category;
      author;
      publishedAt = Time.now();
      imageUrl;
      isBreaking;
      source = #manual;
      tags;
      visible = true;
    };
    articleStore.add(articleId, newArticle);
    nextArticleId += 1;
    articleId;
  };

  public shared ({ caller }) func updateArticle(
    id : Nat,
    title : Text,
    summary : Text,
    content : Text,
    category : Category,
    author : Text,
    imageUrl : ?Text,
    tags : [Text]
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update articles");
    };
    switch (articleStore.get(id)) {
      case (null) { Runtime.trap("Article not found") };
      case (?existingArticle) {
        let updatedArticle : Article = {
          existingArticle with
          title;
          summary;
          content;
          category;
          author;
          imageUrl;
          tags;
        };
        articleStore.add(id, updatedArticle);
      };
    };
  };

  public shared ({ caller }) func deleteArticle(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete articles");
    };
    switch (articleStore.get(id)) {
      case (null) { Runtime.trap("Article not found") };
      case (_existingArticle) {
        articleStore.remove(id);
      };
    };
  };

  public shared ({ caller }) func setBreakingNews(id : Nat, isBreaking : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set breaking news");
    };
    switch (articleStore.get(id)) {
      case (null) { Runtime.trap("Article not found") };
      case (?article) {
        let updatedArticle : Article = {
          article with
          isBreaking;
        };
        articleStore.add(id, updatedArticle);
      };
    };
  };

  public shared ({ caller }) func toggleArticleVisibility(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can toggle article visibility");
    };
    switch (articleStore.get(id)) {
      case (null) { Runtime.trap("Article not found") };
      case (?article) {
        let updatedArticle : Article = {
          article with
          visible = not article.visible;
        };
        articleStore.add(id, updatedArticle);
      };
    };
  };

  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    // No authorization needed - this is a callback for HTTP outcalls
    OutCall.transform(input);
  };

  public shared ({ caller }) func fetchAndImportExternalNews() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can fetch external news");
    };
    let rssUrl = "https://feeds.bbci.co.uk/news/india/rss.xml";
    switch (await getBBCIndiaNews(rssUrl, transform)) {
      case (null) { Runtime.trap("HTTP request failed") };
      case (?_responseBody) {
        Runtime.trap("Please use service worker for HTTP import and XML parsing");
      };
    };
  };

  func getBBCIndiaNews(url : Text, transform : OutCall.Transform) : async ?Text {
    try {
      let response = await OutCall.httpGetRequest(url, [], transform);
      ?response;
    } catch (error) {
      null;
    };
  };

  func textContainsKeyword(text : Text, keyword : Text) : Bool {
    text.toLower().contains(#text (keyword.toLower()));
  };

  func matchesCategory(article : Article, category : Category) : Bool {
    article.visible and article.category == category;
  };
};
