import type { NextApiRequest, NextApiResponse } from 'next'
// import { MongoClient } from "mongodb";
// const connectionString: string = process.env.ATLAS_URI || ""
// const client = new MongoClient(connectionString)
import { getMongoDbConnection } from "../api/module-mongo-setup"

type errorMessage = {
  message: string,
}
type usersList = Array<Object>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<errorMessage | usersList>
) {
  try {
    const database = await getMongoDbConnection()
    const unbannedUsers = database.collection('banned-users')
    const usersList = await unbannedUsers.find({}).limit(50).toArray()
    res.status(200).send(usersList)
  } catch (err) {
    console.error("Something went wrong:", err)
    res.status(400).send({ message: String(err) })
  }
}

