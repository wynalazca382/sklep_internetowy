import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
}

const productSchema = new Schema<IProduct>({
  id: Number,
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String],
  quantity: Number,
});

// Sprawdź, czy model już istnieje, zanim go zdefiniujesz
const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export { Product };
export type { IProduct };
