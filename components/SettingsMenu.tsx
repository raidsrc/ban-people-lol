import { ObjectId } from "mongodb"
import { Dispatch, MutableRefObject, SetStateAction, useContext, useEffect, useState } from "react"
import { KeyedMutator } from "swr"
import type { userObjectType } from "../lib/_types"
import { BanContext } from "../lib/_contexts"
import { List, ListItem, ListItemButton } from "@mui/material"

const fetcher = (url: string) => fetch(url).then(res => res.json()).catch(err => console.error(err))

const SettingsMenu = ({ userObject, setShowUserButtonComponent, setShowSettingsMenu, settingsMenuRef, mutate }: {
  userObject: userObjectType
  setShowUserButtonComponent: Dispatch<SetStateAction<boolean>>
  setShowSettingsMenu: Dispatch<SetStateAction<boolean>>
  mutate: KeyedMutator<Array<Object>>
  settingsMenuRef: MutableRefObject<any>
}) => {
  const bannedOrUnbanned = useContext(BanContext)

  function handleBanButtonClick() {
    banOrUnbanUser(userObject._id, mutate, bannedOrUnbanned.bannedUsers)
    setShowUserButtonComponent(false)
  }
  return (
    <List ref={settingsMenuRef} sx={{position: "absolute"}} className="bg-slate-200 z-20" onMouseLeave={() => { setShowSettingsMenu(false) }}>
      {
        bannedOrUnbanned.bannedUsers ?
          <ListItem disablePadding>
            <ListItemButton onClick={handleBanButtonClick} sx={{ backgroundColor: "rgb(187 247 208)", ":hover": { backgroundColor: "rgb(134 239 172)" } }}>Unban</ListItemButton>
          </ListItem>
          :
          <ListItem disablePadding>
            <ListItemButton onClick={handleBanButtonClick} sx={{ backgroundColor: "rgb(254 202 202)", ":hover": { backgroundColor: "rgb(252 165 165)" } }}>Ban!</ListItemButton>
          </ListItem>
      }
    </List>
  )
}

async function banOrUnbanUser(userId: ObjectId, mutate: KeyedMutator<Array<Object>> | undefined, bannedUsers: boolean): Promise<void> {
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
  if (bannedUsers) {
    await fetch("/api/unban-user", settings)
    if (mutate) mutate(fetcher("/api/get-banned-users"))
  }
  else {
    await fetch("/api/ban-user", settings)
    if (mutate) mutate(fetcher("/api/get-unbanned-users"))
  }
}

export default SettingsMenu