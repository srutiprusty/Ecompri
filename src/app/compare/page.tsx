"use client";
import React, { useState } from "react";

// Add test queries
const testQueries = ["iphone", "laptop", "headphones"];
import {
    Search,
    ShoppingCart,
    ExternalLink,
    Star,
    TrendingDown,
} from "lucide-react";
import Nav from "../_components/Nav";

// ✅ Define types
interface StoreData {
    price: number;
    rating: number;
    reviews: number;
    url: string;
}

interface Product {
    id: number;
    productName: string;
    image: string;
    amazon: StoreData;
    flipkart: StoreData;
}

const page = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    const getBestPrice = (
        amazon: StoreData,
        flipkart: StoreData
    ): "amazon" | "flipkart" => {
        return amazon.price < flipkart.price ? "amazon" : "flipkart";
    };

    const getSavings = (amazon: StoreData, flipkart: StoreData): number => {
        return Math.abs(amazon.price - flipkart.price);
    };

    // New: fetch real data based on searchQuery
    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setError(null);
        setSearchResults([]); // Clear previous results

        try {
            const res = await fetch(`/api/compare?query=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();

            // Debug: log the API response
            console.log("API Response:", data);

            if (!res.ok) {
                setError(data.message || "Failed to fetch data");
                setSearchResults([]);
            } else {
                // Check if comparison data exists and has items
                if (!data.comparison || !data.comparison.items) {
                    console.error("Invalid API response structure:", data);
                    setError("Invalid data format received from server");
                    setSearchResults([]);
                    return;
                }

                // Map API comparison data to Product[] structure
                const products: Product[] = data.comparison.items.map(
                    (
                        item: any,
                        index: number // We generate ID here since API doesn't provide it
                    ) => ({
                        id: index + 1,
                        productName: item.title,
                        image: item.amazon.image || item.flipkart.image || "",
                        amazon: {
                            price: item.amazon.price,
                            rating: item.amazon.rating,
                            reviews: 0, // reviews not in API; set 0 or extend API
                            url: item.amazon.url,
                        },
                        flipkart: {
                            price: item.flipkart.price,
                            rating: item.flipkart.rating,
                            reviews: 0,
                            url: item.flipkart.url,
                        },
                    })
                );

                setSearchResults(products);
            }
        } catch (e) {
            console.error("Fetch error:", e);
            setError("An error occurred while fetching data");
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-white">
            {/* Navigation */}
            <Nav />
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-20 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    Find the Best Deals
                    <br />
                </h1>
                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                    Find the best deals across Amazon and Flipkart in seconds.
                    <br />
                    Smart shopping made simple.
                </p>

                {/* Search Section */}
                <div className="max-w-3xl mx-auto mb-16">
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 relative">
                            {/* Search Icon */}
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />

                            {/* Input + Button wrapper */}
                            <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden mr-5 p-1">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for products (e.g., iPhone 15, Samsung TV, MacBook)"
                                    className="flex-1 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none "
                                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                                />
                                <button
                                    onClick={handleSearch}
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-[#e52d27] via-[#b31217] to-[#e52d27] bg-[length:200%_auto] text-white uppercase transition-all duration-500 ease-in-out hover:bg-right hover:text-white px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-red-500/30 disabled:opacity-50 rounded-xl "
                                >
                                    {isLoading ? "..." : "Search"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                            <span className="ml-4 text-gray-400">
                                Fetching prices from Amazon & Flipkart...
                            </span>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-center font-semibold">{error}</p>
                    )}

                    {/* Search Results */}
                    {searchResults.length > 0 && !isLoading && (
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl font-bold mb-8 text-left">Search Results</h2>
                            <div className="space-y-6">
                                {searchResults.map((product) => {
                                    const bestPrice = getBestPrice(product.amazon, product.flipkart);
                                    const savings = getSavings(product.amazon, product.flipkart);

                                    return (
                                        <div
                                            key={product.id}
                                            className=" rounded-xl p-6 border border-gray-700"
                                            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                        >
                                            <div className="flex flex-col lg:flex-row gap-6">
                                                {/* Product Info */}
                                                <div className="flex-1">
                                                    <div className="flex flex-col sm:flex-row gap-4">
                                                        <img
                                                            src={product.image}
                                                            alt={product.productName}
                                                            className="w-32 h-32 object-cover rounded-lg mx-auto sm:mx-0"
                                                        />
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-semibold mb-2 text-center sm:text-left">
                                                                {product.productName}
                                                            </h3>
                                                            {savings > 0 && (
                                                                <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                                                                    <TrendingDown className="w-5 h-5 text-green-500" />
                                                                    <span className="text-green-500 font-medium">
                                                                        Save up to {formatPrice(savings)}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price Comparison Cards */}
                                                <div className="flex flex-col sm:flex-row gap-4 lg:w-2/3">
                                                    {/* Amazon Card */}
                                                    <div
                                                        className={`flex-1 bg-gray-700 rounded-lg p-4 border-2 ${bestPrice === "amazon"
                                                            ? "border-green-500"
                                                            : "border-transparent"
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                                                                    <span className="text-xs font-bold text-white">A</span>
                                                                </div>
                                                                <span className="font-semibold">Amazon</span>
                                                                {bestPrice === "amazon" && (
                                                                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                                                                        Best Price
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="text-2xl font-bold text-orange-400 mb-2">
                                                            {formatPrice(product.amazon.price)}
                                                        </div>

                                                        <div className="flex items-center gap-1 mb-3">
                                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-sm">{product.amazon.rating}</span>
                                                            <span className="text-gray-400 text-sm">
                                                                ({product.amazon.reviews} reviews)
                                                            </span>
                                                        </div>

                                                        <button
                                                            onClick={() => window.open(product.amazon.url, "_blank")}
                                                            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                                        >
                                                            View on Amazon
                                                            <ExternalLink className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* Flipkart Card */}
                                                    <div
                                                        className={`flex-1 bg-gray-700 rounded-lg p-4 border-2 ${bestPrice === "flipkart"
                                                            ? "border-green-500"
                                                            : "border-transparent"
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                                                                    <span className="text-xs font-bold text-white">F</span>
                                                                </div>
                                                                <span className="font-semibold">Flipkart</span>
                                                                {bestPrice === "flipkart" && (
                                                                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                                                                        Best Price
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="text-2xl font-bold text-blue-400 mb-2">
                                                            {formatPrice(product.flipkart.price)}
                                                        </div>

                                                        <div className="flex items-center gap-1 mb-3">
                                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-sm">{product.flipkart.rating}</span>
                                                            <span className="text-gray-400 text-sm">
                                                                ({product.flipkart.reviews} reviews)
                                                            </span>
                                                        </div>

                                                        <button
                                                            onClick={() => window.open(product.flipkart.url, "_blank")}
                                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                                        >
                                                            View on Flipkart
                                                            <ExternalLink className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Features Section */}
                    {searchResults.length === 0 && !isLoading && !error && (
                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
                            <div className="text-center p-6">
                                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
                                <p className="text-gray-400">
                                    Search across Amazon and Flipkart simultaneously to find the best
                                    deals.
                                </p>
                            </div>

                            <div className="text-center p-6">
                                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingDown className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                                <p className="text-gray-400">
                                    Compare prices instantly and save money on every purchase.
                                </p>
                            </div>

                            <div className="text-center p-6">
                                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ExternalLink className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Direct Links</h3>
                                <p className="text-gray-400">
                                    Click to redirect directly to the product page on your preferred
                                    platform.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default page;
