import { HeroSection } from "@/components/hero-section";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

import { getFeaturedProducts } from "@/lib/products";

export const dynamic = 'force-dynamic';

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  const collections = [
    { name: "Men", href: "/shop?category=Men", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80" },
    { name: "Women", href: "/shop?category=Women", image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80" },
    { name: "Kids", href: "/shop?category=Kids", image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&q=80" },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <HeroSection />

      {/* Featured Products */}
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex justify-between items-end mb-12 animate-fade-in-up">
            <div>
              <div className="flex items-center gap-2 mb-2 animate-pulse-red">
                <Flame className="text-red-500 w-6 h-6 animate-rubber-burn" />
                <span className="text-red-500 font-bold uppercase tracking-widest text-xs">Hot Right Now</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase text-white tracking-tighter mb-2 hover:animate-shake-x">
                Trending <span className="text-red-600">Gear</span>
              </h2>
              <p className="text-zinc-400">Top picks for the track and the street.</p>
            </div>

            <Link href="/shop" className="hidden md:block">
              <Button variant="link" className="text-red-500 hover:text-red-400 p-0 text-base font-bold uppercase tracking-wider hover:animate-nitro">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          <div className="mt-8 md:hidden text-center">
            <Link href="/shop">
              <Button variant="outline" className="text-white border-zinc-700 w-full uppercase font-bold tracking-wider">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Banner */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden">
        {/* Background drift lines */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 40px, #ff0000 40px, #ff0000 41px)" }} />

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase text-white tracking-tighter mb-12 text-center hover:animate-glitch cursor-default">
            Shop By <span className="text-red-600">Category</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {collections.map((collection, idx) => (
              <Link href={collection.href} key={collection.name} className="group relative h-96 overflow-hidden block animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                  style={{ backgroundImage: `url(${collection.image})` }}
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-3xl font-bold font-heading uppercase text-white tracking-wider border-2 border-white px-6 py-3 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all transform group-hover:-skew-x-12">
                    {collection.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-24 bg-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 animate-drift">
          {/* Moving track marks */}
          <div className="w-full h-full" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)" }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase tracking-tighter mb-6 hover:animate-shake-x">
            Join the <span className="text-black">Racing</span> Club
          </h2>
          <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto animate-float">
            Get exclusive access to limited drops, racer discounts, and the latest news from the track.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="w-full px-4 py-3 bg-black border-2 border-black text-white focus:outline-none placeholder:text-zinc-500 font-bold tracking-wider hover:border-white transition-colors"
            />
            <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 border-2 border-white font-bold uppercase tracking-wider px-8 hover:animate-nitro">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
