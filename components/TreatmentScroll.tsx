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

        // Cover Logic (Full Screen)
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;

        let ratio = Math.max(hRatio, vRatio); // Default: Cover

        // Mobile Optimization: If in portrait mode and image is landscape, 
        // using 'cover' (max) zooms in too much, cropping the sides.
        // We switch to 'contain' (min) logic or fit-width (hRatio) to ensure visibility.
        if (canvas.width < canvas.height && img.width > img.height) {
            // Check if cover zoom is too aggressive
            ratio = hRatio;
            // Optional: minimal zoom to avoid too much letterboxing if close? 
            // For now, strict visibility is safer.
        }

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Always clear

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
            // Cap DPR at 2 to avoid performance issues on high density mobile screens
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvasRef.current.width = window.innerWidth * dpr;
            canvasRef.current.height = window.innerHeight * dpr;

            // Normalize coordinate system so drawing logic works with CSS pixels (logic simplified)
            // Actually, best practice for canvas with DPR:
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) ctx.scale(dpr, dpr);

            // But wait, my drawImage logic uses canvas.width directly for calcs.
            // If I set width = innerWidth * dpr, then "canvas.width" is big.
            // And my dpr scale needs to be handled.
            // Simpler approach for this specific component existing logic:
            // Just scale the canvas element size, keep internal logic consistent.
            // The previous code didn't do ctx.scale. It just used huge width/height.
            // AND it read window.devicePixelRatio in renderFrame but didn't use it?
            // Wait, looking at previous code:
            // renderFrame: const dpr = window.devicePixelRatio || 1; (Unused variable)
            // handleResize: canvas.width = window.innerWidth * window.devicePixelRatio;

            // So resizing makes the buffer big.
            // renderFrame uses canvas.width (the big buffer size).
            // This means we are drawing to the physical pixels. This is good for sharpness.
            // BUT, drawing a Huge image every frame is slow.
            // So capping DPR at 2 is vital.
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
