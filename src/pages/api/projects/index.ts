import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/common/modules/mongoAtlas/connectMongo';
import ProjectModel from '@/common/modules/mongoAtlas/ProjectModel';
import type ProjectType from '@/common/types/ProjectType';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const connection = await connectMongo();
    const projects = await ProjectModel.find().exec();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Mongo find', error)
    res.json({ error })
  }
}