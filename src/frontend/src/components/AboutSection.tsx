import { Mail, Trophy, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { usePartnerInfo } from "../hooks/useQueries";

export default function AboutSection() {
  const { data: partner } = usePartnerInfo();

  return (
    <section
      id="about"
      className="py-24 px-6 bg-[oklch(0.11_0.007_240)]"
      data-ocid="about.section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs tracking-[0.4em] text-gold mb-3 uppercase">
            Our Story
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-wide">
            ABOUT
            <span className="text-gold"> GC MOTORS</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              GC Motors is the ultimate luxury car simulation experience —
              meticulously crafted for those who demand perfection. We've
              partnered with automotive historians, engineers, and designers to
              bring the most authentic driving experience to your screen.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              Every stitch of leather, every carbon fiber weave, every
              instrument cluster has been recreated with obsessive attention to
              detail. This isn't just a game — it's an automotive museum you can
              drive.
            </p>

            {partner && (
              <div className="card-glass rounded-xl p-6 border border-gold/20">
                <p className="font-display text-xs tracking-widest text-gold mb-3 uppercase">
                  Partnership
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-gold" />
                  <span className="font-display text-base font-bold text-foreground">
                    {partner.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold" />
                  <a
                    href={`mailto:${partner.contactEmail}`}
                    className="font-body text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {partner.contactEmail}
                  </a>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              {
                icon: Zap,
                title: "Ultra HD",
                desc: "4K textures with ray-traced reflections and HDR lighting",
              },
              {
                icon: Trophy,
                title: "Tournament Mode",
                desc: "Compete in weekly championships for exclusive car unlocks",
              },
              {
                icon: Users,
                title: "Community",
                desc: "Join millions of luxury car enthusiasts worldwide",
              },
              {
                icon: Mail,
                title: "Stay Updated",
                desc: "Get notified when GC Motors launches in 2026",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="card-glass rounded-xl p-5"
              >
                <item.icon className="w-8 h-8 text-gold mb-3" />
                <h3 className="font-display text-sm font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
