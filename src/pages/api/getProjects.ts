import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/common/mongoAtlas/connectMongo';
import ProjectModel from '@/common/mongoAtlas/utils/ProjectModel';

export default async function getProjects(req: NextApiRequest, res: NextApiResponse) {
  try {
    const connection = await connectMongo();
    const projects = await ProjectModel.find().exec();
    res.status(200).json(projects);
  } catch (error) {
    console.log('getProjects', error)
    res.json({ error })
  }
}