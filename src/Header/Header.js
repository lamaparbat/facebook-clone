import React, { useState } from 'react'
import $ from 'jquery'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import LiveTvTwoToneIcon from '@material-ui/icons/LiveTvTwoTone';
import StorefrontIcon from '@material-ui/icons/Storefront';
import StorefrontTwoToneIcon from '@material-ui/icons/StorefrontTwoTone';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import Avatar from '@material-ui/core/Avatar';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { ExitToApp } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import { db } from '../firebase';

function Header() {
 const [homeClicked, setHomeIcon] = useState(true)
 const [tvClicked, setTvIcon] = useState(false)
 const [marketClicked, setMarketIcon] = useState(false)
 const [freindsClicked, setFriendsIcon] = useState(false)
 const path = useHistory()
  
  //profile data
  var profileData = JSON.parse(localStorage.getItem("facebook-clone"))
  
  if (tvClicked === false && marketClicked === false && freindsClicked === false) {
    $(".navbar .col2 .home").css("borderBottom", "3px solid #2086d4")
    $(".navbar .col2 .home").css("borderRadius", "0")
  }
 const homeBtnClick = () => {
  if (homeClicked === true) {
   setHomeIcon(false)
   setTvIcon(false)
   setMarketIcon(false)
   setFriendsIcon(false)
   $(".navbar .col2 .home").css("borderBottom", "none")
   $(".navbar .col2 .home").css("borderRadius", "10px")
   $(".navbar .col2 .home").css("position", "static")
   $(".navbar .col2 .home").css("top", "0px")
  } else {
   setHomeIcon(true)
   setTvIcon(false)
   setMarketIcon(false)
   setFriendsIcon(false)
   $(".navbar .col2 .home").css("borderBottom", "3px solid #2086d4")
   $(".navbar .col2 .home").css("borderRadius", "0")
   $(".navbar .col2 .live").css("borderBottom", "none")
   $(".navbar .col2 .live").css("borderRadius", "10px")
   $(".navbar .col2 .market").css("borderBottom", "none")
   $(".navbar .col2 .market").css("borderRadius", "10px")
   $(".navbar .col2 .friend").css("borderBottom", "none")
   $(".navbar .col2 .friend").css("borderRadius", "10px")
   $(".navbar .col2 .home").css("position", "relative")
   $(".navbar .col2 .home").css("top", "3px")
  }
 }
 
 const tvBtnClick = () => {
  if (tvClicked === true) {
    setTvIcon(false)
    setHomeIcon(false)
    setMarketIcon(false)
    setFriendsIcon(false)
   $(".navbar .col2 .live").css("borderBottom", "none")
   $(".navbar .col2 .live").css("borderRadius", "10px")
   $(".navbar .col2 .live").css("position", "static")
   $(".navbar .col2 .live").css("top", "0px")
  } else {
   setTvIcon(true)
   setHomeIcon(false)
   setMarketIcon(false)
   setFriendsIcon(false)
   $(".navbar .col2 .live").css("borderBottom", "3px solid #2086d4")
   $(".navbar .col2 .live").css("borderRadius", "0")
   $(".navbar .col2 .home").css("borderBottom", "none")
   $(".navbar .col2 .home").css("borderRadius", "10px")
   $(".navbar .col2 .market").css("borderBottom", "none")
   $(".navbar .col2 .market").css("borderRadius", "10px")
   $(".navbar .col2 .friend").css("borderBottom", "none")
   $(".navbar .col2 .friend").css("borderRadius", "10px")
   $(".navbar .col2 .live").css("position", "relative")
   $(".navbar .col2 .live").css("top", "3px")
  }
 }
 
 const marketBtnClick = () => {
  if (marketClicked === true) {
    setTvIcon(true)
    setHomeIcon(false)
    setMarketIcon(false)
    setFriendsIcon(false)
   $(".navbar .col2 .market").css("borderBottom", "none")
   $(".navbar .col2 .market").css("borderRadius", "10px")
   $(".navbar .col2 .market").css("position", "static")
   $(".navbar .col2 .market").css("top", "0px")
  } else {
   setMarketIcon(true)
   setHomeIcon(false)
   setTvIcon(false)
   setFriendsIcon(false)
   $(".navbar .col2 .market").css("borderBottom", "3px solid #2086d4")
   $(".navbar .col2 .market").css("borderRadius", "0")
   $(".navbar .col2 .live").css("borderBottom", "none")
   $(".navbar .col2 .live").css("borderRadius", "10px")
   $(".navbar .col2 .home").css("borderBottom", "none")
   $(".navbar .col2 .home").css("borderRadius", "10px")
   $(".navbar .col2 .friend").css("borderBottom", "none")
   $(".navbar .col2 .friend").css("borderRadius", "10px")
   $(".navbar .col2 .market").css("position", "relative")
   $(".navbar .col2 .market").css("top", "3px")
  }
 }
 
 const friendsBtnClick = () => {
  if (freindsClicked === true) {
    setTvIcon(false)
    setHomeIcon(false)
    setMarketIcon(false)
    setFriendsIcon(false)
   $(".navbar .col2 .friend").css("borderBottom", "none")
   $(".navbar .col2 .friend").css("borderRadius", "10px")
   $(".navbar .col2 .friend").css("position", "static")
   $(".navbar .col2 .friend").css("top", "0px")
  } else {
   setFriendsIcon(true)
   setHomeIcon(false)
   setMarketIcon(false)
   setTvIcon(false)
   $(".navbar .col2 .friend").css("borderBottom", "3px solid #2086d4")
   $(".navbar .col2 .friend").css("borderRadius", "0")
   $(".navbar .col2 .live").css("borderBottom", "none")
   $(".navbar .col2 .live").css("borderRadius", "10px")
   $(".navbar .col2 .market").css("borderBottom", "none")
   $(".navbar .col2 .market").css("borderRadius", "10px")
   $(".navbar .col2 .home").css("borderBottom", "none")
   $(".navbar .col2 .home").css("borderRadius", "10px")
   $(".navbar .col2 .friend").css("position", "relative")
   $(".navbar .col2 .friend").css("top", "3px")
  }
 }
 const searchEnter = () => {
  $(".searchIcon").fadeToggle(500)
 }
  const logOut = () => {
    toast.info("Logout Successfully !!")
    //insert offline mode report on databse
    db.collection("users").doc(profileData.email).set({
      name: profileData.name,
      profile: profileData.profile,
      email:profileData.email,
      mode:"secondary"
    })
    setTimeout(() => {
      localStorage.removeItem("facebook-clone")
      path.push("/Login")
      window.location.reload()
    },1000)
  }
 return (
  <div className="navbar py-1 px-3">
   
    <div className="col1 d-flex">
     <img
      src={process.env.PUBLIC_URL + "/img/brandlogo.png"}
      height="50px"
     />
     <div>
      <SearchIcon className="searchIcon" />
      <input type="search" placeholder="Search Facebook" onClick={searchEnter} className="form-control shadow-none bg-light" />
     </div>
   </div>
   
   <div className="col2">
    <div id="homeIcon" className="home px-4 py-2 mx-1" onClick={homeBtnClick}>
     {
      homeClicked ? <HomeIcon className="homeIcon text-primary" /> : <HomeOutlinedIcon className="homeIcon" />
     }
    </div>
    <div id="liveIcon" className="live px-4 py-0 mx-1" onClick={tvBtnClick}>
     {
      tvClicked ? <LiveTvTwoToneIcon className="liveIcon text-primary" /> : <LiveTvIcon className="liveIcon" />
     }
    </div>
    <div id="marketplaceIcon" className="market px-4 py-2 mx-2" onClick={marketBtnClick}>
     {
      marketClicked ? <StorefrontTwoToneIcon className="storeIcon text-primary" /> : <StorefrontIcon className="storeIcon" />
     }
    </div>
    <div id="friendsIcon" className="friend px-4 py-2 mx-1" onClick={friendsBtnClick}>
     {
      freindsClicked ? <PeopleAltTwoToneIcon className="friendsIcon text-primary" /> : <PeopleAltOutlinedIcon className="friendsIcon" />
     }
    </div>
    </div>
    
   <div className="col3 d-flex">
    <div className="profile mt-1 mx-2">
        <Avatar id="img" src={profileData.profile} />
         <span className="mt-1 mx-2"><strong>{profileData.name}</strong></span>
    </div>
    <div className="appIconCont mx-2 rounded-circle">
      <AppsIcon id="appIcon" />
    </div>
    <div className="messengerIconCont rounded-circle mx-2">
     <img src={process.env.PUBLIC_URL+"/img/messenger.svg"} id="messengerIcon" height="20px" width="20px"/>
    </div>
    <div className="notifIconCont rounded-circle mx-2">
     <NotificationsIcon id="notifIcon" />
    </div>
    <div className="downIconCont mx-2 rounded-circle">
      {/* <ArrowDropDownIcon id="downIcon" /> */}
         <ExitToApp onClick={logOut}/>
    </div>
   </div>
   <ToastContainer/>
   </div>
 )
}

export default Header
