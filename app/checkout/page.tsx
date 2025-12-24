"use client";

import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, Truck, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore, useOrderStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getSummary, clearCart } = useCartStore();
    const addOrder = useOrderStore((state) => state.addOrder);
    const [isProcessing, setIsProcessing] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { subtotal, shipping, total } = getSummary();

    const handlePlaceOrder = async () => {
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        const orderId = Math.random().toString(36).substring(2, 9).toUpperCase();

        const newOrder = {
            id: orderId,
            date: new Date().toISOString(),
            items: [...items],
            total: total,
            status: 'Processing' as const,
            customer: {
                name: "John Doe", // Mock data from form
                email: "john@example.com",
                address: "123 Speedway Lane, Apex City, NY"
            }
        };

        addOrder(newOrder);
        clearCart();
        setIsProcessing(false);
        router.push(`/order-confirmation/${orderId}`);
    };

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
                <Button onClick={() => router.push('/shop')} className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase">Return to Shop</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <h1 className="text-3xl md:text-5xl font-bold font-heading uppercase text-white mb-8 tracking-tighter">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {/* Shipping Info */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="border-b border-zinc-800 pb-4">
                            <CardTitle className="text-xl font-bold uppercase text-white flex items-center gap-2">
                                <Truck className="text-red-600" /> Shipping Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">First Name</Label>
                                    <Input className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" placeholder="Driver" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Last Name</Label>
                                    <Input className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" placeholder="One" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Address</Label>
                                <Input className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" placeholder="123 Speedway Lane" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">City</Label>
                                    <Input className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" placeholder="Apex City" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">State</Label>
                                    <Input className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" placeholder="NY" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Zip Code</Label>
                                    <Input className="bg-zinc-950 border-zinc-800 focus-visible:ring-red-600" placeholder="10001" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Info */}
                    <Card className="bg-zinc-900 border-zinc-800">
                        <CardHeader className="border-b border-zinc-800 pb-4">
                            <CardTitle className="text-xl font-bold uppercase text-white flex items-center gap-2">
                                <CreditCard className="text-red-600" /> Payment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <RadioGroup defaultValue="stripe" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2 border border-zinc-700 bg-zinc-800/50 p-4 rounded-md cursor-pointer hover:border-red-600 hover:bg-zinc-800 transition-colors">
                                    <RadioGroupItem value="stripe" id="stripe" className="text-red-600 border-zinc-500" />
                                    <Label htmlFor="stripe" className="text-white cursor-pointer font-bold">Credit/Debit Card (Stripe)</Label>
                                </div>
                                <div className="flex items-center space-x-2 border border-zinc-700 bg-zinc-800/50 p-4 rounded-md cursor-pointer hover:border-red-600 hover:bg-zinc-800 transition-colors">
                                    <RadioGroupItem value="razorpay" id="razorpay" className="text-red-600 border-zinc-500" />
                                    <Label htmlFor="razorpay" className="text-white cursor-pointer font-bold">Razorpay</Label>
                                </div>
                            </RadioGroup>

                            <div className="mt-6">
                                <div className="h-12 bg-zinc-950 border border-zinc-800 rounded flex items-center justify-center text-zinc-500 text-sm">
                                    Secure Payment Gateways Integrated
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary Sidebar */}
                <div>
                    <div className="bg-white text-black p-6 rounded-none sticky top-24 skew-x-[-2deg] shadow-[5px_5px_0px_#cc0000]">
                        <div className="skew-x-[2deg]">
                            <h3 className="font-bold text-xl uppercase mb-6 tracking-tighter border-b-2 border-black pb-2">Order Summary</h3>
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between font-medium text-sm">
                                        <span className="truncate w-2/3">{item.quantity}x {item.name}</span>
                                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <Separator className="bg-zinc-300 my-4" />
                            <div className="space-y-2 mb-6 font-bold">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>₹{shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl text-red-600 uppercase mt-4">
                                    <span>Total</span>
                                    <span className="text-red-500 animate-pulse">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-lg h-14 shadow-lg hover:translate-y-[-2px] transition-transform"
                                onClick={handlePlaceOrder}
                                disabled={isProcessing}
                            >
                                {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Place Order'}
                            </Button>
                            <p className="text-xs text-zinc-500 mt-4 text-center">
                                By placing your order, you agree to our Terms of Service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
