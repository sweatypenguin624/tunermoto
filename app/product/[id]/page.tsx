"use client";

import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Star, Heart, ShieldCheck, Truck, Zap, ShoppingCart, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);

    const product = getProductById(id);

    // If product not found, we should ideally server render 404, but in client component usage:
    useEffect(() => {
        if (!product) {
            // Since we are in a client component, we can't easily throw server 404 without server comp
            // For now, we will handle in UI or redirect
        }
    }, [product]);

    if (!product) {
        return <div className="container mx-auto py-20 text-center text-white">Product not found.</div>;
    }

    const images = product.images.length > 0 ? product.images : ["/placeholder.jpg"];
    const [selectedImage, setSelectedImage] = useState(images[0]);

    const handleAddToCart = () => {
        if (product.sizes.length > 0 && !selectedSize) {
            alert("Please select a size");
            return;
        }

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: images[0],
            quantity: quantity,
            size: selectedSize || 'One Size'
        });

        alert("Added to cart!");
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Gallery */}
                <div className="space-y-4 animate-speed-in-left">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 shadow-[0_0_30px_rgba(255,0,0,0.1)] group">
                        <div
                            className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                            style={{ backgroundImage: `url(${selectedImage})` }}
                        />
                        {/* Assuming all scraped items might be 'New' for now or check isNew flag */}
                        <div className="absolute top-4 left-4 bg-red-600 text-white font-bold px-3 py-1 text-xs uppercase tracking-widest animate-pulse">
                            Official Merch
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`aspect-square rounded-md overflow-hidden bg-zinc-900 border cursor-pointer transition-all animate-fade-in-up ${selectedImage === img ? 'border-red-600 ring-2 ring-red-600/50' : 'border-zinc-800 hover:border-zinc-500'}`}
                                style={{ animationDelay: `${idx * 100}ms` }}
                                onClick={() => setSelectedImage(img)}
                            >
                                <div
                                    className="w-full h-full bg-cover bg-center hover:opacity-80 transition-opacity"
                                    style={{ backgroundImage: `url(${img})` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-8 animate-speed-in-right">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading uppercase text-white tracking-tighter mb-2 hover:animate-shake-x origin-left">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-3xl font-bold text-red-500 animate-pulse-red inline-block px-2 rounded">₹{product.price.toFixed(2)}</span>
                            <div className="flex items-center gap-1 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-500 animate-bounce" style={{ animationDelay: `${i * 100}ms` }} />
                                ))}
                                <span className="text-zinc-500 text-sm ml-2">(Reviews Coming Soon)</span>
                            </div>
                        </div>
                        <div className="text-zinc-400 text-lg leading-relaxed animate-fade-in delay-200" dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>

                    <Separator className="bg-zinc-800" />

                    {/* Configuration */}
                    <div className="space-y-6 animate-fade-in delay-300">
                        {product.sizes.length > 0 && (
                            <div>
                                <Label className="text-zinc-300 uppercase font-bold tracking-wider mb-3 block">Select Size</Label>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map((s) => (
                                        <div key={s} className="relative">
                                            <input
                                                type="radio"
                                                name="size"
                                                id={`size-${s}`}
                                                className="peer sr-only"
                                                onChange={() => setSelectedSize(s)}
                                                checked={selectedSize === s}
                                            />
                                            <label htmlFor={`size-${s}`} className="block w-12 h-12 flex items-center justify-center border-2 border-zinc-800 rounded bg-zinc-900 text-zinc-400 font-bold cursor-pointer peer-checked:border-red-600 peer-checked:text-white peer-checked:bg-red-600/10 peer-checked:animate-pulse hover:border-zinc-600 transition-all">
                                                {s}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <Label className="text-zinc-300 uppercase font-bold tracking-wider mb-3 block">Quantity</Label>
                            <div className="flex items-center w-32 bg-zinc-900 border border-zinc-800 rounded">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800"><Minus className="w-4 h-4" /></button>
                                <span className="flex-1 text-center font-bold text-white">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-zinc-400 hover:text-white hover:bg-zinc-800"><Plus className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in delay-500">
                        <Button
                            size="lg"
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider h-14 text-lg hover:animate-nitro shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="bg-transparent mr-2 w-5 h-5" /> Add to Cart
                        </Button>
                        <Button size="lg" variant="outline" className="flex-1 border-zinc-700 text-white hover:bg-zinc-800 hover:text-red-500 font-bold uppercase tracking-wider h-14 hover:animate-shake-x">
                            <Heart className="mr-2 w-5 h-5" /> Wishlist
                        </Button>
                    </div>

                    {/* Extra Info */}
                    <div className="bg-zinc-900/50 p-4 rounded border border-zinc-800/50 animate-fade-in delay-700">
                        <h4 className="font-bold text-white uppercase mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500 animate-pulse" /> Racing Specifications
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4" /> Free Shipping &gt; $100
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" /> 30-Day Returns
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
