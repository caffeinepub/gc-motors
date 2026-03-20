import { useQuery } from "@tanstack/react-query";
import type { CarBrand, PartnerInfo } from "../backend.d";
import { useActor } from "./useActor";

const FALLBACK_CAR_BRANDS: CarBrand[] = [
  {
    name: "BMW M8 GTR",
    tagline: "Ultimate Performance Machine",
    description:
      "625hp twin-turbo V8. The pinnacle of Bavarian engineering meets motorsport excellence.",
    interiorFeatures: [
      "Alcantara racing seats",
      "Carbon fiber trim",
      "Digital cockpit with HUD",
      "Ambient lighting system",
      "M-specific steering wheel",
    ],
  },
  {
    name: "Mercedes-AMG ONE",
    tagline: "F1 Technology, Road Legal",
    description:
      "1000+hp hybrid powertrain derived directly from Formula 1. The most advanced road car ever created.",
    interiorFeatures: [
      "AMG PETRONAS F1 livery",
      "Biometric steering wheel",
      "Titanium paddle shifters",
      "3D soundstage audio",
      "Kinematic seat adjustment",
    ],
  },
  {
    name: "Lamborghini Huracán STO",
    tagline: "Track-Born Street Legal Beast",
    description:
      "630hp naturally aspirated V10. Born on the racing circuit, unleashed on public roads.",
    interiorFeatures: [
      "Full Alcantara wraparound",
      "Lightweight racing bucket seats",
      "Hexagonal carbon fiber dashboard",
      "Fighter-jet HUD",
      "Telemetry display",
    ],
  },
  {
    name: "Ferrari SF90 Stradale",
    tagline: "Hybrid Hypercar King",
    description:
      "1000hp hybrid masterpiece combining Ferrari's F1 knowledge with electrification technology.",
    interiorFeatures: [
      "Manettino dial",
      "Curved instrument cluster",
      "eCorsa button",
      "Full leather with carbon accents",
      "Formula 1 derived UX",
    ],
  },
  {
    name: "Porsche 911 GT3 RS",
    tagline: "Naturally Aspirated Perfection",
    description:
      "525hp flat-six delivering the purest driving experience on the planet. Weissach Package included.",
    interiorFeatures: [
      "Weissach package leather",
      "Carbon roll cage",
      "Bucket seats",
      "Large tachometer focus",
      "Minimal purposeful design",
    ],
  },
  {
    name: "Aston Martin Valkyrie",
    tagline: "Adrian Newey-Designed Hypercar",
    description:
      "1000hp V12 codesigned by Red Bull Racing's Adrian Newey. The closest thing to an F1 car for the road.",
    interiorFeatures: [
      "Extreme recline pod seats",
      "Exposed carbon monocoque",
      "Fighter cockpit HUD",
      "Bespoke leather & titanium",
      "Biometric monitoring",
    ],
  },
  {
    name: "Bentley Continental GT",
    tagline: "Grand Touring Excellence",
    description:
      "650hp W12 engine powering the ultimate long-distance luxury sports car. Handcrafted in Crewe, England.",
    interiorFeatures: [
      "Hand-stitched Mulliner leather",
      "Rotating dashboard with analog clocks",
      "Naim premium audio",
      "Veneer wood trim",
      "Comfort Plus seats",
    ],
  },
  {
    name: "Rolls-Royce Phantom",
    tagline: "Pinnacle of Automotive Luxury",
    description:
      "563hp V12 whisking you in absolute serenity. The most prestigious automobile in the world.",
    interiorFeatures: [
      "Starlight headliner (1340 fiber-optic lights)",
      "Gallery dashboard",
      "Hand-stitched bespoke leather",
      "Whisper-quiet cabin",
      "Champagne cooler",
    ],
  },
];

const FALLBACK_FEATURES = [
  "Ultra-Realistic Physics Engine",
  "Detailed Luxury Interiors",
  "Open World Environments",
  "Online Multiplayer (32 Players)",
  "Dynamic Weather & Day/Night",
  "Customization Studio",
];

const FALLBACK_PARTNER: PartnerInfo = {
  name: "Aarav Taneja",
  contactEmail: "tanejaaarav22@gmail.com",
};

export function useCarBrands() {
  const { actor, isFetching } = useActor();
  return useQuery<CarBrand[]>({
    queryKey: ["carBrands"],
    queryFn: async () => {
      if (!actor) return FALLBACK_CAR_BRANDS;
      const data = await actor.getAllCarBrands();
      return data.length > 0 ? data : FALLBACK_CAR_BRANDS;
    },
    enabled: !!actor && !isFetching,
    placeholderData: FALLBACK_CAR_BRANDS,
  });
}

export function useGameFeatures() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["gameFeatures"],
    queryFn: async () => {
      if (!actor) return FALLBACK_FEATURES;
      const data = await actor.getGameFeatures();
      return data.length > 0 ? data : FALLBACK_FEATURES;
    },
    enabled: !!actor && !isFetching,
    placeholderData: FALLBACK_FEATURES,
  });
}

export function usePartnerInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<PartnerInfo>({
    queryKey: ["partnerInfo"],
    queryFn: async () => {
      if (!actor) return FALLBACK_PARTNER;
      const data = await actor.getPartnerInfo();
      return data.name ? data : FALLBACK_PARTNER;
    },
    enabled: !!actor && !isFetching,
    placeholderData: FALLBACK_PARTNER,
  });
}

export function useReleaseDate() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["releaseDate"],
    queryFn: async () => {
      if (!actor) return BigInt(new Date("2026-01-01").getTime());
      const data = await actor.getReleaseDate();
      return data || BigInt(new Date("2026-01-01").getTime());
    },
    enabled: !!actor && !isFetching,
    placeholderData: BigInt(new Date("2026-01-01").getTime()),
  });
}
