import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '@/common/modules/mongoAtlas/connectMongo';

export default async function connectTest(req: NextApiRequest, res: NextApiResponse) {
  try {
    const connection = await connectMongo();
    res.status(200).json('connected!');
  } catch (error) {
    console.log('connect test', error)
    res.json({ error })
  }
}