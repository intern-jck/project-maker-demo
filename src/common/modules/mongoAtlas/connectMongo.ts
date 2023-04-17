import { connect } from 'mongoose';

const MONGO_NETLIFY_URI = process.env.MONGO_NETLIFY_URI;

export default async function connectMongo() {
  // Use non null operator to assure TS param will be there
  return connect(MONGO_NETLIFY_URI!);
};
