import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { usePartnerInfo } from "../hooks/useQueries";

export default function Footer() {
  const { data: partner } = usePartnerInfo();
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="bg-[oklch(0.10_0.007_240)] border-t border-gold/20 py-12 px-6"
      data-ocid="footer.section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="font-display text-2xl font-bold tracking-[0.2em] text-gold mb-3">
              GC MOTORS
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              The ultimate luxury car simulation experience. Eight elite
              manufacturers. Unmatched realism.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-display text-xs tracking-widest text-gold mb-2 uppercase">
              Navigation
            </p>
            {[
              { label: "Privacy Policy", href: "#home" },
              { label: "Terms of Service", href: "#home" },
              {
                label: "Contact",
                href: partner ? `mailto:${partner.contactEmail}` : "#home",
              },
              { label: "Community", href: "#home" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm text-muted-foreground hover:text-gold transition-colors"
                data-ocid="footer.link"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div>
            <p className="font-display text-xs tracking-widest text-gold mb-4 uppercase">
              Follow Us
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#home"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-all duration-200"
                  data-ocid="footer.link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="font-body text-sm text-muted-foreground">
            © {year} GC Motors. All rights reserved.
          </p>
          {partner && (
            <p className="font-body text-sm text-muted-foreground">
              Partner: <span className="text-gold">{partner.name}</span>
            </p>
          )}
          <p className="font-body text-sm text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              className="text-gold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
