import { Types } from 'mongoose';

type CollectionType = {
  _id: Types.ObjectId,
  name: string,
  projects: string[],
};

export default CollectionType;