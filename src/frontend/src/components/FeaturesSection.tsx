import { Car, Cloud, Cpu, Globe, Users, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { useGameFeatures } from "../hooks/useQueries";

const featureIcons = [Cpu, Car, Globe, Users, Cloud, Wrench];

const featureDetails = [
  "Sub-frame physics simulation with accurate weight distribution, tire deformation, and aerodynamic modeling.",
  "Photorealistic interiors with real-time dashboard rendering, working gauges, and animated controls.",
  "Explore 500km² of seamlessly connected environments including city streets, mountain passes, and race circuits.",
  "Race against 31 opponents worldwide with dedicated servers, leaderboards, and live events.",
  "Real-time weather transitions, fog, rain on windshield, sun glare, and full 24-hour day/night cycle.",
  "Deep customization with 10,000+ visual and performance parts. Paint, wrap, tune, and personalize.",
];

export default function FeaturesSection() {
  const { data: features = [] } = useGameFeatures();

  return (
    <section
      id="features"
      className="py-24 px-6 bg-[oklch(0.11_0.007_240)]"
      data-ocid="features.section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs tracking-[0.4em] text-gold mb-3 uppercase">
            What Sets Us Apart
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-wide">
            KEY GAME
            <span className="text-gold"> FEATURES</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            const detail = featureDetails[index] ?? "";
            return (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group card-glass rounded-2xl p-8 hover:glow-gold transition-all duration-500"
                data-ocid={`features.item.${index + 1}`}
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-display text-lg font-bold tracking-wide text-foreground mb-3">
                  {feature}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {detail}
                </p>

                {/* Bottom accent */}
                <div className="mt-6 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gold to-transparent transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
