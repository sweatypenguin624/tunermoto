"use client";

import { useOrderStore } from "@/lib/store";
import { getAllProducts } from "@/lib/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Package, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function AdminPage() {
    const orders = useOrderStore((state) => state.orders);
    const products = getAllProducts();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Calculate Stats
    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    // Mock active users
    const activeUsers = 124;

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="flex justify-between items-center mb-8 animate-speed-in-left">
                <h1 className="text-3xl md:text-5xl font-bold font-heading uppercase text-white tracking-tighter">Admin Dashboard</h1>
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white uppercase font-bold tracking-wider">
                    Export Report
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-up">
                <Card className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-colors group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400 font-bold uppercase tracking-wider">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-red-600 group-hover:scale-125 transition-transform" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">₹{totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-zinc-500">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-colors group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400 font-bold uppercase tracking-wider">Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-red-600 group-hover:scale-125 transition-transform" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">+{totalOrders}</div>
                        <p className="text-xs text-zinc-500">+180.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-colors group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400 font-bold uppercase tracking-wider">Products</CardTitle>
                        <Package className="h-4 w-4 text-red-600 group-hover:scale-125 transition-transform" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{totalProducts}</div>
                        <p className="text-xs text-zinc-500">+12 new items this week</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-colors group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400 font-bold uppercase tracking-wider">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-red-600 group-hover:scale-125 transition-transform" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">+{activeUsers}</div>
                        <p className="text-xs text-zinc-500">+19 since last hour</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Recent Orders */}
                <div className="space-y-6 animate-speed-in-left delay-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-2">
                            <TrendingUp className="text-red-600" /> Recent Orders
                        </h2>
                        <Button variant="link" className="text-zinc-400 hover:text-white">View All</Button>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                        {orders.length === 0 ? (
                            <div className="p-8 text-center text-zinc-500">No orders yet.</div>
                        ) : (
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-zinc-500 uppercase bg-zinc-950 font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3">Order ID</th>
                                        <th className="px-6 py-3">Customer</th>
                                        <th className="px-6 py-3">Total</th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-zinc-300">
                                    {orders.slice(0, 5).map((order) => (
                                        <tr key={order.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                                            <td className="px-6 py-4 font-mono font-bold">#{order.id}</td>
                                            <td className="px-6 py-4">{order.customer.name}</td>
                                            <td className="px-6 py-4 text-white font-bold">${order.total.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-yellow-500 font-bold">{order.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Inventory Snapshot */}
                <div className="space-y-6 animate-speed-in-right delay-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-2">
                            <Package className="text-red-600" /> Inventory Snapshot
                        </h2>
                        <Button variant="link" className="text-zinc-400 hover:text-white">Manage Products</Button>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-zinc-500 uppercase bg-zinc-950 font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-3">Product Name</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3 text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody className="text-zinc-300">
                                {products.slice(0, 5).map((product) => (
                                    <tr key={product.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                                        <td className="px-6 py-4 font-medium truncate max-w-[200px]">{product.name}</td>
                                        <td className="px-6 py-4">{product.category}</td>
                                        <td className="px-6 py-4 text-right font-bold text-white">₹{product.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
