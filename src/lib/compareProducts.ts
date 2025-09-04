/* // File: compareProducts.ts

import stringSimilarity from "string-similarity";

// Define the interface for a product item from a scraper
interface IScrapedProduct {
  title: string;
  price: number;
  rating: number;
  url: string;
  image?: string | null;
}

// Define the interface for a single comparison item
interface IComparisonItem {
  title: string;
  amazon: {
    price: number;
    rating: number;
    url: string;
    image?: string | null;
  };
  flipkart: {
    price: number;
    rating: number;
    url: string;
    image?: string | null;
  };
  priceDifference: number;
  cheaperPlatform: "Amazon" | "Flipkart" | "Same";
  savings: number;
  similarityScore: number;
}

function normalizeTitle(title: string): string {
  let normalized = title.toLowerCase();

  const wordsToRemove = [
    "with",
    "for",
    "and",
    "the",
    "gb",
    "ram",
    "inch",
    "display",
    "camera",
    "storage",
    "color",
    "new",
    "model",
    "latest",
    "original",
    "official",
    "plus",
    "pro",
    "max",
    "ratings",
    "reviews",
    "ratings",
    "review",
    "offer",
    "discount",
    "only few left",
    "upto",
    "on exchange",
    "bank offer",
    "compare",
    "add to",
  ];

  wordsToRemove.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, "g");
    normalized = normalized.replace(regex, "");
  });

  normalized = normalized.replace(/\d+(\.\d+)?(cm|mp|core|xdr)?\b/g, "");

  normalized = normalized.replace(/[^a-z0-9\s]/g, " ").trim();
  normalized = normalized.replace(/\s+/g, " ");

  return normalized;
}

export function compareProducts(
  amazonProducts: IScrapedProduct[],
  flipkartProducts: IScrapedProduct[]
) {
  const MIN_SIMILARITY_THRESHOLD = 0.5;
  const comparisons: IComparisonItem[] = [];

  amazonProducts.forEach((amazonProduct: IScrapedProduct) => {
    if (!amazonProduct?.title || !amazonProduct?.price) return;

    const amazonNormalizedTitle = normalizeTitle(amazonProduct.title);

    const flipkartMatches = flipkartProducts
      .filter((fp: IScrapedProduct) => fp?.title && fp?.price)
      .map((flipkartProduct: IScrapedProduct) => ({
        product: flipkartProduct,
        similarity: stringSimilarity.compareTwoStrings(
          amazonNormalizedTitle,
          normalizeTitle(flipkartProduct.title)
        ),
      }));

    const bestMatch = flipkartMatches.reduce(
      (
        best: { similarity: number; product: IScrapedProduct | null },
        current: { similarity: number; product: IScrapedProduct | null }
      ) => (current.similarity > best.similarity ? current : best),
      { similarity: 0, product: null }
    );

    if (bestMatch.similarity > MIN_SIMILARITY_THRESHOLD && bestMatch.product) {
      const priceDiff = amazonProduct.price - bestMatch.product.price;
      const cheaperPlatform = priceDiff > 0 ? "Flipkart" : "Amazon";

      const comparisonItem: IComparisonItem = {
        title: amazonProduct.title,
        amazon: {
          price: amazonProduct.price,
          rating: amazonProduct.rating || 0,
          url: amazonProduct.url,
          image: amazonProduct.image,
        },
        flipkart: {
          price: bestMatch.product.price,
          rating: bestMatch.product.rating || 0,
          url: bestMatch.product.url,
          image: bestMatch.product.image,
        },
        priceDifference: Math.abs(priceDiff),
        cheaperPlatform: cheaperPlatform as IComparisonItem["cheaperPlatform"],
        savings: Math.abs(priceDiff),
        similarityScore: bestMatch.similarity,
      };

      comparisons.push(comparisonItem);
    }
  });

  return {
    totalComparisons: comparisons.length,
    items: comparisons.sort((a, b) => b.savings - a.savings),
    summary: {
      amazonCheaper: comparisons.filter((c) => c.cheaperPlatform === "Amazon")
        .length,
      flipkartCheaper: comparisons.filter(
        (c) => c.cheaperPlatform === "Flipkart"
      ).length,
      averageSavings:
        comparisons.length > 0
          ? Math.round(
              comparisons.reduce((acc, curr) => acc + curr.savings, 0) /
                comparisons.length
            )
          : 0,
      maximumSaving:
        comparisons.length > 0
          ? Math.max(...comparisons.map((c) => c.savings))
          : 0,
    },
  };
}
 */

import stringSimilarity from "string-similarity";

// Interface for scraped products
interface IScrapedProduct {
  title: string;
  price: number;
  rating: number;
  url: string;
  image?: string | null;
}

