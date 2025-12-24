"use client";

import { use } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const unwrappedParams = use(params);
    const { slug } = unwrappedParams;

    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

    // Mock products based on category somewhat
    // In a real app, this would fetch from DB based on slug
    const allProducts = [
        {
            id: "1",
            name: "Carbon Fiber Racing Jacket",
            price: 129.99,
            category: "Racing Gear",
            images: ["https://images.unsplash.com/photo-1551028919-ac7eed8e329b?w=800&q=80"],
            isNew: true,
            tags: ['racing', 'cars']
        },
        {
            id: "2",
            name: "Tire Tread Hoodie - Black",
            price: 59.99,
            category: "Streetwear",
            images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"],
            tags: ['clothing']
        },
        {
            id: "3",
            name: "Apex Predator Cap",
            price: 29.99,
            category: "Accessories",
            images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80"],
            tags: ['accessories']
        },
        {
            id: "4",
            name: "Drift Team Tee",
            price: 34.99,
            category: "T-Shirts",
            images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"],
            isNew: true,
            tags: ['clothing', 'cars']
        },
        {
            id: "5",
            name: "Red Line Racing Gloves",
            price: 45.00,
            category: "Racing Gear",
            images: ["https://images.unsplash.com/photo-1580913428706-c311ab527ebc?w=800&q=80"],
            tags: ['racing', 'bikes']
        },
        {
            id: "6",
            name: "Speedster Sunglasses",
            price: 89.50,
            category: "Accessories",
            images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"],
            tags: ['accessories']
        },
    ];

    // Simple client-side filtering mock
    const products = allProducts; // In real implementation, filter by slug

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Category Hero */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden border-b border-zinc-900">
                <div className="absolute inset-0 bg-gradient-to-r from-black to-zinc-900" />
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: slug === 'cars' ? "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80')" : slug === 'bikes' ? "url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80')" : "url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80')" }}
                />
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold font-heading uppercase tracking-tighter mb-4 animate-speed-in-left">
                        {slug === 'cars' ? 'Car Merch' : slug === 'bikes' ? 'Bike Merch' : categoryName}
                    </h1>
                    <p className="text-zinc-400 max-w-lg mx-auto uppercase tracking-widest text-sm animate-fade-in delay-200">
                        {slug === 'cars' ? 'For the four-wheel fanatics.' : slug === 'bikes' ? 'Two wheels. One passion.' : 'Explore the collection.'}
                    </p>
                </div>
            </section>

            {/* Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-zinc-500 font-bold uppercase tracking-wider">{products.length} Products Found</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-zinc-800 text-zinc-400 hover:text-white hover:border-white">
                            Price: Low to High
                        </Button>
                        <Button variant="outline" size="sm" className="border-zinc-800 text-zinc-400 hover:text-white hover:border-white">
                            Newest
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
