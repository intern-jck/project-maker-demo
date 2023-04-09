import { Types } from 'mongoose';

import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/common/modules/mongoAtlas/connectMongo';
import ProjectModel from '@/common/modules/mongoAtlas/ProjectModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  try {
    const connection = await connectMongo();
    switch (method) {
      case 'GET':
        try {
          const { collectionId } = query;
          if (collectionId) {
            const connection = await connectMongo();
            const response = await ProjectModel.find({ collection_id: collectionId }).exec();
            console.log('getting projects for', collectionId, response.length)
            res.status(200).json(response);
            return;
          }
          const connection = await connectMongo();
          const response = await ProjectModel.find().exec();
          // console.log(response.length)
          console.log('getting all projects', response.length)
          res.status(200).json(response);
          return;

        } catch (error) {
          console.error('Mongo find', error)
          res.status(500).json({ error })
        }
        break;

      case 'POST':

        // console.log('creating project')
        try {
          const doc = body ? body : {};
          const response = await ProjectModel.create(doc);
          res.status(200).send(response);
        } catch (error) {
          console.error('Mongo create', error)
          res.status(500).json({ error })
        }
        break;

      case 'PUT':
        const doc = body ? body.doc : {};
        const filter = { '_id': doc._id };
        const update = {
          ...doc,
        };
        const options = { 'upsert': true };
        // console.log('saving project')
        try {
          const response = await ProjectModel.findOneAndUpdate(filter, update, options);
          res.status(200).send(response);
        } catch (error) {
          console.error('Mongo update', error)
          res.status(500).json({ error })
        }
        break;

      case 'DELETE':
        const { id } = query;
        console.log('deleting project', id)
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
};
