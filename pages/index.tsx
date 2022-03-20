import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import Link from 'next/link'

const Home: NextPage = () => {
  // so the plan is to have a database full of users who are doing bad shit. your job is to ban them. you can select a user and ban them. selecting a user is clicking a menu next to their name. and then clicking the ban option. there is a collection of unbanned users and a collection of banned users. when an unbanned user is banned, they get sent to the banned users collection in the db. when a banned user is unbanned, they move back to the unbanned users collection in the db. have options for how long you ban users. have a 30 second ban, a 120 second ban, and a permanent ban. authenticate using next-auth-js. everyone gets their own account. 
  const fetcher = (url: string) => fetch(url).then(res => res.json()).catch(err => console.error(err))
  useSWR("/api/initiate-mongo-connection", fetcher)
  return (
    <>
      <Head>
        <title>Ban People Lol</title>
      </Head>
      <div className='std-container'>
        <h1>BPL Forums User Lists</h1>
        <p>This page contains links to the BPL Forums User Lists. There are two lists: one for banned users and one for unbanned users.</p>
        <p>It turns out that our forum's users aren't very good internet citizens. They've been acting up and getting themselves banned left and right. If you hover over each user, you'll get to see their user info, including how many times they've been banned in the past. Sometimes the number gets quite high. Don't be surprised. </p>
        <div>
          <Link href="/banned-users"><a>Banned Users List</a></Link>
        </div>
        <div>
          <Link href="/unbanned-users">Unbanned Users List</Link>
        </div>
      </div>
    </>
  )
}

export default Home
