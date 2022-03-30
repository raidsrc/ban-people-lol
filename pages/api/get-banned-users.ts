import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from "mongodb";
import { getSession } from 'next-auth/react';
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
  const session = await getSession({ req })
  if (!session) {
    res.status(401).send({message: "You must be logged in to access this API endpoint."})
  } else {
    try {
      await client.connect() // why don't we return anything from client.connect()? because client.connect() mutates the value of client by connecting to mongodb. no need to return anything. connect() is one of those methods that does something for/to the object that called it.
      const database = client.db("bpl-all-users");
      const bannedUsers = database.collection('banned-users')
      const usersList = await bannedUsers.find({}).limit(50).toArray()
      res.status(200).send(usersList)
    } catch (err) {
      console.error("Something went wrong:", err)
      res.status(400).send({ message: String(err) })
    }
  }
}

