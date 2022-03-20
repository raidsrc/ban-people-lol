import { Db, MongoClient } from "mongodb";
const connectionString: string = process.env.ATLAS_URI || ""
const client = new MongoClient(connectionString)

let db

export default async function initiateMongoDbConnection() {
  try {
    await client.connect()
    console.log("Connected to MongoDB Atlas.")
    let db: Db = client.db("bpl-all-users");
    return db
  } catch (err) {
    console.error("Something went wrong:", err)
  }
}

export { db }