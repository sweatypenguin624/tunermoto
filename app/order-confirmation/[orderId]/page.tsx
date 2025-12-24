"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package } from "lucide-react";
import Link from "next/link";
import { useOrderStore } from "@/lib/store";
import { Separator } from "@/components/ui/separator";

export default function OrderConfirmationPage({ params }: { params: Promise<{ orderId: string }> }) {
    const unwrappedParams = use(params);
    const { orderId } = unwrappedParams;
    const orders = useOrderStore((state) => state.orders);
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        const foundOrder = orders.find(o => o.id === orderId);
        setOrder(foundOrder);
    }, [orderId, orders]);

    if (!order) {
        return (
            <div className="container mx-auto px-4 py-20 text-center text-white">
                <h1 className="text-2xl font-bold mb-4">Finding your order...</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-20 max-w-2xl">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 text-center animate-fade-in-up">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-heading uppercase text-white mb-2">Order Confirmed!</h1>
                <p className="text-zinc-400 mb-8">Thank you for your purchase. Your order <span className="text-white font-bold">#{order.id}</span> has been received.</p>

                <div className="bg-zinc-950 p-6 rounded-lg text-left mb-8 border border-zinc-800">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5" /> Order Details
                    </h3>
                    <div className="space-y-3 text-sm">
                        {order.items.map((item: any) => (
                            <div key={item.id} className="flex justify-between text-zinc-400">
                                <span>{item.quantity}x {item.name}</span>
                                <span className="text-white">₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <Separator className="bg-zinc-800 my-2" />
                        <div className="flex justify-between font-bold text-white text-lg">
                            <span>Total</span>
                            <span>₹{order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/orders">
                        <Button variant="outline" className="w-full sm:w-auto border-zinc-700 text-white hover:bg-zinc-800 uppercase tracking-wider">
                            View My Orders
                        </Button>
                    </Link>
                    <Link href="/shop">
                        <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
