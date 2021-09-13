import React from 'react'
import './Body.css'
import LeftNavigation from './LeftNavigation'
import Newsfeed from './Newsfeed'
import RightNavigation from './RightNavigation'

function Body(props) {
  return (
   <div className="body d-flex">
    <LeftNavigation data = {props.data} />
    <Newsfeed data = {props.data} />
    <RightNavigation data = {props.data} />
   </div>
  )
}

export default Body
