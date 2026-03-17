import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, X, Zap } from "lucide-react";
import { useState } from "react";

const categories = [
  { label: "Politics", value: "politics" },
  { label: "Local", value: "local" },
  { label: "Business", value: "business" },
  { label: "Sports", value: "sports" },
  { label: "Technology", value: "technology" },
  { label: "Health", value: "health" },
  { label: "Entertainment", value: "entertainment" },
  { label: "National", value: "national" },
  { label: "World", value: "world" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/search", search: { q: searchQuery.trim() } });
      setSearchQuery("");
    }
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 header-sticky bg-white/95 border-b border-border shadow-xs">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <span className="font-body opacity-90">{dateStr}</span>
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              data-ocid="header.admin.link"
              className="hover:underline opacity-90 hover:opacity-100"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" data-ocid="header.home.link">
          <div className="flex items-center gap-2">
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
                Assam News 7
              </span>
              <span className="text-[10px] font-body text-muted-foreground tracking-widest uppercase">
                Guwahati · Assam · Northeast India
              </span>
            </div>
          </div>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2 flex-1 max-w-md ml-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              data-ocid="header.search_input"
              type="search"
              placeholder="Search news, topics, people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-secondary border-border"
            />
          </div>
          <Button
            data-ocid="header.search.button"
            type="submit"
            size="sm"
            variant="default"
            className="h-9"
          >
            Search
          </Button>
        </form>

        {/* Mobile menu toggle */}
        <button
          type="button"
          data-ocid="header.menu.toggle"
          className="md:hidden p-2 rounded hover:bg-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Nav bar */}
      <nav className="border-t border-border bg-foreground text-primary-foreground hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-0 overflow-x-auto">
            {categories.map((cat) => (
              <li key={cat.value}>
                <Link
                  to="/category/$category"
                  params={{ category: cat.value }}
                  data-ocid={`nav.${cat.value}.link`}
                  className="block px-4 py-2.5 text-sm font-body font-medium text-white/80 hover:text-white hover:bg-primary transition-colors whitespace-nowrap"
                  activeProps={{ className: "bg-primary text-white" }}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
            <li className="ml-auto">
              <Link
                to="/admin"
                data-ocid="nav.admin.link"
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-body font-medium text-accent-foreground bg-accent hover:brightness-110 transition-all"
              >
                <Zap className="h-3.5 w-3.5" />
                Live
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border shadow-lg">
          <form onSubmit={handleSearch} className="flex gap-2 p-4">
            <Input
              data-ocid="header.mobile.search_input"
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button
              data-ocid="header.mobile.search.button"
              type="submit"
              size="sm"
            >
              Go
            </Button>
          </form>
          <ul className="pb-2">
            {categories.map((cat) => (
              <li key={cat.value}>
                <Link
                  to="/category/$category"
                  params={{ category: cat.value }}
                  data-ocid={`nav.mobile.${cat.value}.link`}
                  className="block px-6 py-3 text-sm font-body hover:bg-secondary border-b border-border/50"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
