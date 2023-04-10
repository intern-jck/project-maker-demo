import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/common/modules/mongoAtlas/connectMongo';
import CollectionModel from '@/common/modules/mongoAtlas/FolderModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const { collectionId } = query;
  try {
    const connection = await connectMongo();
    const response = await CollectionModel.findById({ _id: collectionId }).exec();
    res.status(200).json(response);
  } catch (error) {
    console.error('Mongo findById', error);
    res.status(500).json(error);
  }
}