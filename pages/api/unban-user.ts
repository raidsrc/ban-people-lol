import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from "mongodb";
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
  try {
    // receive a POST request from the client. delete from banned users, add to unbanned users.
    await client.connect()
    const database = client.db("bpl-all-users");
    const bannedUsers = database.collection('banned-users')
    const userToUnban = await bannedUsers.findOne({ "_id": new ObjectId(req.body._id) })
    const deleteBannedUserResult = await bannedUsers.deleteOne({ "_id": new ObjectId(req.body._id) })
    const unbannedUsers = database.collection("unbanned-users")
    const addUnbannedUserResult = await unbannedUsers.insertOne({...userToUnban})
    res.status(200).json({
      message: `Deleted ${deleteBannedUserResult.deletedCount} document from banned-users with ObjectId ${req.body["_id"]}`,
      message2: `Added 1 document to unbanned-users with ObjectId ${addUnbannedUserResult.insertedId}`
    })
  } catch (err) {
    console.error("Something went wrong:", err)
    res.status(400).send({ message: String(err) })
  } finally {
    client.close()
  }

}

