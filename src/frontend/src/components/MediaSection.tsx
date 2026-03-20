import { Play } from "lucide-react";
import { motion } from "motion/react";

const mediaItems = [
  {
    title: "BMW M8 GTR — Nürburgring Lap",
    desc: "Full interior cockpit view on the legendary Green Hell.",
    image: "/assets/generated/car-bmw-interior.dim_600x400.jpg",
  },
  {
    title: "Mercedes-AMG ONE — F1 Tech Showcase",
    desc: "Explore the hybrid powertrain and F1-derived cockpit.",
    image: "/assets/generated/car-mercedes-interior.dim_600x400.jpg",
  },
  {
    title: "Ferrari SF90 — Hypercar Cinematic",
    desc: "Experience the Ferrari SF90 Stradale at full power.",
    image: "/assets/generated/car-ferrari-interior.dim_600x400.jpg",
  },
  {
    title: "Rolls-Royce Phantom — Luxury Tour",
    desc: "The most serene and opulent cabin ever rendered in a game.",
    image: "/assets/generated/car-rollsroyce-interior.dim_600x400.jpg",
  },
];

export default function MediaSection() {
  return (
    <section id="media" className="py-24 px-6" data-ocid="media.section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs tracking-[0.4em] text-gold mb-3 uppercase">
            In-Game Footage
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-wide">
            GAME
            <span className="text-gold"> MEDIA</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer card-glass"
              data-ocid={`media.item.${index + 1}`}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center group-hover:bg-gold/40 transition-all duration-300 group-hover:scale-110">
                    <Play
                      className="w-6 h-6 text-gold ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
