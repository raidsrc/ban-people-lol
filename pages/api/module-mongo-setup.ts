import { Db, MongoClient } from "mongodb";
const connectionString: string = process.env.ATLAS_URI || ""
const client = new MongoClient(connectionString)

let db: Db 

export async function initiateMongoDbConnection(): Promise<void> {
  try {
    await client.connect()
    console.log("Connected to MongoDB Atlas.")
    db = client.db("bpl-all-users");
  } catch (err) {
    console.error("Something went wrong:", err)
  }
}

export function getMongoDbConnection(): Db {
  return db
}
