import { ObjectId } from "mongodb"
import { Dispatch, SetStateAction } from "react"
import { KeyedMutator } from "swr"
import type { userObjectType } from "../pages/types"

const fetcher = (url: string) => fetch(url).then(res => res.json()).catch(err => console.error(err))

const HoverWindow = ({ userObject, bannedUsers, setShowSelf, mutate }: {
  userObject: userObjectType
  bannedUsers: boolean | undefined
  setShowSelf: Dispatch<SetStateAction<boolean>>
  mutate: KeyedMutator<String>
}) => {
  function handleBanButtonClick() {
    if (bannedUsers) unbanUser(userObject._id, mutate)
    else banUser(userObject._id, mutate)
    setShowSelf(false)
  }
  return (
    <span className="p-2 border-2 border-black w-80 absolute ml-6 -bottom-[5rem] bg-slate-100 bg-opacity-90 shadow-md">
      {/* <div className="w-4 h-4 top-12 -left-2 rotate-45 bg-inherit border-2 border-black absolute"> </div> */}
      <div>First name: <span className="capitalize">{userObject.fname}</span></div>
      <div>Last name: <span className="capitalize">{userObject.lname}</span></div>
      <div>Number of times banned: {userObject["number-of-times-banned"]}</div>
      <div>Date joined: {String(userObject["date-joined"]).split("T")[0]}</div>
      {
        bannedUsers ?
          <button onClick={handleBanButtonClick} className="bg-green-300 border border-black p-1">Unban</button>
          :
          <button onClick={handleBanButtonClick} className="bg-red-300 border border-black p-1">Ban!</button>
      }
    </span>
  )
}


async function banUser(userId: ObjectId, mutate: KeyedMutator<String> | undefined) {
  const reqBody = JSON.stringify({
    "_id": userId
  })
  const settings = {
    method: 'POST',
    body: reqBody,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  await fetch("/api/ban-user", settings)
  if (mutate) mutate(fetcher("/api/get-unbanned-users"))
}

async function unbanUser(userId: ObjectId, mutate: KeyedMutator<String> | undefined) {
  const reqBody = JSON.stringify({
    "_id": userId
  })
  const settings = {
    method: 'POST',
    body: reqBody,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  await fetch("/api/unban-user", settings)
  if (mutate) mutate(fetcher("/api/get-banned-users"))
}

export default HoverWindow