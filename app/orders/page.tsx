"use client";

import { useOrderStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package, Truck, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
    const orders = useOrderStore((state) => state.orders);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <h1 className="text-3xl md:text-5xl font-bold font-heading uppercase text-white mb-8 tracking-tighter">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <Package className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2 uppercase">No Orders Yet</h2>
                    <p className="text-zinc-400 mb-8">Start your race journey today.</p>
                    <Link href="/shop">
                        <Button className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider">
                            Browse Gear
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <Card key={order.id} className="bg-zinc-900 border-zinc-800 animate-fade-in-up">
                            <CardHeader className="bg-zinc-950/50 border-b border-zinc-800 py-4">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-zinc-800 p-2 rounded">
                                            <Package className="text-red-600 w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase font-bold">Order ID</p>
                                            <p className="text-white font-mono font-bold">#{order.id}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase font-bold">Date</p>
                                            <p className="text-white">{new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase font-bold">Total</p>
                                            <p className="text-white font-bold">₹{order.total.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase font-bold">Status</p>
                                            <div className="flex items-center gap-2 text-yellow-500 font-bold">
                                                <Clock className="w-4 h-4" /> {order.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-zinc-800 rounded overflow-hidden">
                                                    {/* Using a placeholder or the actual image if stored */}
                                                    <div
                                                        className="w-full h-full bg-cover bg-center"
                                                        style={{ backgroundImage: `url(${item.image || 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7'})` }}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium group-hover:text-red-500 transition-colors">{item.name}</p>
                                                    <p className="text-xs text-zinc-500">Qty: {item.quantity} | Size: {item.size}</p>
                                                </div>
                                            </div>
                                            <p className="text-white font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                                <Separator className="bg-zinc-800 my-6" />
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-zinc-500">
                                        <span className="block mb-1 font-bold uppercase text-xs">Awaiting Shipment to:</span>
                                        {order.customer.address}, {order.customer.name}
                                    </div>
                                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:text-white hover:border-white">
                                        Track Order
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
