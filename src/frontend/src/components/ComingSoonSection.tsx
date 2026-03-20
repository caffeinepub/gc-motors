import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useReleaseDate } from "../hooks/useQueries";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export default function ComingSoonSection() {
  const { data: releaseTimestamp } = useReleaseDate();
  const releaseDate = releaseTimestamp
    ? new Date(Number(releaseTimestamp))
    : new Date("2026-01-01");
  const countdown = useCountdown(releaseDate);

  const countdownItems = [
    { value: countdown.days, label: "DAYS" },
    { value: countdown.hours, label: "HRS" },
    { value: countdown.minutes, label: "MINS" },
    { value: countdown.seconds, label: "SECS" },
  ];

  return (
    <section
      id="coming-soon"
      className="py-24 px-6"
      data-ocid="coming-soon.section"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/assets/generated/coming-soon-bg.dim_1600x600.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.09_0.008_240/0.92)] via-[oklch(0.09_0.008_240/0.7)] to-[oklch(0.09_0.008_240/0.92)]" />
          <div className="absolute inset-0 border border-gold/30 rounded-3xl" />

          {/* Gold glow top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="relative z-10 py-20 px-8 md:px-16 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-display text-xs tracking-[0.5em] text-gold mb-6 uppercase"
            >
              GC Motors — 2026
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-6xl md:text-9xl font-black uppercase tracking-wide text-glow-gold text-gold mb-4"
            >
              COMING
              <br />
              SOON
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="font-display text-sm tracking-[0.3em] text-muted-foreground mb-12 uppercase"
            >
              THE ULTIMATE RIDE IS NEAR | 2026
            </motion.p>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex justify-center gap-4 md:gap-8"
              data-ocid="coming-soon.panel"
            >
              {countdownItems.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 md:gap-8"
                >
                  <div className="text-center">
                    <div className="card-glass rounded-xl px-4 md:px-8 py-4 mb-2">
                      <span className="font-display text-4xl md:text-6xl font-black text-gold tabular-nums">
                        {String(item.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="font-display text-xs tracking-[0.3em] text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  {i < countdownItems.length - 1 && (
                    <span className="font-display text-3xl text-gold/50 font-black mb-6">
                      :
                    </span>
                  )}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="mt-12"
            >
              <a
                href="#about"
                className="font-display text-sm font-bold tracking-widest px-10 py-4 rounded-full bg-gold text-background hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
                data-ocid="coming-soon.primary_button"
              >
                NOTIFY ME
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
