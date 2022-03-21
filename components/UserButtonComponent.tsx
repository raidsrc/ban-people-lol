import { KeyedMutator } from "swr"
import { ObjectId } from "mongodb"
import HoverWindow from "./HoverWindow"
import { useState, useRef, useEffect, MutableRefObject } from "react"
import { UserButtonComponentProps } from "../pages/types"
import { CSSTransition } from "react-transition-group"
import SettingsMenu from "./SettingsMenu"

const UserButtonComponent = ({ userObject, mutate, bannedUsers }: UserButtonComponentProps) => {
  const [showHoverWindow, setShowHoverWindow] = useState(false)
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const [showUserButtonComponent, setShowUserButtonComponent] = useState(true)
  const userButtonComponentRef: MutableRefObject<any> = useRef(null)
  const settingsMenuRef = useRef(null)

  const handleClick = (event: Event) => {
    if (userButtonComponentRef.current && !userButtonComponentRef.current.contains(event.target)) {
      setShowSettingsMenu(false)
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClick)
    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [])

  return (
    <div className="w-min ">
      {showUserButtonComponent ?
        <div ref={userButtonComponentRef} className="my-1 p-1 px-2 border-2 flex items-center min-w-max hover:border-gray-500 transition duration-150">
          <span className="mr-4" onMouseEnter={() => { setShowHoverWindow(true) }} onMouseLeave={() => { setShowHoverWindow(false) }} >{userObject.username}</span>
          <button onClick={() => { setShowSettingsMenu(prev => !prev) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>
          <span className='relative'>
            <CSSTransition in={showHoverWindow} timeout={200} classNames="hover-window" unmountOnExit>
              {showSettingsMenu ? <div /> : <HoverWindow userObject={userObject} />}
            </CSSTransition>
            <CSSTransition in={showSettingsMenu} timeout={200} classNames="hover-window" unmountOnExit>
              <SettingsMenu userObject={userObject} bannedUsers={bannedUsers} setShowUserButtonComponent={setShowUserButtonComponent} setShowSettingsMenu={setShowSettingsMenu} settingsMenuRef={settingsMenuRef} mutate={mutate}/>
            </CSSTransition>
          </span>
        </div> : ""}
    </div>
  )
}



export default UserButtonComponent