// Interface for comparison results
interface IComparisonItem {
  title: string;
  amazon: {
    price: number;
    rating: number;
    url: string;
    image?: string | null;
  };
  flipkart: {
    price: number;
    rating: number;
    url: string;
    image?: string | null;
  };
  priceDifference: number;
  cheaperPlatform: "Amazon" | "Flipkart" | "Same";
  savings: number;
  similarityScore: number;
}

// Normalize product title to improve matching, preserving numbers/units
function normalizeTitle(title: string): string {
  let normalized = title.toLowerCase();

  // Remove common filler words but keep numbers/specs intact
  const wordsToRemove = [
    "with",
    "for",
    "and",
    "the",
    "color",
    "new",
    "model",
    "latest",
    "original",
    "official",
    "ratings",
    "reviews",
    "offer",
    "discount",
    "only few left",
    "upto",
    "on exchange",
    "bank offer",
    "compare",
    "add to",
  ];

  wordsToRemove.forEach((word) => {
    // Use word boundaries, case insensitive
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    normalized = normalized.replace(regex, "");
  });

  // Remove special characters but keep alphanumerics and spaces
  normalized = normalized.replace(/[^a-z0-9\s]/g, " ");

  // Collapse multiple spaces to one
  normalized = normalized.replace(/\s+/g, " ").trim();

  return normalized;
}

export function compareProducts(
  amazonProducts: IScrapedProduct[],
  flipkartProducts: IScrapedProduct[]
) {
  const MIN_SIMILARITY_THRESHOLD = 0.6;
  const comparisons: IComparisonItem[] = [];

  amazonProducts.forEach((amazonProduct) => {
    if (!amazonProduct?.title || !amazonProduct?.price) return;

    const amazonNormalizedTitle = normalizeTitle(amazonProduct.title);

    const flipkartMatches = flipkartProducts
      .filter((fp) => fp?.title && fp?.price)
      .map((flipkartProduct) => {
        const flipkartNormalizedTitle = normalizeTitle(flipkartProduct.title);
        const similarity = stringSimilarity.compareTwoStrings(
          amazonNormalizedTitle,
          flipkartNormalizedTitle
        );
        return {
          product: flipkartProduct,
          similarity,
        };
      });

    const bestMatch = flipkartMatches.reduce(
      (best, current) =>
        current.similarity > best.similarity ? current : best,
      { similarity: 0, product: null as IScrapedProduct | null }
    );

    if (bestMatch.similarity > MIN_SIMILARITY_THRESHOLD && bestMatch.product) {
      const priceDiff = amazonProduct.price - bestMatch.product.price;
      const cheaperPlatform =
        priceDiff > 0 ? "Flipkart" : priceDiff < 0 ? "Amazon" : "Same";

      const comparisonItem: IComparisonItem = {
        title: amazonProduct.title,
        amazon: {
          price: amazonProduct.price,
          rating: amazonProduct.rating || 0,
          url: amazonProduct.url,
          image: amazonProduct.image,
        },
        flipkart: {
          price: bestMatch.product.price,
          rating: bestMatch.product.rating || 0,
          url: bestMatch.product.url,
          image: bestMatch.product.image,
        },
        priceDifference: Math.abs(priceDiff),
        cheaperPlatform,
        savings: Math.abs(priceDiff),
        similarityScore: bestMatch.similarity,
      };

      comparisons.push(comparisonItem);

      // Debug output for matched product
      console.log(
        `Matched Amazon "${amazonProduct.title}" with Flipkart "${
          bestMatch.product.title
        }" - Similarity: ${bestMatch.similarity.toFixed(3)}, Savings: ₹${
          comparisonItem.savings
        }, Cheaper: ${cheaperPlatform}`
      );
    }
  });

  const totalComparisons = comparisons.length;

  // Debug output for summary
  console.log(`Total Comparisons: ${totalComparisons}`);
  console.log(
    `Amazon Cheaper: ${
      comparisons.filter((c) => c.cheaperPlatform === "Amazon").length
    }`
  );
  console.log(
    `Flipkart Cheaper: ${
      comparisons.filter((c) => c.cheaperPlatform === "Flipkart").length
    }`
  );
  const averageSavings =
    totalComparisons > 0
      ? Math.round(
          comparisons.reduce((acc, curr) => acc + curr.savings, 0) /
            totalComparisons
        )
      : 0;
  const maximumSaving =
    totalComparisons > 0 ? Math.max(...comparisons.map((c) => c.savings)) : 0;
  console.log(`Average Savings: ₹${averageSavings}`);
  console.log(`Maximum Saving: ₹${maximumSaving}`);

  return {
    totalComparisons,
    items: comparisons.sort((a, b) => b.savings - a.savings),
    summary: {
      amazonCheaper: comparisons.filter((c) => c.cheaperPlatform === "Amazon")
        .length,
      flipkartCheaper: comparisons.filter(
        (c) => c.cheaperPlatform === "Flipkart"
      ).length,
      averageSavings,
      maximumSaving,
    },
  };
}
