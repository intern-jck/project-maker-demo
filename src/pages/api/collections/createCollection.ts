import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/common/modules/mongoAtlas/connectMongo';
import CollectionModel from '@/common/modules/mongoAtlas/CollectionModel'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const connection = await connectMongo();
  try {
    const doc = body ? body : {};
    console.log(doc);
    const response = await CollectionModel.create(doc);
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    console.error('Mongo create', error)
    res.status(500).json({ error })
  }
}