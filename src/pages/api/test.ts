import type { NextApiRequest, NextApiResponse } from 'next'

export default async function connectTest(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('test');
    res.status(200).json('works');
  } catch (error) {
    console.log('connect test', error)
    res.json({ error })
  }
}