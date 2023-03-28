import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/common/modules/mongoAtlas/connectMongo';
import CollectionModel from '@/common/modules/mongoAtlas/CollectionModel'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  console.log('cat api', method, query, body)

  try {
    const connection = await connectMongo();
    switch (method) {
      case 'GET':
        console.log(method)
        try {
          const response = await CollectionModel.find().exec();
          res.status(200).json(response);
        } catch (error) {
          console.error('Mongo find', error)
          res.json({ error })
        }
        break;

      case 'POST':
        try {
          const doc = req.body ? req.body : {};
          const response = await CollectionModel.create(doc);
          res.status(200).send(response);
        } catch (error) {
          console.error('Mongo create', error)
          res.json({ error })
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
          res.json({ error })
        }
        break;

      case 'DELETE':
        const { id } = req.query;
        console.log('deleting', id)
        try {
          const response = await CollectionModel.deleteOne({ _id: id }).exec();
          res.status(200).json(response);
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
    res.json({ method: method, error: error });
  }
}