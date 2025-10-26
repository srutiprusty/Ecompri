interface ScrapedProduct {
  platform: string;
  title: string | null;
  price: number | null;
  url: string | null;
  image: string | null;
  rating: number;
  discount?: number;
  timestamp: string;
}

export function normalizeProductData(scrapedData: ScrapedProduct[]) {
  return scrapedData
    .filter(
      (item) =>
        item.title !== null &&
        item.title !== undefined &&
        item.title.trim() !== "" &&
        item.price !== null &&
        item.price !== undefined &&
        item.url !== null &&
        item.url !== undefined
    )
    .map((item) => ({
      platform: item.platform,
      title: item.title as string,
      image: item.image || null,
      price: item.price as number,
      url: item.url as string,
      discount: item.discount || 0,
      rating: item.rating || 0,
      lastChecked: new Date(),
    }));
}
