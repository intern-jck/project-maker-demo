import { Schema, model, models } from 'mongoose';

// Mongo DB Schema for a document
const Categories = new Schema<ProjectType>({
  category: { type: String, default: '' },
  name: { type: String, default: '' },
  github_url: { type: String, default: '' },
  link: { type: String, default: '' },
  client: { type: String, default: '' },
  client_url: { type: String, default: '' },
  date: {
    start_month: { type: String, default: '' },
    start_year: { type: String, default: '' },
    end_month: { type: String, default: '' },
    end_year: { type: String, default: '' },
  },
  short: { type: String, default: '' },
  info: { type: String, default: '' },
  tech: [],
  photos: [],
});

// Create a model using document type and schema
// Add a test to check if model has been created, else make a new one.
const Project = models.Projects || model<ProjectType>('Projects', ProjectSchema);
export default Project;