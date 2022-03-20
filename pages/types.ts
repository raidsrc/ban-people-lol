import { Int32, Timestamp, ObjectId } from "mongodb"

export type userObjectType = {
  _id: ObjectId,
  username: string,
  fname: string,
  lname: string,
  "number-of-times-banned": Int32,
  "date-joined": Timestamp
}
export type UserComponentProps = {
  userObject: userObjectType
}
