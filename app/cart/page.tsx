"use client"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ArrowRight, Trash2, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";

export default function CartPage() {
    const { items, updateQuantity, removeItem } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15.00; // Free shipping derived logic
    const total = subtotal + shipping;

    if (!mounted) return null; // Prevent hydration mismatch


    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <h1 className="text-3xl md:text-5xl font-bold font-heading uppercase text-white mb-8 tracking-tighter animate-speed-in-left">Your Cart</h1>

            {items.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/50 rounded-lg border border-zinc-800 animate-fade-in-up">
                    <p className="text-zinc-400 text-lg mb-6">Your cart is currently empty.</p>
                    <Link href="/shop">
                        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider hover:animate-nitro">
                            Start Shopping
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item, idx) => (
                            <div key={item.id} className="flex gap-4 sm:gap-6 bg-zinc-900/40 p-4 border border-zinc-800 rounded-lg items-center animate-speed-in-left hover:border-red-900 transition-colors" style={{ animationDelay: `${idx * 150}ms` }}>
                                <div className="h-24 w-24 shrink-0 bg-zinc-800 rounded overflow-hidden group">
                                    <div
                                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h3 className="font-bold text-white uppercase tracking-wide text-sm md:text-base cursor-pointer hover:text-red-500 transition-colors">{item.name}</h3>
                                    <p className="text-zinc-400 text-sm">Size: {item.size}</p>
                                    <p className="font-bold text-red-500">₹{item.price.toFixed(2)}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:text-white text-zinc-500 hover:bg-zinc-900"><Minus className="w-3 h-3" /></button>
                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:text-white text-zinc-500 hover:bg-zinc-900"><Plus className="w-3 h-3" /></button>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors hover:animate-shake-x">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:col-span-1 animate-speed-in-right delay-200">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 sticky top-24 hover:shadow-[0_0_20px_rgba(255,0,0,0.1)] transition-shadow duration-500">
                            <h3 className="font-bold text-xl text-white uppercase mb-6 tracking-wide border-b border-zinc-800 pb-2">Order Summary</h3>
                            <div className="space-y-4 text-sm text-zinc-400">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-white">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-white">₹{shipping.toFixed(2)}</span>
                                </div>
                                <Separator className="bg-zinc-800 my-4" />
                                <div className="flex justify-between text-lg font-bold text-white uppercase">
                                    <span>Total</span>
                                    <span className="text-red-500 animate-pulse">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="flex gap-2">
                                    <Input placeholder="Coupon Code" className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" />
                                    <Button variant="outline" className="shrink-0 border-zinc-800 text-zinc-300 hover:text-white hover:border-white">Apply</Button>
                                </div>
                                <Link href="/checkout" className="block w-full">
                                    <Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold uppercase tracking-wider py-6 hover:animate-nitro shadow-lg">
                                        Checkout <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
