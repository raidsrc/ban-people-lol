import { signIn } from "next-auth/react"

export default function NotSignedIn() {
  return (
    <div>
      <div>nah homie you gotta be signed in to see this</div>
      <br />
      <button onClick={()=>{signIn()}} className="border p-3">Click me to sign in</button>
    </div>
  )
}