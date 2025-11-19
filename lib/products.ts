export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

export const products: Product[] = [
    {
        id: "1",
        title: "Signature Blend",
        price: 250.0,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop",
        category: "Coffee Beans",
        description: "Our signature blend combines the best of Arabica and Robusta beans for a rich, full-bodied flavor with notes of chocolate and caramel. Perfect for your daily brew.",
    },
    {
        id: "2",
        title: "Ethiopian Yirgacheffe",
        price: 320.0,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974&auto=format&fit=crop",
        category: "Single Origin",
        description: "A bright and floral coffee from the birthplace of coffee. Expect distinct notes of jasmine, lemon, and bergamot with a tea-like body.",
    },
    {
        id: "3",
        title: "Espresso Roast",
        price: 280.0,
        image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1974&auto=format&fit=crop",
        category: "Espresso",
        description: "Dark roasted to perfection, this blend delivers a bold and intense flavor profile with a thick crema. Ideal for espresso shots and milk-based drinks.",
    },
    {
        id: "4",
        title: "French Press Bundle",
        price: 850.0,
        image: "https://images.unsplash.com/photo-1506372023823-741c83b836fe?q=80&w=2070&auto=format&fit=crop",
        category: "Bundles",
        description: "Everything you need for the perfect French Press brew. Includes a premium French Press, a bag of our coarse-ground Signature Blend, and a measuring scoop.",
    },
    {
        id: "5",
        title: "Colombian Supremo",
        price: 290.0,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974&auto=format&fit=crop",
        category: "Single Origin",
        description: "Balanced and smooth, this Colombian classic offers a sweet acidity with nutty and fruity undertones. A crowd-pleaser for any time of day.",
    },
    {
        id: "6",
        title: "Hazelnut Delight",
        price: 260.0,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop",
        category: "Flavored",
        description: "Premium Arabica beans infused with natural hazelnut flavor. A creamy and nutty treat that pairs perfectly with milk.",
    },
    {
        id: "7",
        title: "Chemex Kit",
        price: 1200.0,
        image: "https://images.unsplash.com/photo-1506372023823-741c83b836fe?q=80&w=2070&auto=format&fit=crop",
        category: "Tools",
        description: "Master the art of pour-over coffee with this elegant Chemex kit. Includes a 6-cup Chemex, bonded filters, and a gooseneck kettle.",
    },
    {
        id: "8",
        title: "Decaf Roast",
        price: 240.0,
        image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1974&auto=format&fit=crop",
        category: "Decaf",
        description: "All the flavor without the caffeine. This Swiss Water Process decaf retains the rich taste of coffee with notes of malt and cocoa.",
    },
];
