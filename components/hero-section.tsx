import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden bg-black">
            {/* Background Image / Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-red-950 opacity-80" />
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605218427360-6961d907175d?q=80&w=3270&auto=format&fit=crop')" }}
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start z-10 space-y-6">
                <div className="animate-speed-in-left">
                    <span className="inline-block py-1 px-3 rounded-full bg-red-600/20 border border-red-600 text-red-500 font-bold tracking-widest text-xs uppercase mb-4 hover:animate-glitch">
                        New Collection Dropped
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold font-heading uppercase text-white tracking-tighter leading-none mb-2 hover:animate-rev-up transition-transform origin-left">
                        Fuel Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 animate-pulse">Style</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl font-light tracking-wide mb-8 animate-fade-in delay-200">
                        Premium streetwear and accessories for the ones who ride. Performance meets fashion.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 animate-speed-in-right delay-300">
                        <Link href="/shop">
                            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white border-0 text-lg px-8 py-6 uppercase font-bold tracking-wider rounded-none skew-x-[-10deg] hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                                <span className="skew-x-[10deg]">Shop Now</span>
                            </Button>
                        </Link>
                        <Link href="/categories/racing">
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black text-lg px-8 py-6 uppercase font-bold tracking-wider rounded-none skew-x-[-10deg] hover:scale-105 transition-transform duration-300">
                                <span className="skew-x-[10deg] flex items-center gap-2">
                                    View Collection <ArrowRight className="h-5 w-5 hover:translate-x-1 transition-transform" />
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
        </section>
    );
}
