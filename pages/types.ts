import { Int32, Timestamp, ObjectId } from "mongodb"
import { KeyedMutator } from "swr"

export type userObjectType = {
  _id: ObjectId,
  username: string,
  fname: string,
  lname: string,
  "number-of-times-banned": Int32,
  "date-joined": Timestamp
}
export type UserButtonComponentProps = {
  userObject: userObjectType,
  mutate?: KeyedMutator<String>,
  bannedUsers?: boolean,
}
