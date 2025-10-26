"use client";
import React, { useState } from "react";

import { ShoppingCart, Menu, X } from "lucide-react";

const Nav = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="sticky top-0 z-50" style={{ background: "#0a0a0a" }}>
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] rounded-xl flex items-center justify-center shadow-lg transform rotate-12">
                        <ShoppingCart className="w-7 h-7 text-white transform -rotate-12" />
                    </div>
                    <span className="text-3xl font-white bg-clip-text font-bold">
                        Price
                        <span className="text-3xl font-black bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-clip-text text-transparent">
                            Peek
                        </span>
                    </span>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex flex-1 max-w-md justify-evenly mx-8  gap-4 text-white font-semibold">
                    <a
                        href="#home"
                        onClick={() => setActiveTab("home")}
                        className={
                            activeTab === "home"
                                ? "bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-clip-text text-transparent font-semibold"
                                : "hover:text-white"
                        }
                    >
                        Home
                    </a>
                    <a
                        href="#features"
                        onClick={() => setActiveTab("features")}
                        className={
                            activeTab === "features"
                                ? "bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-clip-text text-transparent font-semibold"
                                : "hover:text-white"
                        }
                    >
                        Features
                    </a>
                    <a
                        href="#steps"
                        onClick={() => setActiveTab("steps")}
                        className={
                            activeTab === "steps"
                                ? "bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-clip-text text-transparent font-semibold"
                                : "hover:text-white"
                        }
                    >
                        About
                    </a>
                    <a
                        href="#faq"
                        onClick={() => setActiveTab("faq")}
                        className={
                            activeTab === "faq"
                                ? "bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-clip-text text-transparent font-semibold"
                                : "hover:text-white"
                        }
                    >
                        FAQ
                    </a>
                </div>

                {/* Signup/Login Button (desktop only) */}
                <div className="hidden md:block">
                    <button
                        className="bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-[length:200%_auto] text-white uppercase m-2 transition-all duration-500 ease-in-out hover:bg-right hover:text-white rounded-full px-6 py-2 text-sm font-semibold shadow-lg hover:shadow-red-500/30"
                        onClick={() => {
                            window.location.href = "/login";
                        }}
                    >
                        Signup / Login
                    </button>
                </div>

                {/* Hamburger (mobile) */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? (
                            <X className="w-7 h-7 text-white" />
                        ) : (
                            <Menu className="w-7 h-7 text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden text-center bg-[#0a0a0a] px-4 py-3 space-y-3 text-white font-semibold">
                    <a
                        href="#home"
                        onClick={() => {
                            setActiveTab("home");
                            setIsOpen(false);
                        }}
                        className={
                            activeTab === "home"
                                ? "block bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-clip-text text-transparent"
                                : "block hover:text-white"
                        }
                    >
                        Home
                    </a>
                    <a
                        href="#features"
                        onClick={() => {
                            setActiveTab("features");
                            setIsOpen(false);
                        }}
                        className={
                            activeTab === "features"
                                ? "block bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-clip-text text-transparent"
                                : "block hover:text-white"
                        }
                    >
                        Features
                    </a>
                    <a
                        href="#steps"
                        onClick={() => {
                            setActiveTab("steps");
                            setIsOpen(false);
                        }}
                        className={
                            activeTab === "steps"
                                ? "block bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-clip-text text-transparent"
                                : "block hover:text-white"
                        }
                    >
                        About
                    </a>
                    <a
                        href="#faq"
                        onClick={() => {
                            setActiveTab("faq");
                            setIsOpen(false);
                        }}
                        className={
                            activeTab === "faq"
                                ? "block bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-clip-text text-transparent"
                                : "block hover:text-white"
                        }
                    >
                        FAQ
                    </a>
                    <button
                        className="w-full bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] text-white rounded-full px-6 py-2 text-sm font-semibold shadow-lg hover:shadow-red-500/30"
                        onClick={() => {
                            window.location.href = "/login";
                            setIsOpen(false);
                        }}
                    >
                        Signup / Login
                    </button>
                </div>
            )}
        </header>
    );
};

export default Nav;
