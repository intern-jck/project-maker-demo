import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/common/modules/mongoAtlas/connectMongo';
import ProjectModel from '@/common/modules/mongoAtlas/ProjectModel';
import type ProjectType from '@/common/types/ProjectType';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, method } = req;
  const id = query.id;

  console.log(id, query, method);

  switch (method) {
    case 'GET':
      try {
        const connection = await connectMongo();
        const projects = await ProjectModel.find().exec();
        res.status(200).json(projects);
      } catch (error) {
        console.error('Mongo find', error)
        res.json({ error })
      }
      break;

    case 'POST':
      try {
        const doc = req.body ? req.body : {};

        const connection = await connectMongo();
        // console.log(Object.keys(connection), connection.models)
        const response = await ProjectModel.create(doc);
        // const result = await response;
        console.log('created', response)
        res.status(200).send(response);
      } catch (error) {
        console.error('Mongo create', error)
        res.json({ error })
      }
      break

    default:
      res.send(200);
      break;
  }


}