import { ObjectId } from "mongodb"
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react"
import { KeyedMutator } from "swr"
import type { userObjectType } from "../pages/types"
import { useRef } from "react"

const fetcher = (url: string) => fetch(url).then(res => res.json()).catch(err => console.error(err))



const SettingsMenu = ({ userObject, bannedUsers, setShowUserButtonComponent, setShowSettingsMenu, mutate }: {
  userObject: userObjectType
  bannedUsers: boolean | undefined
  setShowUserButtonComponent: Dispatch<SetStateAction<boolean>>
  setShowSettingsMenu: Dispatch<SetStateAction<boolean>>
  mutate: KeyedMutator<String>
}) => {
  const settingsMenuRef = useRef(null)
  function useHideSettingsMenuWhenClickedElsewhere(ref: MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSettingsMenu(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mouseup", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mouseup", handleClickOutside);
      };
    }, [ref]);
  }
  // const handleClick = (event: Event) => {
  //   console.log(event.target)
  //   if (event.target != settingsMenuRef.current) {
  //     setShowSettingsMenu(false)
  //   }
  // }
  // useEffect(() => {
  //   window.addEventListener("click", handleClick)
  //   return () => {
  //     window.removeEventListener("click", handleClick)
  //   }
  // }, [])

  function handleBanButtonClick() {
    if (bannedUsers) unbanUser(userObject._id, mutate)
    else banUser(userObject._id, mutate)
    setShowUserButtonComponent(false)
  }
  useHideSettingsMenuWhenClickedElsewhere(settingsMenuRef)
  return (
    <span ref={settingsMenuRef} className="p-5 border-2 border-black absolute ml-10 -bottom-10 bg-slate-100 bg-opacity-90 shadow-md z-20" onMouseLeave={() => { setShowSettingsMenu(false) }}>
      {/* <div className="w-4 h-4 top-12 -left-2 rotate-45 bg-inherit border-2 border-black absolute"> </div> */}
      {
        bannedUsers ?
          <button onClick={handleBanButtonClick} className="bg-green-300 border border-black p-1">Unban</button>
          :
          <button onClick={handleBanButtonClick} className="bg-red-300 border border-black p-1">Ban!</button>
      }
    </span>
  )
}


async function banUser(userId: ObjectId, mutate: KeyedMutator<String> | undefined) {
  const reqBody = JSON.stringify({
    "_id": userId
  })
  const settings = {
    method: 'POST',
    body: reqBody,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  await fetch("/api/ban-user", settings)
  if (mutate) mutate(fetcher("/api/get-unbanned-users"))
}

async function unbanUser(userId: ObjectId, mutate: KeyedMutator<String> | undefined) {
  const reqBody = JSON.stringify({
    "_id": userId
  })
  const settings = {
    method: 'POST',
    body: reqBody,
    headers: {
      'Content-Type': 'application/json',
    }
  }
  await fetch("/api/unban-user", settings)
  if (mutate) mutate(fetcher("/api/get-banned-users"))
}

export default SettingsMenu