import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-foreground text-primary-foreground mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Assam News 7
            </h3>
            <p className="text-white/60 text-sm font-body leading-relaxed">
              Assam's most trusted source for breaking news, politics, business,
              sports, and culture from the heart of Northeast India.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-body font-semibold text-white uppercase tracking-wider text-xs mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {[
                "politics",
                "business",
                "sports",
                "technology",
                "health",
                "entertainment",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/category/$category"
                    params={{ category: cat }}
                    data-ocid={`footer.${cat}.link`}
                    className="text-white/60 hover:text-white text-sm font-body capitalize transition-colors"
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* News */}
          <div>
            <h4 className="font-body font-semibold text-white uppercase tracking-wider text-xs mb-4">
              Coverage
            </h4>
            <ul className="space-y-2">
              {[
                "Local News",
                "National",
                "World",
                "Opinions",
                "Breaking News",
              ].map((item) => (
                <li key={item}>
                  <span className="text-white/60 text-sm font-body">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-white uppercase tracking-wider text-xs mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/60 text-sm font-body">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Fancy Bazaar, Guwahati, Assam 781001</span>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm font-body">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 361 234 5678</span>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm font-body">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>news@asamnews7.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs font-body">
            © {year} Assam News 7. All rights reserved.
          </p>
          <p className="text-white/40 text-xs font-body">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 underline transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
