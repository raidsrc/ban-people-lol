// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const dbo = require("./connect-to-database")

type errorMessage = {
  message: string,
}
type usersList = Array<Object>

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<errorMessage | usersList>
) {
  // get data from your database, for real

  dbo.connectToServer((err) => {
    if (err) {
      console.error(err)
      res.status(400).send({message: "Could not connect to server."})
    } else {
      const dbConnect = dbo.getDb()
      try {
        dbConnect
          .collection("bpl-all-users")
          .find({}).limit(200)
          .toArray(function (err, result) {
            if (err) {
              res.status(400).send({message: "Error fetching list."})
            } else {
              res.status(200).json(result)
              // returns list of all users in json format
            }
          })
      } catch {
        res.status(400).send({message: "Error fetching list."})
      }
    }
  })
}

