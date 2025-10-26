"use client"

import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  DollarSign,
  Users,
  TrendingUp,
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


const PricePeekApp = () => {



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


      {/* FAQ Section */}
      <section id="faq"><FAQ /></section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PricePeekApp;
