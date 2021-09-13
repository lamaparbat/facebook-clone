import { Avatar, DialogContent } from '@material-ui/core'
import { Clear, FiberManualRecord, MoreHoriz, RedeemOutlined, Search, VideoCall } from '@material-ui/icons'
import React, { useState } from 'react'
import './RightNavigation.css'
import { db } from '../firebase'
import { useEffect } from 'react'

function RightNavigation(props) {
  const [users, setUsers] = useState([])
  useEffect(() => {
    db.collection("users").onSnapshot(snap => {
      setUsers(snap.docs.map(doc => doc.data()))
    })
  }, [])
  const EventCard = () => {
    return (
      <>
        <div className="eventCard p-3 bg-white">
          <div className="d-flex mb-3 justify-content-between">
            <div className="d-flex">
              <RedeemOutlined />
              <span>&nbsp; Birthdays</span>
            </div>
            <Clear className="cancelEvent" />
          </div>
          <span className="p-2"><strong>Tseden Dolma's</strong> Birthday is toaday!</span>
        </div><hr />
      </>
    )
  }

  const ActiveUser = () => {
    const Header = () => {
      return (
        <>
          <div className="header d-flex justify-content-between">
            <span>Contacts</span>
            <div className="d-flex">
              <VideoCall className="mx-2 videoIcon" />
              <Search className="mx-2 searchIcon" />
              <MoreHoriz className="mx-2 threeDotIcon" />
            </div>
          </div>
        </>
      )
    }
    const OnlineUser = (props) => {
      return (
        <>
          <div className="onlineUser bg-light p-2 d-flex my-2 justify-content-between">
            <div className="d-flex">
              <Avatar className="profilePic" src={props.src} />
              <span className="mx-3 mt-1">{props.name}</span>
            </div>
            <FiberManualRecord className={"dot text-" +props.mode} />
          </div>
        </>
      )
    }
    return (
      <>
        <div className="activeUser">
          <Header />
          {
            users.map((data,index) => (
              data.name !== props.data.name ? <OnlineUser name={data.name} src={data.profile} mode={data.mode} key={index} />:null
            ))
          }
        </div>
      </>
    )
  }
  return (
    <div className="rightNavigation py-4 pe-4">
      <EventCard />
      <ActiveUser />
    </div>
  )
}

export default RightNavigation
