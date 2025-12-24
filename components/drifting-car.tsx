"use client";

import { useEffect, useState } from "react";

export function DriftingCar() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Show car every 10 seconds
        const interval = setInterval(() => {
            setShow(true);
            setTimeout(() => setShow(false), 3000); // Hide after animation
        }, 10000);

        // Initial delay
        const timeout = setTimeout(() => setShow(true), 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    if (!show) return null;

    return (
        <div className="fixed bottom-10 left-0 z-50 pointer-events-none animate-drift">
            {/* Simple CSS Car Shape since external images can be flaky */}
            <div className="relative w-32 h-12">
                {/* Body */}
                <div className="absolute bottom-2 left-0 w-full h-8 bg-gradient-to-r from-red-600 to-red-900 rounded-lg transform skew-x-[-20deg] shadow-[0_0_15px_rgba(255,0,0,0.6)]"></div>
                {/* Roof */}
                <div className="absolute bottom-10 left-8 w-16 h-6 bg-black opacity-80 rounded-t-lg transform skew-x-[-30deg] border-t border-red-500"></div>
                {/* Wheels */}
                <div className="absolute bottom-0 left-4 w-6 h-6 bg-zinc-900 rounded-full border-2 border-zinc-500 animate-spin"></div>
                <div className="absolute bottom-0 right-4 w-6 h-6 bg-zinc-900 rounded-full border-2 border-zinc-500 animate-spin"></div>
                {/* Headlight */}
                <div className="absolute bottom-4 right-0 w-2 h-4 bg-yellow-400 rounded-full blur-[2px] shadow-[0_0_10px_rgba(255,255,0,0.8)]"></div>
                {/* Smoke */}
                <div className="absolute bottom-0 left-0 w-full h-4 bg-white/20 blur-xl scale-150 animate-pulse"></div>
            </div>
        </div>
    );
}
