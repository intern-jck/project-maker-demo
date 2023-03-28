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
          console.log(method, query)
          const projects = await ProjectModel.find({ collection_name: query.collection }).exec();
          res.status(200).json(projects);
        } catch (error) {
          console.error('Mongo find', error)
          res.json({ error })
        }
        break;

      case 'POST':
        try {
          const doc = req.body ? req.body : {};
          const response = await ProjectModel.create(doc);
          res.status(200).send(response);
        } catch (error) {
          console.error('Mongo create', error)
          res.json({ error })
        }
        break;

      case 'PUT':
        const doc = req.body ? req.body.doc : {};
        const linkLowerCase = doc.name ? doc.name.toLowerCase().split(' ').join('-') : "";
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
          res.json({ error })
        }
        break;

      case 'DELETE':
        const { id } = req.query;
        try {
          const project = await ProjectModel.deleteOne({ _id: id }).exec();
          res.status(200).json(project);
        } catch (error) {
          console.error('Mongo delete', error)
          res.json({ error })
        }
        break;

      default:
        res.status(405);
        res.json(`${method} request not found`)
        break;
    }
  } catch (error) {
    console.log(method, error)
    res.status(500);
    res.json(error);
  }

}