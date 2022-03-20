import type { userObjectType } from "../pages/types"


const HoverWindow = ({ userObject }: {
  userObject: userObjectType
}) => {

  return (
    <span className="p-2 border-2 border-black w-80 absolute ml-6 -bottom-14 bg-slate-100 bg-opacity-90 shadow-md z-20">
      {/* <div className="w-4 h-4 top-12 -left-2 rotate-45 bg-inherit border-2 border-black absolute"> </div> */}
      <div>First name: <span className="capitalize">{userObject.fname}</span></div>
      <div>Last name: <span className="capitalize">{userObject.lname}</span></div>
      <div>Number of times banned: {userObject["number-of-times-banned"]}</div>
      <div>Date joined: {String(userObject["date-joined"]).split("T")[0]}</div>
    </span>
  )
}

export default HoverWindow