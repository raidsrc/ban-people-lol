import type { UserButtonComponentProps } from "../pages/types"

const HoverWindow = ({ userObject }: UserButtonComponentProps) => {
  return (
    <span className="p-2 border-2 border-black w-80 absolute ml-8 -bottom-12 bg-slate-100 bg-opacity-90 shadow-md">
      <div>First name: <span className="capitalize">{userObject.fname}</span></div>
      <div>Last name: <span className="capitalize">{userObject.lname}</span></div>
      <div>Number of times banned: {userObject["number-of-times-banned"]}</div>
      <div>Date joined: {String(userObject["date-joined"]).split("T")[0]}</div>
    </span>
  )
}

export default HoverWindow