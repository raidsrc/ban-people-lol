import { KeyedMutator } from "swr"
import { ObjectId } from "mongodb"
import HoverWindow from "./HoverWindow"
import { useState } from "react"
import { UserButtonComponentProps } from "../pages/types"

const fetcher = (url: string) => fetch(url).then(res => res.json()).catch(err => console.error(err))

const UserButtonComponent = ({ userObject, mutate, ban, unban }: UserButtonComponentProps) => {
  const [showHoverWindow, setShowHoverWindow] = useState(false)
  const [showSelf, setShowSelf] = useState(true)
  return (
    <div className="w-min">
      {showSelf ?
        <div onMouseEnter={() => setShowHoverWindow(true)} onMouseLeave={() => setShowHoverWindow(false)}
          className="my-1 p-1 px-2 border-2 flex items-center min-w-max">
          <span className="">{userObject.username}</span>
          <button onClick={() => {
            if (ban) banUser(userObject._id, mutate)
            else if (unban) unbanUser(userObject._id, mutate)
            setShowSelf(false)
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>
          <span className='relative'>
            {showHoverWindow ? <HoverWindow userObject={userObject} /> : ""}
          </span>
        </div> : ""}
    </div>
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


export default UserButtonComponent