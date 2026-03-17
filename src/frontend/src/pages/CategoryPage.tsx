import ArticleCard from "@/components/ArticleCard";
import { sampleArticles } from "@/data/sampleArticles";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

const categoryLabels: Record<string, string> = {
  politics: "Politics",
  business: "Business",
  sports: "Sports",
  technology: "Technology",
  health: "Health",
  entertainment: "Entertainment",
  local: "Local",
  national: "National",
  world: "World",
};

export default function CategoryPage() {
  const { category } = useParams({ from: "/category/$category" });
  const articles = sampleArticles.filter((a) => a.category === category);
  const label = categoryLabels[category] ?? category;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 font-body">
        <Link
          to="/"
          data-ocid="category.home.link"
          className="hover:text-foreground transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{label}</span>
      </nav>

      <div className="flex items-center gap-3 mb-8">
        <h1 className="font-display text-3xl font-bold border-l-4 border-primary pl-3">
          {label} News
        </h1>
        <span className="text-muted-foreground font-body text-sm">
          {articles.length} stories
        </span>
      </div>

      {articles.length > 0 ? (
        <div
          data-ocid="category.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <ArticleCard article={article} index={i} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div data-ocid="category.empty_state" className="py-20 text-center">
          <p className="font-display text-2xl font-bold text-muted-foreground mb-3">
            No articles yet
          </p>
          <p className="text-muted-foreground font-body">
            Check back soon for the latest {label} news from Assam.
          </p>
          <Link
            to="/"
            data-ocid="category.home.button"
            className="mt-4 inline-block text-primary hover:underline font-body"
          >
            ← Back to Home
          </Link>
        </div>
      )}
    </main>
  );
}
