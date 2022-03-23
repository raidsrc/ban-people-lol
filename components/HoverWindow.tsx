import type { userObjectType } from "../pages/_types"


const HoverWindow = ({ userObject }: {
  userObject: userObjectType
}) => {

  
  return (
    <div className="p-2 border-2 border-black w-80 absolute bg-slate-100 bg-opacity-90 shadow-md z-10">
      {/* <div className="w-4 h-4 top-12 -left-2 rotate-45 bg-inherit border-2 border-black absolute"> </div> */}
      <div>First name: <span className="capitalize">{userObject.fname}</span></div>
      <div>Last name: <span className="capitalize">{userObject.lname}</span></div>
      <div>Number of times banned: {userObject["number-of-times-banned"]}</div>
      <div>Date joined: {String(userObject["date-joined"]).split("T")[0]}</div>
    </div>
  )
}

export default HoverWindow