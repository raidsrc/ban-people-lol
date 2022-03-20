import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
// TODO: investigate global mutator signature and how it's diff from keyed
import { userObjectType } from './types'
import UserButtonComponent from '../components/UserButtonComponent'
import { CSSTransition } from 'react-transition-group'
import { Component, useState, useEffect } from 'react'

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
  const { data, error, mutate } = useSWR("/api/get-unbanned-users", fetcher)
  if (error) return <div>Error fetching unbanned users.</div>
  if (!data) return <div>Loading unbanned users...</div>

  return (
    <div>
      {data.map((userObject: userObjectType) => (
        <div key={String(userObject._id)}>
          <UserButtonComponent userObject={userObject} mutate={mutate} />
        </div>
      ))}
    </div>
  )
}


export default UnbannedUsersPage
