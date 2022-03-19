import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'
import Link from 'next/link'

const Home: NextPage = () => {
  // so the plan is to have a database full of users who are doing bad shit. your job is to ban them. you can select a user and ban them. selecting a user is clicking a menu next to their name. and then clicking the ban option. there is a collection of unbanned users and a collection of banned users. when an unbanned user is banned, they get sent to the banned users collection in the db. when a banned user is unbanned, they move back to the unbanned users collection in the db. have options for how long you ban users. have a 30 second ban, a 120 second ban, and a permanent ban. authenticate using next-auth-js. everyone gets their own account. 
  const fetcher = (url: string) => fetch(url).then(res => res.json()).catch(err => console.error(err))
  const { data, error } = useSWR("/api/get-unbanned-users", fetcher)
  return (
    <>
      <Head>
        <title>Ban People Lol</title>
      </Head>
      <div className='std-container'>
        <h1>heading 1</h1>
        <p>Paragraph. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quasi facilis at ullam minima laudantium enim omnis quam a itaque, sapiente nihil eum dolorum quos est, vero iure veniam minus placeat ratione perspiciatis harum. Quisquam sapiente nobis fugit ad magni!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia qui quis, voluptatem consequatur vel enim. Illo aspernatur corporis, et autem iste doloremque rem iusto, magni adipisci id incidunt molestiae perferendis tenetur minima natus ex nulla aliquid veniam quaerat exercitationem atque? Odio animi laboriosam reiciendis neque aliquid autem error aperiam similique ut at, cupiditate enim quis magnam iste sapiente quod doloribus, adipisci velit aliquam perferendis asperiores distinctio odit esse! Optio vero sunt quae placeat voluptatum ut animi eveniet cum voluptas velit.</p>
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
