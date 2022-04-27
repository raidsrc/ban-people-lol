import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { userObjectType } from '../lib/_types'
import UserButtonComponent from '../components/UserButtonComponent'
import { BanContext } from '../lib/_contexts'
import { useSession } from 'next-auth/react'
import NotSignedIn from '../components/NotSignedIn'

const fetcher = (url: string) => fetch(url).then(res => res.json()).catch(err => console.error(err))
// const fetcherWaitPromise: Promise<string> = new Promise((resolutionFunction, rejectionFunction) => {
//   setTimeout(() => {
//     resolutionFunction("sup")
//   }, 5000)
// })
// async function functionWrappingFetcherWaitPromise(whatever: Response) {
//   await fetcherWaitPromise
//   return whatever
// }
// function fetcher(url: string) {
//   const fetchResult = fetch(url)
//   .then(res => functionWrappingFetcherWaitPromise(res)).then(res => res.json()).catch(err => console.error(err))
//   return fetchResult
// }


const BannedUsersPage: NextPage = () => {

  const { data: session } = useSession()

  return (
    <>
      {session ?
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
        :
        <div className='std-container'>
          <NotSignedIn></NotSignedIn>
        </div>}
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
