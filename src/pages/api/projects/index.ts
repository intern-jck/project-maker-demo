import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/common/modules/mongoAtlas/connectMongo';
import ProjectModel from '@/common/modules/mongoAtlas/ProjectModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  try {
    const connection = await connectMongo();
    switch (method) {
      case 'GET':
        try {
          console.log('getting projects for:', query.collection)
          if (query.collection) {
            const projects = await ProjectModel.find({ collection_name: query.collection }).exec();
            res.status(200).json(projects);
          }
          const projects = await ProjectModel.find({}).exec();
          res.status(200).json(projects);
        } catch (error) {
          console.error('Mongo find', error)
          res.status(500).json({ error })
        }
        break;

      case 'POST':
        try {
          const doc = req.body ? req.body : {};
          const response = await ProjectModel.create(doc);
          res.status(200).send(response);
        } catch (error) {
          console.error('Mongo create', error)
          res.status(500).json({ error })
        }
        break;

      case 'PUT':
        const doc = req.body ? req.body.doc : {};
        const filter = { '_id': doc._id };
        const update = {
          ...doc,
        };
        const options = { 'upsert': true };
        try {
          const response = await ProjectModel.findOneAndUpdate(filter, update, options);
          res.status(200).send(response);
        } catch (error) {
          console.error('Mongo update', error)
          res.status(500).json({ error })
        }
        break;

      case 'DELETE':
        const { id } = req.query;
        try {
          const project = await ProjectModel.deleteOne({ _id: id }).exec();
          res.status(200).json(project);
        } catch (error) {
          console.error('Mongo delete', error)
          res.status(500).json({ error })
        }
        break;

      default:
        res.status(405).json(`${method} request not found`)
        break;
    }
  } catch (error) {
    console.error(method, error)
    res.status(500).json({ method: method, error: error });
  }
}