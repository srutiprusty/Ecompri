import mongoose, { Schema, Document, Model } from "mongoose";

interface PlatformData {
  platform: "Amazon" | "Flipkart";
  title: string;
  price: number;
  url: string;
  image?: string;
  rating: number;
  timestamp: Date;
}

interface ComparisonItem {
  title: string;
  amazon: {
    price: number;
    rating: number;
    url: string;
    image?: string;
    available?: boolean;
  };
  flipkart: {
    price: number;
    rating: number;
    url: string;
    image?: string;
    available?: boolean;
  };
  priceDifference: number;
  cheaperPlatform: "Amazon" | "Flipkart" | "Same";
  savings: number;
  similarityScore: number;
}

interface ComparisonSummary {
  amazonCheaper: number;
  flipkartCheaper: number;
  averageSavings: number;
  maximumSaving: number;
  lastCompared: Date;
}

interface Comparison {
  totalComparisons: number;
  items: ComparisonItem[];
  summary: ComparisonSummary;
}

export interface IProduct extends Document {
  name: string;
  normalizedName: string;
  platformData: PlatformData[];
  comparison: Comparison;
  lastUpdated: Date;
}

// Define the schema
const productSchema: Schema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  normalizedName: { type: String, required: true, lowercase: true, trim: true },
  platformData: [
    {
      platform: { type: String, enum: ["Amazon", "Flipkart"], required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      url: { type: String, required: true },
      image: String,
      rating: { type: Number, min: 0, max: 5, default: 0 },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  comparison: {
    totalComparisons: { type: Number, default: 0 },
    items: [
      {
        title: String,
        amazon: {
          price: Number,
          rating: Number,
          url: String,
          image: String,
          available: { type: Boolean, default: false },
        },
        flipkart: {
          price: Number,
          rating: Number,
          url: String,
          image: String,
          available: { type: Boolean, default: false },
        },
        priceDifference: { type: Number, default: 0 },
        cheaperPlatform: {
          type: String,
          enum: ["Amazon", "Flipkart", "Same"],
          default: "Same",
        },
        savings: { type: Number, default: 0 },
        similarityScore: { type: Number, min: 0, max: 1 },
      },
    ],
    summary: {
      amazonCheaper: { type: Number, default: 0 },
      flipkartCheaper: { type: Number, default: 0 },
      averageSavings: { type: Number, default: 0 },
      maximumSaving: { type: Number, default: 0 },
      lastCompared: { type: Date, default: Date.now },
    },
  },
  lastUpdated: { type: Date, default: Date.now },
});

// Add index for faster queries
productSchema.index({ normalizedName: 1 });

// Pre-save middleware to ensure normalizedName is set
productSchema.pre<IProduct>("save", function (next) {
  if (this.name && !this.normalizedName) {
    this.normalizedName = this.name.toLowerCase().trim();
  }
  next();
});

// Export model for hot-reloading (Next.js best practice)
const Product =
  (mongoose.models.Product as Model<IProduct>) ||
  mongoose.model<IProduct>("Product", productSchema);
export default Product;
