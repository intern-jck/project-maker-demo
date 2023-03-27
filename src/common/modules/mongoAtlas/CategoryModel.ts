import { Schema, model, models } from 'mongoose';

// Type for a single document
import type CategoryType from '@/common/types/CategoryType';

// Mongo DB Schema for a document
const CategorySchema = new Schema<CategoryType>({
  category: { type: String, default: '' },
  count: { type: Number, default: 0 },
});

// Create a model using document type and schema
// Add a test to check if model has been created, else make a new one.
const Category = models.Categories || model<CategoryType>('Categories', CategorySchema);
export default Category;