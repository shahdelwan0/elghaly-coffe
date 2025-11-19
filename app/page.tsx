import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Coffee, ShieldCheck, Truck, Award } from "lucide-react";
import { getProducts } from "@/app/actions/products";

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Featured Products */}
      <section className="py-20 pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular blends and single-origin coffees, loved
              by coffee enthusiasts everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-[#321a12] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/coffee.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="https://plus.unsplash.com/premium_photo-1733317435318-531c85f0f00a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxjb2ZmZSUyMGJyZXdpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop"
                alt="Coffee Brewing"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
                Our Passion for Coffee
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                At Elghaly Coffe, we believe that every cup tells a story. From
                the high-altitude farms where our beans are grown to the careful
                roasting process, we are dedicated to bringing you the finest
                coffee experience.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our master roasters carefully select each batch to ensure
                consistency and flavor. Whether you prefer a bold espresso or a
                smooth pour-over, we have something for every palate.
              </p>
              <button className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-green-700 transition-colors">
                Read Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
