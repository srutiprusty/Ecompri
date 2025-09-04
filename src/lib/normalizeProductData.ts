export function normalizeProductData(scrapedData: any[]) {
  return scrapedData.map((item) => ({
    platform: item.platform,
    title: item.title,
    image: item.image || null,
    price: item.price,
    url: item.url,
    discount: item.discount || 0,
    rating: item.rating || 0,
    lastChecked: new Date(),
  }));
}
