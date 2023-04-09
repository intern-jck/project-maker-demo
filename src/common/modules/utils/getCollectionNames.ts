import type { CollectionType } from '@/common/types';

export default function getCollectionNames(collections: Array<CollectionType>) {
  const names = collections.map((collection: CollectionType) => (collection.name))
  return names;
};