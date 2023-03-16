import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/common/modules/mongoAtlas/connectMongo';
import ProjectModel from '@/common/modules/mongoAtlas/ProjectModel';
import type ProjectType from '@/common/types/ProjectType';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, method } = req;
  const id = query.id;
  try {
    const connection = await connectMongo();
    const project = await ProjectModel.findById({ id }).exec();
    res.status(200).json(project);
  } catch (error) {
    console.error('Mongo findById', error)
    res.json({ error })
  }
}