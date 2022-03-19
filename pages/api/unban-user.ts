// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from "mongodb";
const connectionString: string = process.env.ATLAS_URI || ""
const client = new MongoClient(connectionString)

type responseMessage = {
  message: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseMessage>
) {
  // get data from your database, for real
  try {
    // receive a delete request from the client. 
    await client.connect()
    const database = client.db("bpl-all-users");
    const bannedUsers = database.collection('banned-users')
    const deleteBannedUserResult = await bannedUsers.deleteOne({ "_id": new ObjectId(req.body.id) })
    res.status(200).send({ message: `Deleted ${deleteBannedUserResult.deletedCount} document with ObjectId ${req.body.id}` })
  } catch (err) {
    console.error("Something went wrong:", err)
    res.status(400).send({ message: String(err) })
  }

}

