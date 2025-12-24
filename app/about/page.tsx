import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="bg-black min-h-screen text-white">
            {/* Hero Header */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-red-950/20 z-0" />
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=3270&auto=format&fit=crop')" }}
                />
                <div className="relative z-10 text-center container mx-auto px-4">
                    <h1 className="text-5xl md:text-8xl font-bold font-heading uppercase tracking-tighter mb-6 animate-speed-in-left">
                        Built for <span className="text-red-600 text-outline">Speed</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light animate-fade-in delay-200">
                        More than just a brand. A lifestyle for those who live in the red zone.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold font-heading uppercase tracking-tighter text-red-600">
                            Our Origin
                        </h2>
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            The Merchandise Store was born on the track. Founded by a team of racing enthusiasts and streetwear designers, we noticed a gap: car culture apparel was either cheap and generic or overpriced and inaccessible.
                        </p>
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            We set out to create premium, high-octane gear that looks as good in the paddock as it does on the street. Every stitch, every fabric, and every design is inspired by the engineering marvels of the automotive world.
                        </p>
                        <div className="pt-4">
                            <div className="grid grid-cols-3 gap-8 text-center">
                                <div>
                                    <span className="block text-4xl font-bold text-white font-heading">0-60</span>
                                    <span className="text-sm text-zinc-500 uppercase tracking-widest">Fast Shipping</span>
                                </div>
                                <div>
                                    <span className="block text-4xl font-bold text-white font-heading">100%</span>
                                    <span className="text-sm text-zinc-500 uppercase tracking-widest">Authentic</span>
                                </div>
                                <div>
                                    <span className="block text-4xl font-bold text-white font-heading">24/7</span>
                                    <span className="text-sm text-zinc-500 uppercase tracking-widest">Pit Crew Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[500px] w-full bg-zinc-900 rounded-lg overflow-hidden skew-x-[-2deg] border border-zinc-800 group hover:border-red-600 transition-colors duration-500">
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493238792015-fa093a30937d?w=800&q=80')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="py-20 bg-zinc-950 border-y border-zinc-900">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading uppercase tracking-tighter mb-12">
                        The <span className="text-red-600">Philosophy</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-black border border-zinc-800 hover:border-red-600 transition-colors group">
                            <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform duration-300 transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2h-4c0-1.1-.9-2-2-2s-2 .9-2 2H6c-2.2 0-4 1.8-4 4v2.5a2.5 2.5 0 0 0 2.5 2.5h15a2.5 2.5 0 0 0 2.5-2.5V6c0-2.2-1.8-4-4-4Z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase mb-4">Performance First</h3>
                            <p className="text-zinc-500">Materials tested for durability and comfort at high speeds.</p>
                        </div>
                        <div className="p-8 bg-black border border-zinc-800 hover:border-red-600 transition-colors group">
                            <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform duration-300 transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m4.93 4.93 14.14 14.14" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase mb-4">No Compromise</h3>
                            <p className="text-zinc-500">We don't cut corners. Quality is our fuel.</p>
                        </div>
                        <div className="p-8 bg-black border border-zinc-800 hover:border-red-600 transition-colors group">
                            <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform duration-300 transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 9h15a2.5 2.5 0 0 1 0 5h-15a2.5 2.5 0 0 1 0-5Z" /><path d="M5.5 15h13a2.5 2.5 0 0 1 0 5h-13a2.5 2.5 0 0 1 0-5Z" /><path d="M6.5 21h11a2.5 2.5 0 0 1 0 5h-11a2.5 2.5 0 0 1 0-5Z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase mb-4">Street Ready</h3>
                            <p className="text-zinc-500">Born on the track, styled for the city streets.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter mb-8">
                    Ready to upgrade your style?
                </h2>
                <Link href="/shop">
                    <Button size="lg" className="bg-white text-black hover:bg-zinc-200 border-2 border-white px-12 py-6 text-xl font-bold uppercase tracking-widest skew-x-[-10deg]">
                        <span className="skew-x-[10deg]">Shop Collection</span>
                    </Button>
                </Link>
            </section>
        </div>
    );
}
