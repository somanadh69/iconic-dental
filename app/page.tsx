"use client";

import React, { useState, useEffect } from "react";
import { treatments } from "@/data/services";
import TreatmentScroll from "@/components/TreatmentScroll";
import NavBar from "@/components/NavBar";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [index, setIndex] = useState(0);

  const nextTreatment = () => {
    setIndex((prev) => (prev + 1) % treatments.length);
  };

  // Scroll to top when treatment changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [index]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <NavBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={treatments[index].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <TreatmentScroll
            treatment={treatments[index]}
            onNext={nextTreatment}
          />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
