import { Avatar } from '@material-ui/core'
import { ExpandMoreSharp, LiveTvSharp, MoreHoriz, PeopleAlt, SportsEsports, StorefrontSharp, SupervisedUserCircleOutlined, TurnedInSharp, UpdateSharp } from '@material-ui/icons'
import React from 'react'
import './LeftNavigation.css'

function LeftNavigation(props) {
  return (
    <div className="leftNavigation py-2">
    <ul>
     <li className="d-flex">
      <Avatar id="avatar" src={props.data.profile} />
          <span className="mt-2 mx-3">{props.data.name}</span>
     </li>
     <li className="d-flex">
      <PeopleAlt id="friendIcon" />
      <span className="mt-1 mx-3"> Friends</span>
     </li>
     <li className="d-flex">
      <SupervisedUserCircleOutlined id="groupIcon" />
      <span className="mt-1 mx-3"> Groups</span>
     </li>
     <li className="d-flex">
      <StorefrontSharp id="marketIcon" />
      <span className="mt-1 mx-3"> Marketplace</span>
     </li>
     <li className="d-flex">
      <LiveTvSharp id="liveIcon" />
      <span className="mt-1 mx-3"> &nbsp;Watch</span>
     </li>
     <li className="d-flex">
      <UpdateSharp id="memoryIcon" />
      <span className="mt-1 mx-3"> Memories</span>
     </li>
     <li className="d-flex">
      <TurnedInSharp id="saveIcon" />
      <span className="mt-1 mx-3"> Saved</span>
     </li>
     <li className="d-flex">
      <ExpandMoreSharp id="sharpIcon" />
      <span className="mt-1 mx-3"> See More</span>
     </li><hr />
     <li className="d-flex justify-content-between" id="shortCutsTitle">
      <span>Your Shortcuts</span>
      <MoreHoriz id="threeDot" />
     </li>
     <li className="d-flex">
      <SportsEsports id="saveIcon" />
      <span className="mt-1 mx-3"> Saved</span>
     </li>
     <li className="d-flex">
      <Avatar src={process.env.PUBLIC_URL+"/img/ronb.png"} id="ronbLogo" />
      <span className="mt-1 mx-3"> Routine of Nepal Banda</span>
      </li>
      <div className="policies">
        <span>Privacy. </span>
        <span>Terms. </span>
        <span>Advertising. </span>
        <span>Ad Choices. </span>
        <span>Cookies.</span>
        <span> More. </span>
        <span>Facebook. </span>
        <span>&copy;2021</span>
      </div>
     </ul>
    </div>
  )
}

export default LeftNavigation
