"use client";

import { useEffect, useState } from "react";

export function Tachometer() {
    const [rpm, setRpm] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate erratic random revving
            const target = Math.random() > 0.7 ? 7000 : Math.random() * 3000 + 1000;
            setRpm(prev => prev + (target - prev) * 0.1);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const rotation = -120 + (rpm / 8000) * 240; // -120deg to 120deg range for 0-8000 RPM

    return (
        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-zinc-800 bg-black shadow-[0_0_20px_rgba(255,0,0,0.2)] flex items-center justify-center overflow-hidden animate-float">
            {/* Ticks */}
            {[...Array(9)].map((_, i) => (
                <div
                    key={i}
                    className={`absolute w-1 h-3 ${i >= 7 ? 'bg-red-600' : 'bg-white'}`}
                    style={{
                        top: '10px',
                        left: '50%',
                        transformOrigin: '0 80px', // Adjusted for new size? Need to be careful. 
                        // Center is at 50% 50%. Top is 10px. Radius approx 64px/96px.
                        // Let's use absolute positioning with rotation from center.
                        transform: `translateX(-50%) rotate(${-120 + i * 30}deg) translateY(-${i < 4 ? '0' : '0'}px)`
                        // This is tricky without precise calc. Let's simplify visual.
                    }}
                />
            ))}

            {/* Numbers */}
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl md:text-6xl font-black font-heading tracking-tighter text-zinc-800 select-none">
                    {Math.round(rpm / 100)}
                </span>
                <span className="absolute bottom-8 text-xs text-zinc-500 font-bold">x1000 RPM</span>
            </div>

            {/* Needle */}
            <div
                className="absolute w-1 h-1/2 bg-red-600 origin-bottom rounded-full transition-transform duration-75 shadow-lg shadow-red-500/50"
                style={{
                    bottom: '50%',
                    left: 'calc(50% - 2px)',
                    transform: `rotate(${rotation}deg)`
                }}
            />

            {/* Center cap */}
            <div className="absolute w-4 h-4 bg-zinc-700 rounded-full border-2 border-black z-10" />

            {/* Glare/Glass Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        </div>
    );
}
