import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { userObjectType } from './_types'
import UserButtonComponent from '../components/UserButtonComponent'
import { BanContext } from './_contexts'

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
          <BanContext.Provider value={{ bannedUsers: true }}>
            <BannedUsersContainer />
          </BanContext.Provider>
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
          <UserButtonComponent userObject={userObject} mutate={mutate} />
        </div>
      ))}
    </div>
  )
}

export default BannedUsersPage
