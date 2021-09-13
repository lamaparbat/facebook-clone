import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { db } from '../firebase'
import './Login.css'

function Login() {
  const [email, setEmail] = useState("")
  const path = useHistory()

  const getEmail = (e) => {
    setEmail(e.target.value)
  }
  
  var data = {
    name: "",
    profile: "",
    mode: "secondary",
    email: ""
  }
  //signin model
  const cacheStore = (profileData, index) => {
    data.name = profileData[index].name
    data.profile = profileData[index].profile
    data.email = profileData[index].email
    data.mode = "success"
    localStorage.setItem("facebook-clone", JSON.stringify(data))

    //reporting database online mode
    db.collection("users").doc(profileData[index].email).set({
      name: profileData[index].name,
      email: profileData[index].email,
      profile: profileData[index].profile,
      mode: "success"
    }).then(() => {
      toast.success("Successfully login")
      window.location.reload()
      path.push("")
    })
  }

  //login 
  const login =() => {
    if (email) {
      if (email.search("@") > 0 && email.search("gmail") > 0 && email.search(".") === 0 && email.search("com") > 0) {
        db.collection("users").onSnapshot(snap => {
          const userData = snap.docs.map(doc => doc.data())
          const emails = snap.docs.map(doc => doc.id)
          emails.forEach((id, index) => {
            if (id === email) {
              cacheStore(userData, index)
            }
          })
        })
      } else {
        toast.warning("email should be correct!!")
      }
    }
  }

  //redirect to signup page
  const redirectToSignup = () => {
    path.push("/Signup")
  }

  return (
    <>
      <div className="loginContainer">
        <div className="login p-5">
          <h2>Quick Login</h2>
          <input type="email" placeholder="abc@gmail.com" className="px-3 py-2 email" value={email} onChange={getEmail} /><br />
          <input type="button" className="btn btn-success px-5 shadow-none rounded-0" value="Login" onClick={login} /><br /><br />
          <a href="#" onClick={redirectToSignup}>Create a new Account ?</a>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
