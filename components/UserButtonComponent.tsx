import { KeyedMutator } from "swr"
import { ObjectId } from "mongodb"
import HoverWindow from "./HoverWindow"
import { useState } from "react"
import { UserButtonComponentProps } from "../pages/types"
import { CSSTransition } from "react-transition-group"

const UserButtonComponent = ({ userObject, mutate, bannedUsers }: UserButtonComponentProps) => {
  const [showHoverWindow, setShowHoverWindow] = useState(false)
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const [showSelf, setShowSelf] = useState(true)
  return (
    <div className="w-min">
      {showSelf ?
        <div className="my-1 p-1 px-2 border-2 flex items-center min-w-max">
          <span className="pr-4" onMouseEnter={() => { setShowHoverWindow(true) }} onMouseLeave={() => { setShowHoverWindow(false) }} >{userObject.username}</span>
          <button onClick={() => {setShowSettingsMenu(prev => !prev)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>
          <span className='relative'>
            <CSSTransition in={showHoverWindow} timeout={200} classNames="hover-window" unmountOnExit>
              <HoverWindow userObject={userObject} bannedUsers={bannedUsers} setShowSelf={setShowSelf} mutate={mutate} />
            </CSSTransition>
          </span>
        </div> : ""}
    </div>
  )
}



export default UserButtonComponent