import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/common/modules/mongoAtlas/connectMongo';
import ProjectModel from '@/common/modules/mongoAtlas/ProjectModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query;

  try {
    console.log(id)
    const connection = await connectMongo();
    const response = await ProjectModel.findById({ _id: id }).exec();

    res.status(200).json(response);
  } catch (error) {
    console.error('Mongo findById', error);
    res.status(500).json(error);
  }
}