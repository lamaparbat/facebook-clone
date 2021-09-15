import { Avatar } from '@material-ui/core'
import { ChatBubbleOutline, MoreHoriz, Public, ReplyOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import 'animate.css'
import './FeedPosts.css'

function FeedPosts() {
   const [postData, setPostData] = useState([])

   //fetched post data from firebase
   useEffect(() => {
      db.collection("posts").orderBy("time", "desc").onSnapshot(snap => {
         setPostData(snap.docs.map(doc => (doc.data())))
      })
   }, [])

   const Post = (props) => {
      return (
         <>
            <div className={"card animate__animated " + props.animate} >
               <div className="postHeader py-1 px-3 d-flex justify-content-between">
                  <div className="col1 d-flex">
                     <Avatar
                        src={props.profile}
                        className="mt-1 mx-1" id="profileImg" />
                     <span className="mx-1 my-1" id="profileName">{props.uid}<br />
                        <span id="time">{props.time} </span><Public id="globe" />
                     </span>
                  </div>
                  <div className="col2 px-2">
                     <MoreHoriz className="threeDotIcon" />
                  </div>
               </div>
               <span
                  className="py-3 text-left"
                  style={{ paddingLeft: "20px", paddingRight: "20px", marginTop: "-15px", lineHeight: "15pt" }}>
                  {props.status}
               </span>
               {
                  props.imgUrl != "" ? <img src={props.imgUrl} className="img-fluid" /> :
                     props.videoUrl != "" ? <video src={props.videoUrl} className="img-fluid" autoPlay controls muted></video> : null
               }
               <div className="postFooter px-3">
                  <PostFooterReviews postID={props.uid} />
                  <PostFooterComments profile={props.profile} />
               </div>
            </div><br />
         </>
      )
   }

   // like functions
   const likePost = (uid) => {
      alert(uid)
   }

   const PostFooterReviews = (uid) => {
      return (
         <>
            <div className="py-2 px-1 d-flex justify-content-between" id="reviewNav">
               <span style={{ fontSize: "14px" }}>1.3k</span>
               <span style={{ fontSize: "14px" }}>30 comments</span>
            </div>
            <div className="PostFooterReviews d-flex justify-content-around">
               <div className="col1 d-flex mx-2 text-secondary" onClick={() => likePost(uid.postID)}>
                  <ThumbUpAltOutlined />
                  <span> &nbsp;Like </span>
               </div>
               <div className="col1 d-flex mx-2 text-secondary">
                  <ChatBubbleOutline id="commentIcon" />
                  <span> &nbsp;Comment </span>
               </div>
               <div className="col1 d-flex mx-2 text-secondary">
                  <ReplyOutlined id="shareIcon" />
                  <span> &nbsp;Share </span>
               </div>
            </div><hr id="divider" />
         </>
      )
   }

   const PostFooterComments = (props) => {
      return (
         <>
            <div className="d-flex py-2" id="PostFooterComments">
               <Avatar
                  src={props.profile}
                  className="mt-1 mx-1"
                  style={{ height: "34px", width: "34px" }}
                  id="profileImg" />
               <input className="form-control mx-2 shadow-none bg-light" id="commentInput" placeholder="Write a comment....." />
            </div>
         </>
      )
   }

   return (
      <div className="posts py-2 my-3">
         {
            postData.map((data, index) => (
               <Post
                  status={data.status}
                  time={data.time}
                  imgUrl={data.imgUrl}
                  videoUrl={data.videoUrl}
                  uid={data.uid}
                  profile={data.profile}
                  animate="animate__bounceIn"
                  key={index} />
            ))
         }
      </div>
   )
}

export default FeedPosts
