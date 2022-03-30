import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from "mongodb";
import { getSession } from 'next-auth/react';
const connectionString: string = process.env.ATLAS_URI || ""
const client = new MongoClient(connectionString)

type responseMessage = {
  message: string,
  message2?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseMessage>
) {
  const session = await getSession({ req })
  if (!session) {
    res.status(401).send({ message: "You must be logged in to access this API endpoint." })
  } else {
    try {
      await client.connect()
      const database = client.db("bpl-all-users");
      const unbannedUsers = database.collection('unbanned-users')
      const bannedUsers = database.collection("banned-users")
      const userToBan = await unbannedUsers.findOne({ "_id": new ObjectId(req.body._id) })
      const addBannedUserResult = await bannedUsers.insertOne({ ...userToBan })
      const deleteUnbannedUserResult = await unbannedUsers.deleteOne({ "_id": new ObjectId(req.body._id) })
      const updates = {
        $inc: {
          "number-of-times-banned": 1
        }
      }
      const incrementBanCountResult = await bannedUsers.findOneAndUpdate(
        { "_id": new ObjectId(req.body._id) }, updates
      )
      res.status(200).json({
        message: `Deleted ${deleteUnbannedUserResult.deletedCount} document from unbanned-users with ObjectId ${req.body["_id"]}`,
        message2: `Added 1 document to banned-users with ObjectId ${addBannedUserResult.insertedId}`
      })
    } catch (err) {
      console.error("Something went wrong:", err)
      res.status(400).send({ message: String(err) })
    }
  }

}

