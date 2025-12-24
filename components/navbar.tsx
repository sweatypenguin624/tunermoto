"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export function Navbar() {
    const items = useCartStore((state) => state.items);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold font-heading uppercase tracking-tighter text-white">
                        The <span className="text-primary">Merch</span> Store
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-300">
                    <Link href="/" className="hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/shop" className="hover:text-primary transition-colors">
                        Shop
                    </Link>
                    <Link href="/shop?category=Men" className="hover:text-primary transition-colors">
                        Men
                    </Link>
                    <Link href="/shop?category=Women" className="hover:text-primary transition-colors">
                        Women
                    </Link>
                    <Link href="/shop?category=Kids" className="hover:text-primary transition-colors">
                        Kids
                    </Link>
                    <Link href="/shop?category=Accessories" className="hover:text-primary transition-colors">
                        Accessories
                    </Link>
                    <Link href="/about" className="hover:text-primary transition-colors">
                        About
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search merch..."
                            className="pl-9 h-9 bg-zinc-900 border-zinc-800 focus-visible:ring-primary"
                        />
                    </div>

                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative text-zinc-300 hover:text-white hover:bg-zinc-800">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">Cart</span>
                            {mounted && cartCount > 0 && (
                                <span className="absolute top-0 right-0 h-4 w-4 text-[10px] flex items-center justify-center font-bold rounded-full bg-primary text-white ring-2 ring-black animate-pulse-red">
                                    {cartCount}
                                </span>
                            )}
                        </Button>
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
                                <User className="h-5 w-5" />
                                <span className="sr-only">User menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-zinc-800 text-zinc-300">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white">Profile</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white">Orders</DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="focus:bg-zinc-900 focus:text-white text-red-500">Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-zinc-300 hover:text-white">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-black border-zinc-800 text-white">
                            <nav className="flex flex-col gap-4 mt-8">
                                <Link href="/" className="text-lg font-semibold hover:text-primary">
                                    Home
                                </Link>
                                <Link href="/shop" className="text-lg font-semibold hover:text-primary">
                                    Shop
                                </Link>
                                <Link href="/shop?category=Men" className="text-lg font-semibold hover:text-primary">
                                    Men
                                </Link>
                                <Link href="/shop?category=Women" className="text-lg font-semibold hover:text-primary">
                                    Women
                                </Link>
                                <Link href="/shop?category=Kids" className="text-lg font-semibold hover:text-primary">
                                    Kids
                                </Link>
                                <Link href="/shop?category=Accessories" className="text-lg font-semibold hover:text-primary">
                                    Accessories
                                </Link>
                                <Link href="/about" className="text-lg font-semibold hover:text-primary">
                                    About
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
