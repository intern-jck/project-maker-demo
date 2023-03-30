import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/common/modules/mongoAtlas/connectMongo';
import CollectionModel from '@/common/modules/mongoAtlas/CollectionModel'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;

  try {
    const connection = await connectMongo();
    switch (method) {
      case 'GET':
        try {
          const response = await CollectionModel.find().exec();
          res.status(200).json(response);
        } catch (error) {
          console.error('Mongo find', error)
          res.status(500).json({ error })
        }
        break;

      case 'POST':
        try {
          const doc = req.body ? req.body : {};
          const response = await CollectionModel.create(doc);
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
          const response = await CollectionModel.findOneAndUpdate(filter, update, options);
          res.status(200).send(response);
        } catch (error) {
          console.error('Mongo update', error)
          res.status(500).json({ error })
        }
        break;

      case 'DELETE':
        const { id } = req.query;
        try {
          const response = await CollectionModel.deleteOne({ _id: id }).exec();
          res.status(200).json(response);
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