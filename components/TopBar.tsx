import {signOut} from "next-auth/react"

const TopBar = () => {


  return (
    <div className="flex w-full justify-end">
      <button onClick={() => {signOut()}} className="border p-3">Click to sign out</button>
    </div>
  )
}

export default TopBar