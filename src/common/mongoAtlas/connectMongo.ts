import { connect } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

export default async function connectMongo() {
  // Use non null operator to assure TS param will be there
  return connect(MONGO_URI!);
};
