import React from 'react'
import {NavLink} from 'react-router-dom'

function Home() {
 return (
  <div className="loginContain bg-light">
   <div>
    <img src={process.env.PUBLIC_URL + "/img/fblogo.svg"} />
    <h2 className="mt-3 text-primary">facebook</h2>
   </div>
   <div className="d-flex flex-column">
    <NavLink to="/Login">
     {/* <button
      className="btn btn-primary px-5 text-white"
     >Facebook Login</button> */}
    </NavLink>
    <NavLink to="/Signup">
     <button
      className="my-2 btn btn-primary px-5 text-white"
     >&nbsp;&nbsp;&nbsp;&nbsp;Quick Signup </button>
    </NavLink>
   </div>
  </div>
 )
}

export default Home
