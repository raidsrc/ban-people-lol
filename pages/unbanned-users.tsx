import { NextPage } from 'next'
import { ObjectId } from 'mongodb'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { useState } from 'react'
import HoverWindow from '../components/HoverWindow'
import { UserComponentProps, userObjectType } from './types'

const fetcher = (url: string) => fetch(url).then(res => res.json()).catch(err => console.error(err))


const UnbannedUsersPage: NextPage = () => {
  // so the plan is to have a database full of users who are doing bad shit. your job is to ban them. you can select a user and ban them. selecting a user is clicking a menu next to their name. and then clicking the ban option. there is a collection of unbanned users and a collection of banned users. when an unbanned user is banned, they get sent to the banned users collection in the db. when a banned user is unbanned, they move back to the unbanned users collection in the db. have options for how long you ban users. have a 30 second ban, a 120 second ban, and a permanent ban. authenticate using next-auth-js. everyone gets their own account. 

  return (
    <>
      <Head>
        <title>Unbanned Users</title>
      </Head>
      <div className='std-container'>
        <div>
          <Link href="/">Back</Link>
        </div>
        <h1>Unbanned Users</h1>
        <div>
          <UnbannedUsersContainer />
        </div>
      </div>
    </>
  )
}

const UnbannedUsersContainer = () => {
  const { data, error } = useSWR("/api/get-unbanned-users", fetcher)
  if (error) return <div>Error fetching unbanned users.</div>
  if (!data) return <div>Loading unbanned users...</div>

  return (
    <div>
      {data.map((userObject: userObjectType) => (
        <div key={String(userObject._id)}>
          <UnbannedUserComponent userObject={userObject} />
        </div>
      ))}
    </div>
  )
}

const UnbannedUserComponent = ({ userObject }: UserComponentProps) => {
  const [showHoverWindow, setShowHoverWindow] = useState(false)
  const [showSelf, setShowSelf] = useState(true)
  return (
    <>
      {showSelf ? <div>
        <button onMouseEnter={() => setShowHoverWindow(true)} onMouseLeave={() => setShowHoverWindow(false)}
          onClick={() => {
            banUser(userObject._id)
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

async function banUser(userId: ObjectId) {
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
}


export default UnbannedUsersPage
