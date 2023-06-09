import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongo, ProjectModel } from "@/modules/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;
  const { id } = query;
  try {
    const connection = await connectMongo();
    const response = await ProjectModel.findById({ _id: id }).exec();
    res.status(200).json(response);
  } catch (error) {
    console.error("Mongo findById", error);
    res.status(500).json(error);
  }
}
