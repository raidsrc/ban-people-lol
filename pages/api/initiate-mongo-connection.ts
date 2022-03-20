import { NextApiRequest, NextApiResponse } from "next/types";
const mongoSetup = require("../api/module-mongo-setup")

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await mongoSetup.initiateMongoDbConnection()
    res.status(200).send({ message: "Initiated MongoDB connection." })
  } catch (err) {
    res.status(400).send({ message: "Couldn't initiate a MongoDB connection." })
  }
}
