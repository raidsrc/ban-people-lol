import { NextPage } from 'next'
import { ObjectId } from 'mongodb'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import useSWR, { KeyedMutator } from 'swr'
import { useState } from 'react'
import HoverWindow from '../components/HoverWindow'
import { userObjectType, UserComponentProps } from './types'

const fetcher = (url: string) => fetch(url).then(res => res.json()).catch(err => console.error(err))

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
  const { data, error, mutate } = useSWR("/api/get-banned-users", fetcher)
  if (error) return <div>Error fetching banned users.</div>
  if (!data) return <div>Loading banned users...</div>

  return (
    <div>
      {data.map((userObject: userObjectType) => (
        <div key={String(userObject._id)}>
          <BannedUserComponent userObject={userObject} mutate={mutate} />
        </div>
      ))}
    </div>
  )
}

const BannedUserComponent = ({ userObject, mutate }: UserComponentProps) => {
  const [showHoverWindow, setShowHoverWindow] = useState(false)
  const [showSelf, setShowSelf] = useState(true)
  return (
    <>
      {showSelf ? <div>
        <button onMouseEnter={() => setShowHoverWindow(true)} onMouseLeave={() => setShowHoverWindow(false)}
          onClick={() => {
            unbanUser(userObject._id, mutate)
            setShowSelf(false)
          }} className="my-0.5 p-1 border-2">
          <span>{userObject.username}</span>
        </button>
        <span className='relative'>
          {showHoverWindow ? <HoverWindow userObject={userObject} /> : ""}
        </span>
      </div> : ""}
    </>
  )
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

export default BannedUsersPage
