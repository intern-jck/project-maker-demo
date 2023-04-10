import { Schema, model, models } from 'mongoose';
import type { FolderType } from '@/common/types';

// Mongo DB Schema for a document
const FolderSchema = new Schema<FolderType>({
  name: { type: String, default: '' },
});

// Create a model using document type and schema
// Add a test to check if model has been created, else make a new one.
const FolderModel = models.Folders || model<FolderType>('Folders', FolderSchema);
export default FolderModel;