"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    isNew?: boolean;
}

export function ProductCard({ id, name, price, category, images, isNew }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation to product page
        e.stopPropagation();
        addItem({ id, name, price, image: images[0], quantity: 1, size: 'M' }); // Default size M for quick add
        // We will add toast here later if available, for now just simple log or feedback
    };

    return (
        <Card className="group relative border-zinc-800 bg-zinc-900 overflow-hidden hover:border-red-900 transition-colors">
            {isNew && (
                <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-sm">
                    New Arrival
                </span>
            )}
            <CardHeader className="p-0">
                <Link href={`/product/${id}`}>
                    <div className="aspect-square relative overflow-hidden bg-zinc-800">
                        {/* Placeholder for real image implementation */}
                        <div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                            style={{ backgroundImage: `url(${images[0] || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80'})` }}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                </Link>
            </CardHeader>
            <CardContent className="p-4">
                <p className="text-zinc-500 text-xs uppercase font-bold tracking-wider mb-1">{category}</p>
                <Link href={`/product/${id}`} className="hover:text-red-500 transition-colors">
                    <h3 className="text-white font-heading text-lg leading-tight uppercase line-clamp-2 min-h-[3.25rem]">{name}</h3>
                </Link>
                <p className="text-red-500 font-bold text-xl mt-2">₹{price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button
                    className="w-full bg-zinc-800 hover:bg-red-600 text-white font-bold uppercase tracking-wider active:scale-95 transition-transform"
                    variant="secondary"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
