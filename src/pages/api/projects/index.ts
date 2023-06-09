import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongo, ProjectModel } from "@/modules/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;
  try {
    const connection = await connectMongo();
    switch (method) {
      case "GET":
        try {
          const { folderId } = query;
          if (folderId) {
            const connection = await connectMongo();
            const response = await ProjectModel.find({
              folder_id: folderId,
            }).exec();
            res.status(200).json(response);
            return;
          }
          const connection = await connectMongo();
          const response = await ProjectModel.find().exec();
          res.status(200).json(response);
          return;
        } catch (error) {
          console.error("Mongo find", error);
          res.status(500).json({ error });
        }
        break;

      case "POST":
        try {
          const doc = body ? body : {};
          const response = await ProjectModel.create(doc);
          res.status(200).send(response);
        } catch (error) {
          console.error("Mongo create", error);
          res.status(500).json({ error });
        }
        break;

      case "PUT":
        const doc = body ? body.doc : {};
        const filter = { _id: doc._id };
        const update = {
          ...doc,
        };
        const options = { upsert: true };
        try {
          const response = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            options
          );
          res.status(200).send(response);
        } catch (error) {
          console.error("Mongo update", error);
          res.status(500).json({ error });
        }
        break;

      case "DELETE":
        const { id } = query;
        try {
          const project = await ProjectModel.deleteOne({ _id: id }).exec();
          res.status(200).json(project);
        } catch (error) {
          console.error("Mongo delete", error);
          res.status(500).json({ error });
        }
        break;

      default:
        res.status(405).json(`${method} request not found`);
        break;
    }
  } catch (error) {
    console.error(method, error);
    res.status(500).json({ method: method, error: error });
  }
}
