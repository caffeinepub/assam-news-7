import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sampleArticles } from "@/data/sampleArticles";
import { Link, useSearch } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function SearchPage() {
  const searchParams = useSearch({ from: "/search" });
  const q = (searchParams as { q?: string }).q ?? "";
  const [inputVal, setInputVal] = useState(q);
  const navigate = useNavigate();

  const results = q
    ? sampleArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(q.toLowerCase()) ||
          a.summary.toLowerCase().includes(q.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(q.toLowerCase())),
      )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: { q: inputVal.trim() } });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-6">Search News</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            data-ocid="search.search_input"
            type="search"
            placeholder="Search for news, topics, people..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button data-ocid="search.submit_button" type="submit">
          Search
        </Button>
      </form>

      {q && (
        <p className="text-muted-foreground font-body text-sm mb-5">
          {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
          <strong>"{q}"</strong>
        </p>
      )}

      {results.length > 0 ? (
        <div
          data-ocid="search.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {results.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <ArticleCard article={article} index={i} />
            </motion.div>
          ))}
        </div>
      ) : q ? (
        <div data-ocid="search.empty_state" className="py-20 text-center">
          <p className="font-display text-2xl font-bold text-muted-foreground mb-3">
            No results found
          </p>
          <p className="text-muted-foreground font-body">
            Try different keywords or browse by category.
          </p>
          <Link
            to="/"
            data-ocid="search.home.link"
            className="mt-4 inline-block text-primary hover:underline font-body"
          >
            ← Browse all news
          </Link>
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="font-display text-2xl text-muted-foreground">
            Enter a search term to find news
          </p>
        </div>
      )}
    </main>
  );
}
