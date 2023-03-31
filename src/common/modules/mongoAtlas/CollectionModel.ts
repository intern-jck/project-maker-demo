import { Schema, model, models } from 'mongoose';

// Type for a single document
import type CollectionType from '@/common/types/CollectionType';

// Mongo DB Schema for a document
const CollectionSchema = new Schema<CollectionType>({
  name: { type: String, default: '' },
  projects: [],
});

// Create a model using document type and schema
// Add a test to check if model has been created, else make a new one.
const CollectionModel = models.Collections || model<CollectionType>('Collections', CollectionSchema);
export default CollectionModel;