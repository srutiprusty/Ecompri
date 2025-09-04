// File: scrapeAmazon.ts

import puppeteer from "puppeteer";

// Helper functions
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function scrapeAmazon(searchTerm: string) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--window-size=1920,1080",
      ],
      defaultViewport: { width: 1920, height: 1080 },
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    const url = `https://www.amazon.in/s?k=${encodeURIComponent(searchTerm)}`;
    console.log(`Navigating to: ${url}`);

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    await page.waitForSelector(".s-result-item[data-asin]", {
      visible: true,
      timeout: 10000,
    });

    await delay(3000);

    const results = await page.evaluate(() => {
      const products: any[] = [];
      const items = document.querySelectorAll(
        '.s-result-item[data-asin]:not([data-asin=""])'
      );
      for (const item of items) {
        try {
          const titleEl = item.querySelector(
            ".a-size-medium.a-color-base.a-text-normal"
          );
          const priceEl = item.querySelector(".a-price-whole");

          // Use type assertion for a more specific Element type
          const urlEl = item.querySelector(
            "a.a-link-normal.a-text-normal"
          ) as HTMLAnchorElement | null;
          const imageEl = item.querySelector(
            "img.s-image"
          ) as HTMLImageElement | null;

          const ratingEl = item.querySelector(".a-icon-star-small .a-icon-alt");

          const title = titleEl ? titleEl.textContent.trim() : null;
          const priceText = priceEl
            ? priceEl.textContent.replace(/[^0-9]/g, "")
            : null;
          const url = urlEl ? urlEl.href : null;
          const image = imageEl ? imageEl.src : null;
          const rating = ratingEl
            ? parseFloat(ratingEl.textContent.split(" ")[0])
            : 0;

          if (title && priceText && url) {
            products.push({
              platform: "Amazon",
              title,
              price: parseInt(priceText, 10),
              url,
              image,
              rating,
              timestamp: new Date().toISOString(),
            });
          }
        } catch (e: unknown) {
          // Type-safe error handling
          if (e instanceof Error) {
            console.error("Error parsing product:", e.message);
          } else {
            console.error("Unknown error occurred during parsing");
          }
        }
      }
      return products.slice(0, 10);
    });

    console.log(`Successfully scraped ${results.length} products from Amazon`);
    if (results.length > 0) {
      console.log("Sample product:", JSON.stringify(results[0], null, 2));
    }

    return results;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Scraping error:", error.message);
    } else {
      console.error("An unknown scraping error occurred.");
    }
    return [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export default scrapeAmazon;
