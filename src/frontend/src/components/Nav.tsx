import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "CAR BRANDS", href: "#car-brands" },
  { label: "FEATURES", href: "#features" },
  { label: "MEDIA", href: "#media" },
  { label: "ABOUT", href: "#about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePreOrder = () => {
    setMenuOpen(false);
    document
      .getElementById("coming-soon")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.13_0.008_240/0.95)] backdrop-blur-xl border-b border-[oklch(0.76_0.11_75/0.2)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="font-display text-xl font-bold tracking-[0.2em] text-gold"
          data-ocid="nav.link"
        >
          GC MOTORS
        </a>

        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm font-semibold tracking-widest text-muted-foreground hover:text-gold transition-colors duration-200"
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#coming-soon"
            className="font-display text-xs font-bold tracking-widest px-6 py-2 rounded-full border border-gold text-gold hover:bg-gold hover:text-background transition-all duration-300 glow-gold"
            data-ocid="nav.primary_button"
          >
            PRE-ORDER
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-gold p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[oklch(0.13_0.008_240/0.98)] backdrop-blur-xl border-b border-[oklch(0.76_0.11_75/0.2)] px-6 py-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-body font-semibold tracking-widest text-muted-foreground hover:text-gold transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handlePreOrder}
              className="font-display text-xs font-bold tracking-widest px-6 py-2 rounded-full border border-gold text-gold text-center"
              data-ocid="nav.primary_button"
            >
              PRE-ORDER
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
