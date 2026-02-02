"use client";

import { motion } from "framer-motion";

const REVIEWS = [
    {
        text: "The precision is unmatched. The sequence animation showed me exactly what was happening in my mouth.",
        user: "Sarah J.",
        role: "Implant Patient",
    },
    {
        text: "Medical technology at its finest. ICONIC transformed my practice's efficiency.",
        user: "Dr. A. Petrov",
        role: "Chief Surgeon",
    },
    {
        text: "Clean, fast, and incredibly reliable. The titanium integration was seamless.",
        user: "Marcus T.",
        role: "Bio-Engineer",
    },
];

export default function Reviews() {
    return (
        <section className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6">
                <h3 className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 mb-12 uppercase tracking-widest text-center">
                    Patient & Clinical Feedback
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="p-8 bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl"
                        >
                            <div className="flex gap-1 mb-4 text-slate-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                ))}
                            </div>
                            <p className="text-slate-700 italic mb-6 font-light leading-relaxed">"{review.text}"</p>
                            <div>
                                <div className="font-bold text-slate-900">{review.user}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">{review.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
