import type { UserComponentProps } from "../pages/types"

const HoverWindow = ({ userObject }: UserComponentProps) => {
  return (
    <span className="p-2 border-2 border-black w-80 absolute ml-7 -bottom-10 bg-slate-100 bg-opacity-90">
      <div>First name: <span className="capitalize">{userObject.fname}</span></div>
      <div>Last name: <span className="capitalize">{userObject.lname}</span></div>
      <div>Number of times banned: {userObject["number-of-times-banned"]}</div>
      <div>Date joined: {userObject["date-joined"]}</div>
    </span>
  )
}

export default HoverWindow