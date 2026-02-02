"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Treatment } from "@/data/services";
import TextOverlays from "./TextOverlays";
import Reviews from "./Reviews";
import MapSection from "./MapSection";
import ServicesList from "./ServicesList";
// Config
const FRAME_COUNT = 120;
const FILE_EXT = "jpg"; // CHANGED TO JPG FOR DEMO. Change back to "webp" for production assets.

export default function TreatmentScroll({ treatment, onNext }: { treatment: Treatment; onNext: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Preload Images
    useEffect(() => {
        setIsLoaded(false);
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `${treatment.folderPath}/${i}.${FILE_EXT}`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) setIsLoaded(true);
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [treatment]);

    // Draw Logic
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // Handle High DPI
        const dpr = window.devicePixelRatio || 1;
        // Set canvas dimensions to match window (handled in resize, but good to check)

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Cover Logic (Full Screen)
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio); // Changed from min to max for 'cover'

        // Maximum size (avoid upscaling too much if images are small? User said "Product Assembly", likely high res)
        // Actually, object-fit: contain usually maximizes.

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(
            img,
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
    };

    // Resize Handler
    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current) return;
            canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
            canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
            // Redraw current frame?
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Sync with Scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * FRAME_COUNT)
        );

        // Request animation frame for smoothness? 
        // direct calling render is usually fine if 60fps scroll updates, but requestAnimationFrame is safer.
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Initial draw when loaded
    useEffect(() => {
        if (isLoaded) renderFrame(0);
    }, [isLoaded]);

    return (
        <div className="relative">
            {/* 1. Animation Section (500vh) */}
            <div ref={containerRef} className="h-[500vh] relative bg-white">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-cover"
                        style={{ width: "100%", height: "100%" }}
                    />

                    {/* Loading Indicator */}
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
                            <div className="text-slate-400 font-mono animate-pulse">LOADING SEQUENCE...</div>
                        </div>
                    )}

                    {/* Text Overlays */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <TextOverlays treatment={treatment} progress={scrollYProgress} />
                    </div>

                    {/* Persistent Stats (Visible during animation) */}
                    <div className="absolute bottom-10 left-6 md:left-20 flex gap-8 md:gap-12 pointer-events-none z-20">
                        {treatment.stats.map((stat, i) => (
                            <div key={i}>
                                <div className="text-2xl md:text-3xl font-bold text-slate-800">{stat.val}</div>
                                <div className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Static Content (Appears naturally after scrolling past the above 500vh) */}
            <div className="relative z-30 bg-white">
                <ServicesList />
                <Reviews />
                <MapSection />

                {/* Footer / Next Action */}
                <div className="py-24 text-center bg-slate-50">
                    <button
                        onClick={onNext}
                        className="px-8 py-4 bg-[#0f172a] text-white rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-2xl"
                    >
                        Explore Next Treatment
                    </button>
                </div>
            </div>
        </div>
    );
}
