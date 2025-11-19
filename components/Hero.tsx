import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop')",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Experience the <br />
                    <span className="text-primary">Perfect Cup</span>
                </h1>
                <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-100">
                    Premium coffee beans sourced from the finest farms.
                    Roasted to perfection for your daily delight.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/shop"
                        className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Shop Now
                    </Link>
                    <Link
                        href="/about"
                        className="px-8 py-4 bg-white text-foreground rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                    >
                        Our Story
                    </Link>
                </div>
            </div>
        </section>
    );
}
