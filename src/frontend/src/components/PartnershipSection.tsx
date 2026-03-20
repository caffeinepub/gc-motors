import { Handshake } from "lucide-react";
import { motion } from "motion/react";

export default function PartnershipSection() {
  return (
    <section
      id="partnership"
      className="py-24 px-6 relative overflow-hidden"
      data-ocid="partnership.section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-display text-xs tracking-[0.4em] text-gold mb-3 uppercase">
            Official Partner
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-wide text-foreground">
            IN <span className="text-gold">PARTNERSHIP</span> WITH
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-glass rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 border border-gold/20"
        >
          <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center">
            <Handshake size={40} className="text-gold" />
          </div>

          <div className="text-center md:text-left">
            <p className="font-display text-xs tracking-[0.3em] text-gold/70 uppercase mb-2">
              Co-Founder &amp; Partner
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-black text-foreground tracking-wide mb-4">
              Aarav Taneja
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed max-w-md">
              A visionary partner who shares the passion for luxury automotive
              excellence. Together, we are building the most immersive car
              simulation experience ever made.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="font-display text-[10px] tracking-widest px-4 py-1.5 rounded-full border border-gold/30 text-gold/80 uppercase">
                Luxury Automotive
              </span>
              <span className="font-display text-[10px] tracking-widest px-4 py-1.5 rounded-full border border-gold/30 text-gold/80 uppercase">
                Game Strategy
              </span>
              <span className="font-display text-[10px] tracking-widets px-4 py-1.5 rounded-full border border-gold/30 text-gold/80 uppercase">
                GC Motors
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
