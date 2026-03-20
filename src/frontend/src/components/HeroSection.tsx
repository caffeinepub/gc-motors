import { motion } from "motion/react";
import { Suspense, lazy } from "react";

const HeroCar3D = lazy(() => import("./HeroCar3D"));

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-ocid="hero.section"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.09_0.008_240/0.7)] via-[oklch(0.09_0.008_240/0.5)] to-[oklch(0.09_0.008_240/0.95)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.09_0.008_240/0.6)] via-transparent to-[oklch(0.09_0.008_240/0.6)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-left"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-xs tracking-[0.4em] text-gold mb-4 uppercase"
          >
            The Ultimate Racing Experience
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="font-display text-5xl md:text-7xl font-black uppercase leading-tight mb-6"
          >
            <span className="text-gold text-glow-gold">GC</span>
            <br />
            <span className="text-foreground">MOTORS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-body text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
          >
            Experience the most authentic luxury car simulation ever created.
            Eight elite manufacturers. Immersive interiors. Unmatched realism.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="https://www.tile.dev/web-preview.html?id=b1d751d1-ba53-434d-80ee-2fa4f3c163f2"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-sm font-bold tracking-widest px-8 py-3 rounded-full bg-gold text-background hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
              data-ocid="hero.primary_button"
            >
              BUY YOUR CAR
            </a>
            <a
              href="#features"
              className="font-display text-sm font-bold tracking-widest px-8 py-3 rounded-full border border-gold text-gold hover:bg-gold hover:text-background transition-all duration-300"
              data-ocid="hero.secondary_button"
            >
              EXPLORE FEATURES
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-12 grid grid-cols-3 gap-6"
          >
            {[
              { value: "8", label: "Luxury Brands" },
              { value: "32", label: "Online Players" },
              { value: "4K", label: "Resolution" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-black text-gold">
                  {stat.value}
                </div>
                <div className="font-body text-xs tracking-widest text-muted-foreground uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D Car */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
          className="h-80 md:h-[500px] w-full"
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="font-display text-gold text-sm tracking-widest animate-pulse">
                  LOADING 3D...
                </div>
              </div>
            }
          >
            <HeroCar3D />
          </Suspense>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-display text-xs tracking-widest text-gold/60">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-0.5 h-8 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
