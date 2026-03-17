import ArticleCard from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { sampleArticles } from "@/data/sampleArticles";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { motion } from "motion/react";

const categoryColors: Record<string, string> = {
  politics: "bg-red-100 text-red-800",
  business: "bg-blue-100 text-blue-800",
  sports: "bg-green-100 text-green-800",
  technology: "bg-purple-100 text-purple-800",
  health: "bg-teal-100 text-teal-800",
  entertainment: "bg-pink-100 text-pink-800",
  local: "bg-orange-100 text-orange-800",
  national: "bg-indigo-100 text-indigo-800",
  world: "bg-gray-100 text-gray-800",
};

export default function ArticlePage() {
  const { id } = useParams({ from: "/article/$id" });
  const article = sampleArticles.find((a) => String(a.id) === id);

  if (!article) {
    return (
      <main
        className="max-w-4xl mx-auto px-4 py-16 text-center"
        data-ocid="article.error_state"
      >
        <h1 className="font-display text-3xl font-bold mb-4">
          Article Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          data-ocid="article.back.link"
          className="text-primary hover:underline"
        >
          ← Back to Home
        </Link>
      </main>
    );
  }

  const related = sampleArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const colorClass =
    categoryColors[article.category] ?? "bg-gray-100 text-gray-800";

  const paragraphs = article.content.split("\n\n");

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <Link
        to="/"
        data-ocid="article.back.link"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 font-body transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <motion.article
          data-ocid="article.panel"
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider ${colorClass}`}
          >
            {article.category}
          </span>
          {article.isBreaking && (
            <span className="ml-2 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider breaking-pulse">
              Breaking
            </span>
          )}

          <h1 className="font-display text-2xl md:text-4xl font-bold leading-tight mt-3 mb-4">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground font-body leading-relaxed mb-5 border-l-4 border-primary pl-4">
            {article.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-body mb-5 pb-5 border-b border-border">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {article.publishedAt.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full rounded-lg object-cover aspect-video mb-6 shadow-card"
            loading="lazy"
          />

          <div className="prose prose-lg max-w-none font-body">
            {paragraphs.map((paragraph, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: paragraph content changes with article
              <p key={i} className="mb-4 text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {article.tags.length > 0 && (
            <div className="mt-8 pt-5 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {article.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs font-body"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </motion.article>

        {/* Sidebar */}
        <aside data-ocid="article.related.panel" className="space-y-4">
          <h3 className="font-display text-lg font-bold border-b border-border pb-2">
            Related Articles
          </h3>
          {related.length > 0 ? (
            related.map((r, i) => (
              <ArticleCard key={r.id} article={r} variant="compact" index={i} />
            ))
          ) : (
            <div
              data-ocid="article.related.empty_state"
              className="text-sm text-muted-foreground font-body py-4"
            >
              No related articles found.
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
