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
                <InteractiveMap
                    lat={17.800081534241805}
                    lng={83.36999333880752}
                    address={`Iconic Dental\nVisakhapatnam, India`}
                    googleMapsUrl="https://www.google.com/maps/search/?api=1&query=17.800081534241805,83.36999333880752"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none"></div>

            <div className="absolute bottom-12 left-6 md:left-24 z-10 pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter">GLOBAL HQ</h2>
                <p className="text-slate-400 max-w-sm font-mono text-sm">
                    Iconic Dental<br />
                    Visakhapatnam,<br />
                    India
                </p>
            </div>
        </section>
    );
}
