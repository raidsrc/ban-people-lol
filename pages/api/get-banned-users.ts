// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from "mongodb";
const connectionString: string = process.env.ATLAS_URI || ""
const client = new MongoClient(connectionString)

type errorMessage = {
  message: string,
}
type usersList = Array<Object>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<errorMessage | usersList>
) {
  // get data from your database, for real
  await client.connect()
  const database = client.db("bpl-all-users");
  const unbannedUsers = database.collection('banned-users')
  const usersList = await unbannedUsers.find({}).limit(50).toArray()

  res.status(200).send(usersList)
  
}

