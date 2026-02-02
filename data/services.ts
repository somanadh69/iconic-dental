export type Treatment = {
  id: string;
  name: string;
  subName: string;
  price: string;
  description: string;
  folderPath: string;
  themeColor: string;
  gradient: string;
  stats: { label: string; val: string }[];
  section1: { title: string; subtitle: string };
  section2: { title: string; subtitle: string };
  section3: { title: string; subtitle: string };
  detailsSection: {
    title: string;
    description: string;
  };
  ctaSection: {
    label: string;
    guarantee: string;
  };
};

export const treatments: Treatment[] = [
  {
    id: "implant",
    name: "Titanium Genesis",
    subName: "Root Replacement.",
    price: "From $1,200",
    description: "Grade 5 Titanium - Osseointegration - Lifetime Warranty",
    folderPath: "/images/implant-sequence", // Folder containing frames
    themeColor: "#94a3b8", // Slate 400 (Titanium)
    gradient: "linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)",
    stats: [
      { label: "Biocompatibility", val: "100%" },
      { label: "Integration", val: "4 Weeks" },
      { label: "Failure Rate", val: "<1%" },
    ],
    section1: {
      title: "Titanium Genesis.",
      subtitle: "The foundation of a new smile.",
    },
    section2: {
      title: "Precision Engineering.",
      subtitle: "Milled to micron-level accuracy for perfect biological sealing.",
    },
    section3: {
      title: "",
      subtitle: "",
    },
    detailsSection: {
      title: "Bionic Integration",
      description:
        "Our implants mimic natural root structure. The hydrophilic surface accelerates bone growth, locking the titanium into your jaw structure effectively becoming part of your body.",
    },
    ctaSection: {
      label: "Book Consultation",
      guarantee: "Lifetime Structural Warranty",
    },
  },
  {
    id: "aligner",
    name: "Iconic Clear",
    subName: "Invisible correction.",
    price: "From $3,500",
    description: "SmartTrack Material - 3D Printed - Removable",
    folderPath: "/images/aligner-sequence", // Folder containing frames
    themeColor: "#38bdf8", // Sky 400 (Medical Blue)
    gradient: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    stats: [
      { label: "Visibility", val: "Near 0%" },
      { label: "Comfort", val: "Max" },
      { label: "Time", val: "6 Months" },
    ],
    section1: {
      title: "Iconic Clear.",
      subtitle: "Orthodontics, vanished.",
    },
    section2: {
      title: "SmartForce Attachments.",
      subtitle:
        "Gentle, constant force to rotate teeth with mathematical precision.",
    },
    section3: {
      title: "Digital Blueprint.",
      subtitle: "See your finished smile before we even start.",
    },
    detailsSection: {
      title: "The Phantom Brace",
      description:
        "Custom 3D-printed specifically for your gumline. No wires, no brackets, no metal. Just crystal clear polymers guiding your teeth into the perfect arch.",
    },
    ctaSection: {
      label: "Scan Your Smile",
      guarantee: "Perfect Fit Guarantee",
    },
  },
];
