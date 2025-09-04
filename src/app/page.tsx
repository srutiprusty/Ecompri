"use client"
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  ShoppingCart,
  User,
  Heart,
  Bell,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import Step from "@/app/_components/Step";
import FAQ from "@/app/_components/Faq";
import Nav from "@/app/_components/Nav";
import Footer from "@/app/_components/Footer";

interface FeatureCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}
interface Product {
  id: number;
  name: string;
  image: string;
  prices: { store: string; price: number; originalPrice: number }[];
  bestPrice: number;
  savings: number;
}

const PricePeekApp = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");

  // Sample product data
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "iPhone 15 Pro",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop",
      prices: [
        { store: "Amazon", price: 999, originalPrice: 1099 },
        { store: "Best Buy", price: 1049, originalPrice: 1099 },
        { store: "Apple Store", price: 1099, originalPrice: 1099 },
      ],
      bestPrice: 999,
      savings: 100,
    },
    {
      id: 2,
      name: "MacBook Air M2",
      image:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=200&fit=crop",
      prices: [
        { store: "Amazon", price: 1099, originalPrice: 1199 },
        { store: "Best Buy", price: 1149, originalPrice: 1199 },
        { store: "Apple Store", price: 1199, originalPrice: 1199 },
      ],
      bestPrice: 1099,
      savings: 100,
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      prices: [
        { store: "Amazon", price: 349, originalPrice: 399 },
        { store: "Best Buy", price: 379, originalPrice: 399 },
        { store: "Sony Store", price: 399, originalPrice: 399 },
      ],
      bestPrice: 349,
      savings: 50,
    },
  ]);

  const features: FeatureCardProps[] = [
    {
      Icon: Clock,
      title: "Time-Saving",
      description:
        "No more endless browsing and multiple tabs, all the information you need is now in one location.",
    },
    {
      Icon: DollarSign,
      title: "Money-Saving",
      description:
        "By comparing prices across various sites, giving you the best deal available.",
    },
    {
      Icon: Users,
      title: "User-Friendly Interface",
      description:
        "Designed with simplicity in mind so that easy to navigate, even for those who are not tech-savvy.",
    },
    {
      Icon: TrendingUp,
      title: "Real-Time Updates",
      description:
        "Prices and deals are updated continuously, providing you with the most current information.",
    },
  ];

  // Feature Card
  const FeatureCard: React.FC<FeatureCardProps> = ({
    Icon,
    title,
    description,
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl p-8 text-center hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
    >
      <div className="bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="text-white" size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );

  // Product Card
  /*   interface ProductCardProps {
        product: Product;
    }
    const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300"
        >
            <div className="relative mb-4">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                    Save ${product.savings}
                </div>
            </div>
            <h3 className="text-white font-semibold text-lg mb-3">
                {product.name}
            </h3>
            <div className="space-y-2 mb-4">
                {product.prices.map((price, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-400">{price.store}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-white font-bold">${price.price}</span>
                            {price.originalPrice > price.price && (
                                <span className="text-gray-500 line-through text-sm">
                                    ${price.originalPrice}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between">
                <span className="text-green-400 font-bold text-lg">
                    Best: ${product.bestPrice}
                </span>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Compare
                </button>
            </div>
        </motion.div>) */


  return (
    <div className="min-h-screen text-white" style={{ background: "#0a0a0a" }}>

      <Nav />
      {/* Hero Section */}
      <motion.section id="home"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="py-20 px-4 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Compare Prices,
          <br />
          <span className="bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27]  bg-clip-text text-transparent">Save Money</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Find the best deals across multiple e-commerce platforms in seconds.
          Smart shopping made simple.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/*  <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                      */}
          <button className="bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] 
  bg-[length:200%_auto] text-white text-sm font-semibold uppercase 
  px-12 py-4 m-2 rounded-lg shadow-lg 
  transition-all duration-500 ease-in-out 
  hover:bg-right hover:text-white"
            onClick={() => { window.location.href = "/compare" }}>  Start Comparing Now
          </button>
          {/*  <button className="border border-gray-700 hover:border-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                        Learn More
                    </button> */}
        </div>
      </motion.section>




      {/* Features Section */}

      <section className="py-20 px-4" id="features">
        <div className="container mx-auto">
          <motion.div

            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className=" text-center text-white-800 text-4xl font-bold mb-4">Why Choose <span className="bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27]  bg-clip-text text-transparent">PricePeek?</span></h2>
            <p className="text-gray-400 text-lg">
              Everything you need to make smart shopping decisions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      <section id="steps"><Step /></section>

      {/* Products Section */}
      {/*    
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">Trending Comparisons</h2>
                        <p className="text-gray-400 text-lg">
                            See what products others are comparing right now
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
 */}
      {/* FAQ Section */}
      <section id="faq"><FAQ /></section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PricePeekApp;
