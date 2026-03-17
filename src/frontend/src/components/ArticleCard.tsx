import { Badge } from "@/components/ui/badge";
import type { SampleArticle } from "@/data/sampleArticles";
import { Link } from "@tanstack/react-router";
import { Calendar, User } from "lucide-react";

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

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function timeAgo(date: Date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return formatDate(date);
}

interface Props {
  article: SampleArticle;
  variant?: "default" | "featured" | "compact";
  index?: number;
}

export default function ArticleCard({
  article,
  variant = "default",
  index = 0,
}: Props) {
  const colorClass =
    categoryColors[article.category] ?? "bg-gray-100 text-gray-800";

  if (variant === "featured") {
    return (
      <Link
        to="/article/$id"
        params={{ id: String(article.id) }}
        data-ocid={`articles.item.${index + 1}`}
        className="group block relative overflow-hidden rounded-lg article-card bg-card shadow-card"
      >
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          {article.isBreaking && (
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-sm tracking-wider uppercase breaking-pulse">
                Breaking
              </span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider mb-3 inline-block ${colorClass}`}
            >
              {article.category}
            </span>
            <h2 className="font-display text-xl md:text-3xl font-bold leading-tight mb-2 text-white">
              {article.title}
            </h2>
            <p className="text-white/80 text-sm line-clamp-2 font-body">
              {article.summary}
            </p>
            <div className="flex items-center gap-4 mt-3 text-white/60 text-xs font-body">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" /> {article.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {timeAgo(article.publishedAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        to="/article/$id"
        params={{ id: String(article.id) }}
        data-ocid={`articles.item.${index + 1}`}
        className="group flex gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
      >
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-20 h-14 object-cover rounded flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${colorClass}`}
          >
            {article.category}
          </span>
          <h4 className="font-body font-semibold text-sm leading-snug mt-1 line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {timeAgo(article.publishedAt)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/article/$id"
      params={{ id: String(article.id) }}
      data-ocid={`articles.item.${index + 1}`}
      className="group block rounded-lg overflow-hidden article-card bg-card shadow-card border border-border/50"
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {article.isBreaking && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider breaking-pulse">
            Breaking
          </span>
        )}
      </div>
      <div className="p-4">
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${colorClass}`}
        >
          {article.category}
        </span>
        <h3 className="font-display text-base font-bold leading-snug mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 font-body mb-3">
          {article.summary}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" /> {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {timeAgo(article.publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
