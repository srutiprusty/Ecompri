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
  if (!title) return "";

  let normalized = title.toLowerCase();

  // Extract and preserve important specifications
  const specs = [];
  const specMatches = normalized.match(
    /\d+\s*(gb|tb|mp|inch|cm|core|gen|mah)/g
  );
  if (specMatches) {
    specs.push(...specMatches);
  }

  // Remove common filler words but preserve product identifiers
  const wordsToRemove = [
    "with",
    "for",
    "and",
    "the",
    "new",
    "latest",
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
  const MIN_SIMILARITY_THRESHOLD = 0.15; // Lowered threshold for better matching
  const MAX_PRICE_DIFFERENCE_PERCENTAGE = 50; // Maximum price difference of 50%
  const comparisons: IComparisonItem[] = [];

  console.log(`\n=== Starting Product Comparison ===`);
  console.log(`Amazon products: ${amazonProducts.length}`);
  console.log(`Flipkart products: ${flipkartProducts.length}`);

  amazonProducts.forEach((amazonProduct, amazonIndex) => {
    if (!amazonProduct?.title || !amazonProduct?.price) {
      console.log(
        `Skipping Amazon product ${amazonIndex}: missing title or price`
      );
      return;
    }

    const amazonNormalizedTitle = normalizeTitle(amazonProduct.title);
    console.log(
      `\nProcessing Amazon product ${amazonIndex}: "${amazonProduct.title}"`
    );
    console.log(`Normalized: "${amazonNormalizedTitle}"`);

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
          normalizedTitle: flipkartNormalizedTitle,
        };
      });

    if (flipkartMatches.length === 0) {
      console.log(
        `No valid Flipkart products to compare with Amazon product ${amazonIndex}`
      );
      return;
    }

    const bestMatch = flipkartMatches.reduce(
      (best, current) =>
        current.similarity > best.similarity ? current : best,
      {
        similarity: 0,
        product: null as IScrapedProduct | null,
        normalizedTitle: "",
      }
    );

    console.log(
      `Best match similarity: ${bestMatch.similarity.toFixed(
        3
      )} (threshold: ${MIN_SIMILARITY_THRESHOLD})`
    );
    console.log(`Best match Flipkart title: "${bestMatch.product?.title}"`);
    console.log(`Best match normalized: "${bestMatch.normalizedTitle}"`);

    if (bestMatch.similarity > MIN_SIMILARITY_THRESHOLD && bestMatch.product) {
      // Calculate price difference percentage
      const avgPrice = (amazonProduct.price + bestMatch.product.price) / 2;
      const priceDiffPercentage =
        Math.abs((amazonProduct.price - bestMatch.product.price) / avgPrice) *
        100;

      console.log(
        `Price diff %: ${priceDiffPercentage.toFixed(
          2
        )}% (max allowed: ${MAX_PRICE_DIFFERENCE_PERCENTAGE}%)`
      );
      console.log(
        `Amazon price: ₹${amazonProduct.price}, Flipkart price: ₹${bestMatch.product.price}`
      );

      // Only compare if prices are within reasonable range
      if (priceDiffPercentage <= MAX_PRICE_DIFFERENCE_PERCENTAGE) {
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
          `✅ MATCHED: Amazon "${amazonProduct.title}" with Flipkart "${
            bestMatch.product.title
          }" - Similarity: ${bestMatch.similarity.toFixed(3)}, Savings: ₹${
            comparisonItem.savings
          }, Cheaper: ${cheaperPlatform}`
        );
      } else {
        console.log(
          `❌ REJECTED: Price difference too high (${priceDiffPercentage.toFixed(
            2
          )}% > ${MAX_PRICE_DIFFERENCE_PERCENTAGE}%)`
        );
      }
    } else {
      console.log(
        `❌ REJECTED: Similarity too low (${bestMatch.similarity.toFixed(
          3
        )} < ${MIN_SIMILARITY_THRESHOLD})`
      );
    }
  });

  const totalComparisons = comparisons.length;

  // Debug output for summary
  console.log(`\n=== Comparison Summary ===`);
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
