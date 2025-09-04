// File: scrapeFlipkart.ts

import puppeteer from "puppeteer";

// Define an interface for the scraped product data
interface IScrapedProduct {
  platform: string;
  title: string | null;
  price: number | null;
  url: string | null;
  image: string | null;
  rating: number;
  discount?: number;
  timestamp: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function scrapeFlipkart(searchTerm: string) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--window-size=1920,1080",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
      ],
      defaultViewport: { width: 1920, height: 1080 },
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    });

    const url = `https://www.flipkart.com/search?q=${encodeURIComponent(
      searchTerm
    )}`;
    console.log(`Navigating to Flipkart: ${url}`);

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    await delay(3000);

    const results = await page.evaluate(() => {
      const products: IScrapedProduct[] = [];

      // Try multiple selectors for product cards
      const selectors = [
        "div[data-id]",
        "div._1AtVbE",
        "div._1xHGtK._373qXS",
        'div[class*="product-unit"]',
        'div[class*="product-card"]',
        'div[style*="width: 25%"]',
      ];

      let productCards: Element[] = [];
      for (const selector of selectors) {
        const cards = Array.from(document.querySelectorAll(selector));
        if (cards.length > 0) {
          productCards = cards;
          break;
        }
      }

      productCards.forEach((card) => {
        try {
          // Try multiple title selectors
          const titleSelectors = [
            "._4rR01T",
            "._2B099V",
            ".s-title",
            '[class*="title"]',
            "a[title]",
            "div[title]",
            "h1",
            "h2",
            "h3",
            "h4",
          ];

          let titleEl: Element | null = null;
          for (const selector of titleSelectors) {
            titleEl = card.querySelector(selector);
            if (titleEl && titleEl.textContent?.trim()) break;
          }

          // Try multiple price selectors
          const priceSelectors = [
            "._30jeq3",
            '[class*="price"]',
            '[class*="Price"]',
            ".price",
            ".Price",
            ".product-price",
          ];

          let priceEl: Element | null = null;
          for (const selector of priceSelectors) {
            priceEl = card.querySelector(selector);
            if (priceEl && priceEl.textContent) break;
          }

          // URL and image selectors
          const urlEl = card.querySelector(
            'a[href*="/p/"]'
          ) as HTMLAnchorElement | null;
          const imageEl = card.querySelector(
            'img[src*="flipkart"]'
          ) as HTMLImageElement | null;
          const ratingEl = card.querySelector('._3LWZlK, [class*="rating"]');

          const title = titleEl?.textContent?.trim() || null;
          const priceText =
            priceEl?.textContent?.replace(/[^0-9]/g, "") || null;
          const url = urlEl?.href
            ? `https://www.flipkart.com${urlEl.href}`
            : null;
          const image = imageEl?.src || null;
          const rating = ratingEl ? parseFloat(ratingEl.textContent || "0") : 0;

          if (title && priceText && url) {
            products.push({
              platform: "Flipkart",
              title,
              price: parseInt(priceText, 10),
              url,
              image,
              rating,
              timestamp: new Date().toISOString(),
            });
          }
        } catch (e: unknown) {
          if (e instanceof Error) {
            console.error("Error parsing product:", e.message);
          }
        }
      });

      // If no products found with specific selectors, try a more general approach
      if (products.length === 0) {
        const allLinks = Array.from(
          document.querySelectorAll('a[href*="/p/"]')
        );
        allLinks.forEach((link) => {
          try {
            const anchor = link as HTMLAnchorElement;
            const title = anchor.title || anchor.textContent?.trim() || null;
            const priceMatch = anchor.textContent?.match(/₹([0-9,]+)/);
            const priceText = priceMatch
              ? priceMatch[1].replace(/,/g, "")
              : null;

            if (title && priceText) {
              products.push({
                platform: "Flipkart",
                title,
                price: parseInt(priceText, 10),
                url: `https://www.flipkart.com${anchor.href}`,
                image: null,
                rating: 0,
                timestamp: new Date().toISOString(),
              });
            }
          } catch (e) {
            // Silently continue
          }
        });
      }

      return products.slice(0, 10);
    });

    console.log(
      `Successfully scraped ${results.length} products from Flipkart`
    );
    if (results.length > 0) {
      console.log("Sample product:", JSON.stringify(results[0], null, 2));
    }
    return results;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Flipkart scraping error:", error.message);
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

export default scrapeFlipkart;
