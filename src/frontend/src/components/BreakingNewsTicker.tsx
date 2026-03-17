import type { SampleArticle } from "@/data/sampleArticles";
import { Link } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

interface Props {
  articles: SampleArticle[];
}

export default function BreakingNewsTicker({ articles }: Props) {
  const breaking = articles.filter((a) => a.isBreaking);
  if (breaking.length === 0) return null;

  const tickerText = breaking.map((a) => `● ${a.title}`).join("   ");

  return (
    <div className="bg-primary text-primary-foreground flex items-center overflow-hidden">
      <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-black/20 z-10">
        <AlertCircle className="h-4 w-4 breaking-pulse" />
        <span className="text-xs font-body font-bold tracking-widest uppercase whitespace-nowrap">
          Breaking
        </span>
      </div>
      <div className="flex-1 overflow-hidden py-2">
        <div className="ticker-animate text-sm font-body">
          {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}
        </div>
      </div>
    </div>
  );
}
