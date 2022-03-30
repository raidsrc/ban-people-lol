import { signIn } from "next-auth/react"

export default function NotSignedIn() {
  return (
    <div>
      <div>nah homie you gotta be signed in to see this</div>
      <br />
      <button onClick={()=>{signIn()}} className="border rounded p-3 hover:border-gray-600 transition">Click me to sign in</button>
    </div>
  )
}