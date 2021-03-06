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
  // get data from your database, for real
  const session = await getSession({ req })
  if (!session) {
    res.status(401).send({ message: "You must be logged in to access this API endpoint." })
  } else {
    try {
      // receive a POST request from the client. delete from banned users, add to unbanned users.
      await client.connect()
      const database = client.db("bpl-all-users");
      const bannedUsers = database.collection('banned-users')
      const userToUnban = await bannedUsers.findOne({ "_id": new ObjectId(req.body._id) })
      const deleteBannedUserResult = await bannedUsers.deleteOne({ "_id": new ObjectId(req.body._id) })
      const unbannedUsers = database.collection("unbanned-users")
      const addUnbannedUserResult = await unbannedUsers.insertOne({ ...userToUnban })
      res.status(200).json({
        message: `Deleted ${deleteBannedUserResult.deletedCount} document from banned-users with ObjectId ${req.body["_id"]}`,
        message2: `Added 1 document to unbanned-users with ObjectId ${addUnbannedUserResult.insertedId}`
      })
    } catch (err) {
      console.error("Something went wrong:", err)
      res.status(400).send({ message: String(err) })
    } // waiting for client.close() takes for fucking ever. a response comes back in 200-300ms without it. a response comes back in 700-900ms with it. 
  }

}

