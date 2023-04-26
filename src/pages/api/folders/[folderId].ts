import type { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo, FolderModel } from '@/common/modules/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { folderId } = req.query;
  try {
    const connection = await connectMongo();
    const response = await FolderModel.findById({ _id: folderId }).exec();
    res.status(200).json(response);
  } catch (error) {
    console.error('Mongo findById', error);
    res.status(500).json(error);
  }
};
