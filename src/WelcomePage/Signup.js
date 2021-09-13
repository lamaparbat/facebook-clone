import { KeyboardBackspace } from '@material-ui/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { db, storage } from '../firebase'

function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [profile, setImage] = useState()
  const path = useHistory()

  const getUsername = (e) => {
    setUsername(e.target.value)
  }
  const getEmail = (e) => {
    setEmail(e.target.value)
  }

  const getImage = (e) => {
    setImage(e.target.files[0])
  }
  //on submit
  const submit = () => {
    if (email.search("@") > 0 && email.search("gmail") > 0 && email.search(".") === 0 && email.search("com") > 0) {
      if (username && email && profile) {
        //uploading image
        const task = storage.ref(profile.name).put(profile, profile.type)
        task.then(snapshot => {
          return snapshot.ref.getDownloadURL()
        }).then(url => {
          //uploading the every properties
          db.collection("users").doc(email).set({
            name: username,
            email: email,
            profile: url,
            mode: "success"
          }).then(() => {
            path.push("")
            window.location.reload()
          })
          toast.success("Account created successfully !")
          localStorage.setItem("facebook-clone", JSON.stringify({
            name: username,
            email: email,
            profile: url
          }))
        })
      } else {
        toast.warning("input field should not be empty !!")
      }
    }
  }

  const redirectToSignin = () => {
    path.push("/Login")
  }

  return (
    <>
      <div className="loginContainer">
        <div className="login p-5">
          <h3> <KeyboardBackspace onClick={redirectToSignin} style={{ cursor: "pointer" }} />&nbsp; Quick Signup</h3>
          <span>Username</span><br />
          <input type="email" placeholder="Enter your full name" className="px-3 py-2 email" value={username} onChange={getUsername} /><br />
          <span>Your email address</span><br />
          <input type="email" placeholder="abc@gmail.com" className="px-3 py-2 password" value={email} onChange={getEmail} /><br />
          <span>Profile Picture</span><br />
          <input type="file" className="password form-control" onChange={getImage} /><br />
          <img src="" className="img-fluid" />
          <input type="button" className="btn btn-success px-5 shadow-none rounded-0" value="Submit" onClick={submit} />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Signup
