"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Treatment } from "@/data/services";

interface TextOverlaysProps {
    treatment: Treatment;
    progress: MotionValue<number>;
}

export default function TextOverlays({ treatment, progress }: TextOverlaysProps) {
    // Section 1: Intro (0.1 - 0.2)
    const op1 = useTransform(progress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
    const y1 = useTransform(progress, [0, 0.1], [50, 0]);

    // Section 2: Details (0.4 - 0.5)
    const op2 = useTransform(progress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
    const y2 = useTransform(progress, [0.35, 0.45], [50, 0]);

    // Section 3: Tech (0.7 - 0.8)
    const op3 = useTransform(progress, [0.7, 0.8, 0.9, 1], [0, 1, 1, 0]);
    const y3 = useTransform(progress, [0.7, 0.8], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center h-screen w-full">
            {/* Section 1 */}
            <motion.div
                style={{ opacity: op1, y: y1 }}
                className="absolute max-w-2xl text-center px-4"
            >
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-4 font-sans">
                    {treatment.section1.title}
                </h2>
                <p className="text-xl text-slate-600 font-light">
                    {treatment.section1.subtitle}
                </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ opacity: op2, y: y2 }}
                className="absolute max-w-2xl text-center px-4"
            >
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-4 font-sans">
                    {treatment.section2.title}
                </h2>
                <p className="text-xl text-slate-600 font-light">
                    {treatment.section2.subtitle}
                </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div
                style={{ opacity: op3, y: y3 }}
                className="absolute max-w-2xl text-center px-4"
            >
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-4 font-sans">
                    {treatment.section3.title}
                </h2>
                <p className="text-xl text-slate-600 font-light">
                    {treatment.section3.subtitle}
                </p>
            </motion.div>
        </div>
    );
}
