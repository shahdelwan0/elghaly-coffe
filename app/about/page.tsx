import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Coffee, ShieldCheck, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Elghaly Coffe",
  description: "Learn more about Elghaly Coffe, our story, values, and coffee process.",
};

const highlights = [
  {
    icon: Coffee,
    title: "Fresh Roasting",
    description: "We roast in small batches to keep every cup vibrant, balanced, and aromatic.",
  },
  {
    icon: ShieldCheck,
    title: "Quality First",
    description: "Every bean is selected with care for consistency, traceability, and flavor.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "We prepare and ship orders quickly so your coffee stays fresh when it arrives.",
  },
  {
    icon: Award,
    title: "Trusted Experience",
    description: "A coffee brand built around great taste, reliable service, and repeat customers.",
  },
];

const values = [
  "Ethically sourced beans from trusted growers.",
  "Careful roasting profiles for different brewing styles.",
  "A simple shopping experience with clear product details.",
  "Support that helps customers choose the right coffee.",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-[#321a12] py-24 pt-32 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/coffee.png')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-gray-200">
              About Elghaly Coffe
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Coffee crafted with care from bean to cup.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Elghaly Coffe brings together carefully selected beans, precise roasting,
              and a customer-first shopping experience. Our goal is simple: make great
              coffee easy to discover, order, and enjoy.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Explore Products
              </Link>
              <Link
                href=""
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary md:text-4xl">
                Our Story
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                We started with a simple idea: coffee should feel premium without feeling
                complicated. That means honest product information, consistent roasting,
                and a store experience that makes it easy to find the right blend for
                your daily routine.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-700">
                Whether you prefer espresso, pour-over, or a rich everyday blend, we
                focus on flavor clarity and freshness so every order feels worth coming
                back to.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f1eb] py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
                Focus
              </p>
              <p className="mt-4 text-4xl font-bold text-primary">Fresh</p>
              <p className="mt-3 text-gray-600">
                Roasted to preserve aroma, sweetness, and balance in every brew.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
                Experience
              </p>
              <p className="mt-4 text-4xl font-bold text-primary">Easy</p>
              <p className="mt-3 text-gray-600">
                Simple product browsing, clear choices, and smooth checkout.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
                Care
              </p>
              <p className="mt-4 text-4xl font-bold text-primary">Trusted</p>
              <p className="mt-3 text-gray-600">
                A brand built on reliability, quality control, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary md:text-4xl">
                What We Stand For
              </h2>
              <ul className="mt-6 space-y-4">
                {values.map((value) => (
                  <li
                    key={value}
                    className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <span className="text-gray-700">{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-4xl bg-[#321a12] p-8 text-white shadow-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-300">
                Our Promise
              </p>
              <h3 className="mt-4 text-3xl font-bold text-primary">
                Great coffee, delivered with attention to detail.
              </h3>
              <p className="mt-6 leading-8 text-gray-300">
                We want every visit to feel confident and every order to arrive with the
                same quality you saw on the page. From product presentation to final
                delivery, our experience is designed to feel clean, reliable, and premium.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Browse Coffee
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}