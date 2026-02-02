"use client";

import { treatments } from "@/data/services";

export default function ServicesList() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h3 className="text-sm font-bold text-slate-400 mb-12 uppercase tracking-widest text-center">
                    Available Protocols
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {treatments.map((t, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-6 relative">
                                {/* Placeholder for service thumbnail - utilizing gradient for now */}
                                <div className="absolute inset-0" style={{ background: t.gradient, opacity: 0.5 }}></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                        <span className="text-slate-900 text-2xl">→</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-500 transition-colors">{t.name}</h4>
                                    <p className="text-slate-500 max-w-sm">{t.description}</p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-lg font-semibold text-slate-900">{t.price}</span>
                                    <span className="text-xs text-slate-400 uppercase">Est. Cost</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
