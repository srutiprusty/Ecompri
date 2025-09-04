"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
    return (
        <footer
            className="border-t border-gray-800 py-6 px-4"
            style={{ background: "#121212" }}
        >
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <TrendingUp className="text-red-500" size={24} />
                    <span className="text-xl font-bold text-white">
                        Price<span className="text-red-500">Peek</span>
                    </span>
                </div>

                {/* Nav links */}
                {/*    <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Home
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        About
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        FAQ
                    </a>
                </div> */}
                <div className="flex space-x-6">
                    Designed and developed by{" "}Sruti Prusty
                    <FaGithub className="ml-3 mt-1" />

                    <a
                        href=""
                        className="text-gray-400 hover:text-white transition-colors "
                        target="_blank"
                        rel="noopener noreferrer"
                    >Visit GitHub</a>
                </div>
                {/* Copyright */}
                <div className="mt-4 md:mt-0 text-gray-400 text-sm text-center md:text-right">
                    &copy; 2025 PricePeek. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
