import ArticleCard from "@/components/ArticleCard";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import { sampleArticles } from "@/data/sampleArticles";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

const categoryConfig = [
  { key: "politics", label: "Politics" },
  { key: "sports", label: "Sports" },
  { key: "business", label: "Business" },
  { key: "technology", label: "Technology" },
];

export default function HomePage() {
  const featured = sampleArticles[0];
  const latest = sampleArticles.slice(1, 7);
  const sidebar = sampleArticles.slice(7);

  return (
    <main>
      <BreakingNewsTicker articles={sampleArticles} />

      {/* Hero section */}
      <section data-ocid="hero.section" className="max-w-7xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ArticleCard article={featured} variant="featured" index={0} />
            </motion.div>
          </div>
          <aside className="flex flex-col gap-1">
            <h3 className="font-body text-xs font-bold text-muted-foreground uppercase tracking-widest pb-2 border-b border-border mb-2">
              More Stories
            </h3>
            {sidebar.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <ArticleCard
                  article={article}
                  variant="compact"
                  index={i + 1}
                />
              </motion.div>
            ))}
          </aside>
        </div>
      </section>

      {/* Latest News Grid */}
      <section
        data-ocid="latest.section"
        className="max-w-7xl mx-auto px-4 mt-10"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl font-bold border-l-4 border-primary pl-3">
            Latest News
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <ArticleCard article={article} index={i} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Category sections */}
      {categoryConfig.map((cat) => {
        const catArticles = sampleArticles
          .filter((a) => a.category === cat.key)
          .slice(0, 3);
        if (catArticles.length === 0) return null;
        return (
          <section
            key={cat.key}
            data-ocid={`${cat.key}.section`}
            className="max-w-7xl mx-auto px-4 mt-10"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl font-bold border-l-4 border-primary pl-3">
                {cat.label}
              </h2>
              <Link
                to="/category/$category"
                params={{ category: cat.key }}
                data-ocid={`${cat.key}.view-all.link`}
                className="flex items-center gap-1 text-primary text-sm font-body font-medium hover:underline"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catArticles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <ArticleCard article={article} index={i} />
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}

      <div className="pb-12" />
    </main>
  );
}
