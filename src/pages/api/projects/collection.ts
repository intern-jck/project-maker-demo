import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/common/modules/mongoAtlas/connectMongo';
import ProjectModel from '@/common/modules/mongoAtlas/ProjectModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { name } = query;

  try {
    const connection = await connectMongo();
    const response = await ProjectModel.find({ collection_name: name }).exec();
    console.log(response)
    res.status(200).json(response);
  } catch (error) {
    console.error('Mongo findById', error);
    res.status(500).json(error);
  }
}