import rawProducts from '../scraper/products.json';

interface RawProduct {
    id: number | string;
    title: string;
    body_html: string;
    product_type: string;
    tags: string;
    variants: Array<{ price: string }>;
    options: Array<{ name: string, values: string[] }>;
    images: string[];
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    images: string[];
    sizes: string[];
    tags: string[];
    isNew?: boolean;
}

// Helper to strip HTML tags
function stripHtml(html: string) {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, '');
}

function determineCategory(product: RawProduct): string {
    const tags = (product.tags || "").toLowerCase();
    const title = (product.title || "").toLowerCase();
    const type = (product.product_type || "").toLowerCase();
    const options = JSON.stringify(product.options || []).toLowerCase();

    if (tags.includes('kids') || title.includes('kids') || title.includes('boy') || title.includes('girl')) {
        return 'Kids';
    }
    if (tags.includes('women') || title.includes('women') || title.includes('ladies') || title.includes('girl') || title.includes('female')) {
        return 'Women';
    }
    if (tags.includes('cap') || type.includes('accessory') || tags.includes('keychain') || tags.includes('sticker') || tags.includes('bag') || title.includes('sticker')) {
        return 'Accessories';
    }
    if (tags.includes('unisex') || options.includes('unisex') || title.includes('unisex')) {
        return 'Unisex';
    }
    // Default to Men for everything else
    return 'Men';
}

export const allProducts: Product[] = (rawProducts as unknown as RawProduct[]).map((p) => {
    // Find price from first variant or default
    const priceStr = p.variants?.[0]?.price || "0";
    const price = parseFloat(priceStr);

    // Extract sizes from options
    let sizes: string[] = [];
    const sizeOption = p.options?.find((o) => o.name === 'Size');
    if (sizeOption) {
        sizes = sizeOption.values;
    }
    return {
        id: p.id.toString(),
        name: p.title,
        price: price,
        description: stripHtml(p.body_html),
        category: determineCategory(p),
        images: p.images || [],
        sizes: sizes,
        tags: (p.tags || "").split(',').map((t: string) => t.trim()),
        isNew: false // Can add logic for this later based on date if available
    };
});

export function getAllProducts() {
    return allProducts;
}


export function getFeaturedProducts() {
    // Return first 8 products as featured for now
    return allProducts.slice(0, 8);
}

export function getProductById(id: string) {
    return allProducts.find(p => p.id === id);
}

export function getProductsByCategory(category: string) {
    if (category === 'All') return allProducts;
    return allProducts.filter(p => p.category === category);
}

export function getRelatedProducts(category: string, currentId: string) {
    return allProducts
        .filter(p => p.category === category && p.id !== currentId)
        .slice(0, 4);
}
