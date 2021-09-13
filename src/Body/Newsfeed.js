import React from 'react'
import './Newsfeed.css'
import Storyrow from './Storyrow'
import StatusBar from './StatusBar'
import FeedPosts from './FeedPosts'

function Newsfeed(props) {
  return (
    <div className="Newsfeed">
      <Storyrow />
      <StatusBar data ={props} />
      <FeedPosts data={props} />
    </div>
  )
}

export default Newsfeed
