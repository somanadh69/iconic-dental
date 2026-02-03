"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-900 animate-pulse" />
});

export default function MapSection() {
    return (
        <section className="h-[60vh] relative w-full overflow-hidden bg-slate-900 border-t border-slate-800">
            <div className="absolute inset-0 grayscale-0 opacity-80">
                <InteractiveMap />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none"></div>

            <div className="absolute bottom-12 left-6 md:left-24 z-10 pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter">GLOBAL HQ</h2>
                <p className="text-slate-400 max-w-sm font-mono text-sm">
                    4040 North Fairfax Drive,<br />
                    Suite 300, Arlington,<br />
                    Virginia 22203
                </p>
            </div>
        </section>
    );
}
