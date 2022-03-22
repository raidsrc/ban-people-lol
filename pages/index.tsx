import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
  // so the plan is to have a database full of users who are doing bad shit. your job is to ban them. you can select a user and ban them. selecting a user is clicking a menu next to their name. and then clicking the ban option. there is a collection of unbanned users and a collection of banned users. when an unbanned user is banned, they get sent to the banned users collection in the db. when a banned user is unbanned, they move back to the unbanned users collection in the db. have options for how long you ban users. have a 30 second ban, a 120 second ban, and a permanent ban. authenticate using next-auth-js. everyone gets their own account. 
  return (
    <>
      <Head>
        <title>Ban People Lol</title>
      </Head>
      <div className='std-container'>
        <h1>BPL Forums User Lists</h1>
        <p>This page contains links to the BPL Forums User Lists. There are two lists: one for banned users and one for unbanned users.</p>
        <p>It turns out that our forum's users aren't very good internet citizens. Every single one of them has gotten themselves banned at least once. If you hover over each user, you'll get to see their user info, including how many times they've been banned in the past. I'm giving you admin privileges for the time being, so if you open a user's settings menu, you'll have the chance to ban or unban them. Go wild with it. </p>
        <div className='py-4'>
          <div className='p-4 border flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
            <span className='ml-3 '><Link href="/banned-users" ><a className=''>Banned Users List</a></Link></span>
          </div>
          <div className='p-4 border border-t-0 flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
            <span className='ml-3 '><Link href="/unbanned-users"><a className=''>Unbanned Users List</a></Link></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
