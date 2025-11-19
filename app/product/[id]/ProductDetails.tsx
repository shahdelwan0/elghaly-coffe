"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { Product } from "@/lib/schema";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState("250g");
  const [roast, setRoast] = useState("Medium");
  const [addition, setAddition] = useState("Plain");

  const handleAddToCart = () => {
    // Add product to cart with selected quantity
    addToCart(product, quantity);

    // Show toast notification
    addToast({
      type: "success",
      title: `${product.title} added to cart`,
      description: `Quantity: ${quantity} | LE ${(product.price * quantity).toFixed(2)}`,
      image: product.image,
      duration: 3000,
    });

    // Reset quantity after adding
    setQuantity(1);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-24">
        <Link
          href="/shop"
          className="inline-flex items-center text-gray-600 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {product.title}
            </h1>
            <p className="text-2xl font-bold text-primary mb-6">
              LE {product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Options */}
            <div className="space-y-6 mb-8">
              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight
                </label>
                <div className="flex flex-wrap gap-3">
                  {["250g", "500g", "1kg"].map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeight(w)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        weight === w
                          ? "border-primary bg-primary text-white"
                          : "border-gray-300 text-gray-700 hover:border-primary"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roast Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roast Level
                </label>
                <div className="flex flex-wrap gap-3">
                  {["Light", "Medium", "Dark"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRoast(r)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        roast === r
                          ? "border-primary bg-primary text-white"
                          : "border-gray-300 text-gray-700 hover:border-primary"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additions
                </label>
                <div className="flex flex-wrap gap-3">
                  {["Plain", "Cardamom", "Nutmeg"].map((a) => (
                    <button
                      key={a}
                      onClick={() => setAddition(a)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        addition === a
                          ? "border-primary bg-primary text-white"
                          : "border-gray-300 text-gray-700 hover:border-primary"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={20} className="text-gray-600" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={20} className="text-gray-600" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
