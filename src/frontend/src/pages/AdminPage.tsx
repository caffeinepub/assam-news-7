import type { Category } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { type SampleArticle, sampleArticles } from "@/data/sampleArticles";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface ArticleForm {
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  imageUrl: string;
  tags: string;
  isBreaking: boolean;
}

const defaultForm: ArticleForm = {
  title: "",
  summary: "",
  content: "",
  category: "local",
  author: "",
  imageUrl: "",
  tags: "",
  isBreaking: false,
};

const categories = [
  "politics",
  "business",
  "sports",
  "technology",
  "health",
  "entertainment",
  "local",
  "national",
  "world",
];

export default function AdminPage() {
  const { login, clear, loginStatus, identity, isLoggingIn } =
    useInternetIdentity();
  const { actor } = useActor();
  const isLoggedIn = !!identity;

  const [articles, setArticles] = useState<SampleArticle[]>(sampleArticles);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ArticleForm>(defaultForm);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const nextId = Math.max(...articles.map((a) => a.id), 100) + 1;

  const openCreate = () => {
    setEditingId(null);
    setForm(defaultForm);
    setDialogOpen(true);
  };

  const openEdit = (article: SampleArticle) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      summary: article.summary,
      content: article.content,
      category: article.category,
      author: article.author,
      imageUrl: article.imageUrl,
      tags: article.tags.join(", "),
      isBreaking: article.isBreaking,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    setIsSaving(true);
    try {
      const tags = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      if (editingId !== null) {
        setArticles((prev) =>
          prev.map((a) => (a.id === editingId ? { ...a, ...form, tags } : a)),
        );
        if (actor) {
          await actor.updateArticle(
            BigInt(editingId),
            form.title,
            form.summary,
            form.content,
            form.category as Category,
            form.author,
            form.imageUrl || null,
            tags,
          );
        }
        toast.success("Article updated");
      } else {
        const newArticle: SampleArticle = {
          id: nextId,
          title: form.title,
          summary: form.summary,
          content: form.content,
          category: form.category,
          author: form.author,
          imageUrl:
            form.imageUrl || `https://picsum.photos/800/450?random=${nextId}`,
          tags,
          isBreaking: form.isBreaking,
          publishedAt: new Date(),
          visible: true,
          source: "manual",
        };
        setArticles((prev) => [newArticle, ...prev]);
        if (actor) {
          await actor.createArticle(
            form.title,
            form.summary,
            form.content,
            form.category as Category,
            form.author,
            form.imageUrl || null,
            tags,
            form.isBreaking,
          );
        }
        toast.success("Article created");
      }
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.success(
        editingId ? "Article updated locally" : "Article created locally",
      );
      setDialogOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteTarget(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (deleteTarget === null) return;
    setArticles((prev) => prev.filter((a) => a.id !== deleteTarget));
    if (actor) {
      try {
        await actor.deleteArticle(BigInt(deleteTarget));
      } catch (_) {}
    }
    toast.success("Article deleted");
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  const handleFetchNews = async () => {
    setIsFetching(true);
    try {
      if (actor) {
        await actor.fetchAndImportExternalNews();
        toast.success("External news fetched and imported!");
      } else {
        toast.error("Please connect to fetch news");
      }
    } catch (_err) {
      toast.error("Failed to fetch news. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-secondary flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-xl shadow-elevated p-8 w-full max-w-md text-center"
          data-ocid="admin.dialog"
        >
          <div className="mb-6">
            <h1 className="font-display text-3xl font-bold text-foreground mb-1">
              Admin Panel
            </h1>
            <p className="font-display text-primary text-lg font-semibold">
              Assam News 7
            </p>
          </div>
          <p className="text-muted-foreground font-body text-sm mb-8">
            Sign in with Internet Identity to manage articles, publish breaking
            news, and import external stories.
          </p>
          <Button
            data-ocid="admin.login.primary_button"
            onClick={() => login()}
            disabled={isLoggingIn}
            className="w-full h-12 text-base"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Signing in...
              </>
            ) : (
              "Sign In to Admin"
            )}
          </Button>
          {loginStatus === "loginError" && (
            <p
              data-ocid="admin.login.error_state"
              className="text-destructive text-sm mt-3 font-body"
            >
              Login failed. Please try again.
            </p>
          )}
        </motion.div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground font-body text-sm mt-1">
            {identity?.getPrincipal().toString().slice(0, 20)}...
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            data-ocid="admin.fetch-news.button"
            variant="outline"
            onClick={handleFetchNews}
            disabled={isFetching}
          >
            {isFetching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Fetching...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" /> Fetch Latest News
              </>
            )}
          </Button>
          <Button data-ocid="admin.create.primary_button" onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" /> New Article
          </Button>
          <Button
            data-ocid="admin.logout.button"
            variant="ghost"
            size="sm"
            onClick={() => clear()}
          >
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Articles", value: articles.length },
          {
            label: "Breaking News",
            value: articles.filter((a) => a.isBreaking).length,
          },
          {
            label: "Auto-Imported",
            value: articles.filter((a) => a.source === "auto").length,
          },
          { label: "Hidden", value: articles.filter((a) => !a.visible).length },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-lg p-4 border border-border shadow-xs"
          >
            <p className="text-2xl font-display font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-body mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Articles table */}
      <div
        data-ocid="admin.table"
        className="bg-card rounded-xl border border-border shadow-xs overflow-hidden"
      >
        <div className="p-4 border-b border-border">
          <h2 className="font-display text-xl font-bold">Articles</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article, i) => (
                <TableRow
                  key={article.id}
                  data-ocid={`admin.article.row.${i + 1}`}
                >
                  <TableCell className="max-w-xs">
                    <p className="font-body font-medium text-sm line-clamp-2">
                      {article.title}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {article.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground font-body">
                    {article.author}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {article.isBreaking && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-primary uppercase">
                          <Zap className="h-3 w-3" /> Breaking
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-body ${
                          article.visible
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {article.visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground font-body">
                    {article.publishedAt.toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        data-ocid={`admin.article.edit_button.${i + 1}`}
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(article)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        data-ocid={`admin.article.delete_button.${i + 1}`}
                        variant="ghost"
                        size="sm"
                        onClick={() => confirmDelete(article.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin.article.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingId ? "Edit Article" : "Create New Article"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="font-body text-sm font-medium">
                Title *
              </Label>
              <Input
                data-ocid="admin.article.title.input"
                id="title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Article headline"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="summary"
                className="font-body text-sm font-medium"
              >
                Summary
              </Label>
              <Textarea
                data-ocid="admin.article.summary.textarea"
                id="summary"
                value={form.summary}
                onChange={(e) =>
                  setForm((f) => ({ ...f, summary: e.target.value }))
                }
                placeholder="Brief summary of the article..."
                rows={2}
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="content"
                className="font-body text-sm font-medium"
              >
                Content *
              </Label>
              <Textarea
                data-ocid="admin.article.content.textarea"
                id="content"
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                placeholder="Full article content..."
                rows={8}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="font-body text-sm font-medium">
                  Category
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger data-ocid="admin.article.category.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="capitalize">
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="author"
                  className="font-body text-sm font-medium"
                >
                  Author
                </Label>
                <Input
                  data-ocid="admin.article.author.input"
                  id="author"
                  value={form.author}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, author: e.target.value }))
                  }
                  placeholder="Author name"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="imageUrl"
                className="font-body text-sm font-medium"
              >
                Image URL
              </Label>
              <Input
                data-ocid="admin.article.imageurl.input"
                id="imageUrl"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tags" className="font-body text-sm font-medium">
                Tags (comma-separated)
              </Label>
              <Input
                data-ocid="admin.article.tags.input"
                id="tags"
                value={form.tags}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tags: e.target.value }))
                }
                placeholder="Assam, Politics, Election"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                data-ocid="admin.article.breaking.checkbox"
                id="isBreaking"
                checked={form.isBreaking}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, isBreaking: !!v }))
                }
              />
              <Label
                htmlFor="isBreaking"
                className="font-body text-sm cursor-pointer"
              >
                Mark as Breaking News
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              data-ocid="admin.article.cancel_button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.article.save_button"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : editingId ? (
                "Update Article"
              ) : (
                "Publish Article"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent data-ocid="admin.delete.dialog" className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">Delete Article?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground font-body text-sm">
            This action cannot be undone. The article will be permanently
            removed.
          </p>
          <DialogFooter>
            <Button
              data-ocid="admin.delete.cancel_button"
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.delete.confirm_button"
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
