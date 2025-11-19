import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#321a12] text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold mb-4 text-primary">Elghaly Coffe</h3>
                        <p className="text-gray-300 mb-6">
                            Premium coffee beans sourced from the best farms around the world.
                            Experience the true taste of coffee.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <a href="#" className="hover:text-primary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="hover:text-primary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="hover:text-primary transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="text-gray-300 hover:text-primary transition-colors">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Categories</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/shop/coffee-tools" className="text-gray-300 hover:text-primary transition-colors">
                                    Coffee Tools
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop/bundles" className="text-gray-300 hover:text-primary transition-colors">
                                    Coffee Bundles
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop/flavored" className="text-gray-300 hover:text-primary transition-colors">
                                    Flavored Coffee
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop/espresso" className="text-gray-300 hover:text-primary transition-colors">
                                    Espresso
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Elghaly Coffe. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
