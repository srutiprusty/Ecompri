import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";
import { normalizeProductData } from "@/lib/normalizeProductData";
import { compareProducts } from "@/lib/compareProducts";

// Import the actual scrapers
import scrapeAmazon from "@/lib/scrapeAmazon";
import scrapeFlipkart from "@/lib/scrapeFlipkart";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const [amazonResults, flipkartResults] = await Promise.all([
      scrapeAmazon(query),
      scrapeFlipkart(query),
    ]);

    if (amazonResults.length === 0 && flipkartResults.length === 0) {
      return NextResponse.json(
        { success: false, message: "No products found on any platform" },
        { status: 404 }
      );
    }

    const normalizedAmazon = normalizeProductData(amazonResults);
    const normalizedFlipkart = normalizeProductData(flipkartResults);

    // Ensure URL is always a string (convert null/undefined to empty string)
    const normalizedAmazonSafe = normalizedAmazon.map((p) => ({
      ...p,
      url: p.url ?? "",
    }));

    const normalizedFlipkartSafe = normalizedFlipkart.map((p) => ({
      ...p,
      url: p.url ?? "",
    }));

    const comparison = compareProducts(
      normalizedAmazonSafe,
      normalizedFlipkartSafe
    );

    const product = await Product.findOneAndUpdate(
      { normalizedName: query.toLowerCase() },
      {
        $set: {
          name: query,
          platformData: [...normalizedAmazon, ...normalizedFlipkart],
          comparison,
          lastUpdated: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      query,
      comparison: product.comparison,
      totalProducts: {
        amazon: amazonResults.length,
        flipkart: flipkartResults.length,
      },
    });
  } catch (error) {
    console.error("API GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
