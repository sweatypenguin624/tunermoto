"use client";

import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getAllProducts, Product } from "@/lib/products";
import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ShopContent() {
    const allProducts = getAllProducts();
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category');

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        if (initialCategory) {
            setSelectedCategories([initialCategory]);
        }
    }, [initialCategory]);

    const categories = ['Men', 'Women', 'Kids', 'Accessories'];

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev => {
            const newCats = prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat];
            setCurrentPage(1); // Reset to page 1 on filter change
            return newCats;
        });
    };

    const filteredProducts = useMemo(() => {
        if (selectedCategories.length === 0) return allProducts;
        return allProducts.filter(p => {
            // Direct match
            if (selectedCategories.includes(p.category)) return true;
            // Unisex fallback for Men/Women
            if (p.category === 'Unisex' && (selectedCategories.includes('Men') || selectedCategories.includes('Women'))) return true;
            return false;
        });
    }, [selectedCategories, allProducts]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const displayedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container mx-auto px-4 py-8 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 shrink-0 space-y-6 animate-speed-in-left">
                    <div className="hover:animate-shake-x">
                        <h3 className="text-lg font-bold font-heading uppercase text-white mb-4">Categories</h3>
                        <div className="space-y-2">
                            {categories.map((cat, i) => (
                                <div key={cat} className="flex items-center space-x-2 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                                    <Checkbox
                                        id={cat}
                                        className="border-zinc-700 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        checked={selectedCategories.includes(cat)}
                                        onCheckedChange={() => toggleCategory(cat)}
                                    />
                                    <Label htmlFor={cat} className="text-zinc-400 font-medium cursor-pointer hover:text-white transition-colors">{cat}</Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="bg-zinc-800" />

                    <div className="animate-fade-in-up delay-100">
                        <h3 className="text-lg font-bold font-heading uppercase text-white mb-4">Price Range</h3>
                        <div className="px-1">
                            <div className="h-2 bg-zinc-800 rounded-full mb-4 relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-primary rounded-full transition-all" />
                                <div className="absolute left-1/2 top-1/2 -mt-2 -ml-2 w-4 h-4 bg-white rounded-full shadow cursor-pointer border-2 border-primary hover:scale-125 transition-transform" />
                            </div>
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span>₹0</span>
                                <span>₹5000+</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="mb-6 flex justify-between items-center animate-fade-in-up">
                        <h2 className="text-2xl font-bold font-heading uppercase text-white tracking-tighter">
                            {selectedCategories.length > 0 ? selectedCategories.join(' & ') : 'All Products'}
                            <span className="text-zinc-500 text-lg ml-2 normal-case font-sans">({filteredProducts.length} items)</span>
                        </h2>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20 bg-zinc-900/50 rounded-lg border border-zinc-800 animate-fade-in-up">
                            <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                            <p className="text-zinc-400">Try adjusting your filters.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {displayedProducts.map((product, idx) => (
                                    <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                        <ProductCard {...product} />
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 animate-fade-in-up">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="border-zinc-700 hover:bg-zinc-800 text-white"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="text-white font-bold">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="border-zinc-700 hover:bg-zinc-800 text-white"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-8 text-white">Loading...</div>}>
            <ShopContent />
        </Suspense>
    );
}
