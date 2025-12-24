import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-900 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold font-heading uppercase text-white tracking-tighter">
                            The <span className="text-primary">Merch</span> Store
                        </h3>
                        <p className="text-sm text-zinc-500 max-w-xs">
                            Built for Racers. Worn by Legends. The ultimate destination for automotive lifestyle apparel.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-bold text-white uppercase tracking-wider mb-6">Shop</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
                            <li><Link href="/categories/cars" className="hover:text-primary transition-colors">Car Merch</Link></li>
                            <li><Link href="/categories/bikes" className="hover:text-primary transition-colors">Bike Merch</Link></li>
                            <li><Link href="/categories/racing" className="hover:text-primary transition-colors">Racing Gear</Link></li>
                            <li><Link href="/categories/clothing" className="hover:text-primary transition-colors">Streetwear</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-white uppercase tracking-wider mb-6">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-white uppercase tracking-wider mb-6">Stay Tuned</h4>
                        <p className="text-sm text-zinc-500 mb-4">
                            Subscribe for exclusive drops and early access.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Enter your email"
                                className="bg-zinc-900 border-zinc-800 focus-visible:ring-primary"
                            />
                            <Button size="icon" className="bg-primary hover:bg-red-700 shrink-0">
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
                    <p>© {new Date().getFullYear()} The Merchandise Store. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-zinc-400">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-zinc-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

import { ArrowRight } from "lucide-react";
