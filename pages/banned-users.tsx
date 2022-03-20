import type { NextPage } from 'next'
import { Int32, ObjectId, Timestamp } from 'mongodb'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { ReactNode, Key } from 'react'

const fetcher = (url: string) => fetch(url).then(res => res.json()).catch(err => console.error(err))

type userObjectType = {
  _id: ObjectId,
  username: string,
  fname: string,
  lname: string,
  "number-of-times-banned": Int32,
  "date-joined": Timestamp
}
type UserComponentProps = {
  userObject: userObjectType
}

const BannedUsersPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Banned Users</title>
      </Head>
      <div className='std-container'>
        <div>
          <Link href="/">Back</Link>
        </div>
        <h1>Banned Users</h1>
        <div>
          <BannedUsersContainer />
        </div>
      </div>
    </>
  )
}

const BannedUsersContainer = () => {
  const { data, error } = useSWR("/api/get-banned-users", fetcher)
  if (error) return <div>Error fetching banned users.</div>
  if (!data) return <div>Loading banned users...</div>

  return (
    <div>
      {data.map((userObject: userObjectType) => (
        <div key={String(userObject._id)}>
          <BannedUserComponent userObject={userObject} />
        </div>
      ))}
    </div>
  )
}

const BannedUserComponent = ({ userObject }: UserComponentProps) => {
  return (
    <button onClick={() => unbanUser(userObject._id)} className="my-1 p-1 border-2">
      {userObject.username}
    </button>
  )
}

async function unbanUser(userId: ObjectId) {
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
}

export default BannedUsersPage
