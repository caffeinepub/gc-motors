import { motion } from "motion/react";
import type { CarBrand } from "../backend.d";
import { useCarBrands } from "../hooks/useQueries";

const carImages: Record<string, string> = {
  "BMW M8 GTR": "/assets/generated/car-bmw-interior.dim_600x400.jpg",
  "Mercedes-AMG ONE": "/assets/generated/car-mercedes-interior.dim_600x400.jpg",
  "Lamborghini Huracán STO":
    "/assets/generated/car-lamborghini-interior.dim_600x400.jpg",
  "Ferrari SF90 Stradale":
    "/assets/generated/car-ferrari-interior.dim_600x400.jpg",
  "Rolls-Royce Phantom":
    "/assets/generated/car-rollsroyce-interior.dim_600x400.jpg",
  "Porsche 911 GT3 RS":
    "/assets/generated/car-porsche-interior.dim_600x400.jpg",
  "Aston Martin Valkyrie":
    "/assets/generated/car-astonmartin-interior.dim_600x400.jpg",
  "Bentley Continental GT":
    "/assets/generated/car-bentley-interior.dim_600x400.jpg",
};

const carColors: string[] = [
  "from-blue-900/30",
  "from-slate-800/30",
  "from-orange-900/30",
  "from-red-900/30",
  "from-emerald-900/30",
  "from-violet-900/30",
  "from-amber-900/30",
  "from-purple-900/30",
];

function CarCard({ car, index }: { car: CarBrand; index: number }) {
  const image = carImages[car.name];
  const colorClass = carColors[index % carColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative card-glass rounded-2xl overflow-hidden cursor-pointer"
      data-ocid={`car-brands.item.${index + 1}`}
    >
      <div className="relative h-52 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`${car.name} interior`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${colorClass} to-background flex items-center justify-center`}
          >
            <span className="font-display text-4xl font-black text-gold/30">
              {car.name.split(" ")[0][0]}
              {car.name.split(" ")[1]?.[0] ?? ""}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.13_0.008_240)] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6">
        <div className="mb-1">
          <span className="font-display text-[10px] tracking-[0.3em] text-gold uppercase">
            {car.tagline}
          </span>
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2 tracking-wide">
          {car.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {car.description}
        </p>

        <div className="mb-5">
          <p className="font-display text-[10px] tracking-widest text-gold/70 uppercase mb-2">
            Interior
          </p>
          <div className="flex flex-wrap gap-1.5">
            {car.interiorFeatures.slice(0, 3).map((feat) => (
              <span
                key={feat}
                className="text-[10px] font-body tracking-wide px-2 py-0.5 rounded-full border border-gold/20 text-muted-foreground bg-gold/5"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="w-full font-display text-xs font-bold tracking-widest py-2.5 rounded-lg border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-300"
          data-ocid={`car-brands.item.${index + 1}`}
        >
          VIEW SPECS
        </button>
      </div>
    </motion.div>
  );
}

export default function CarBrandsSection() {
  const { data: carBrands = [] } = useCarBrands();

  return (
    <section
      id="car-brands"
      className="py-24 px-6"
      data-ocid="car-brands.section"
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
            Premium Selection
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-wide text-foreground">
            EXPLORE THE <span className="text-gold"> ELITE </span> COLLECTION
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {carBrands.map((car, index) => (
            <CarCard key={car.name} car={car} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
