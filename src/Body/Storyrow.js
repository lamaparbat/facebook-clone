import { AddCircle, PhotoLibrary } from '@material-ui/icons'
import React from 'react'
import { useState } from 'react'
import $ from 'jquery'
import { Modal, Button } from 'react-bootstrap'
import Draggable from 'react-draggable'
import './Storyrow.css'
import { useEffect } from 'react'
import { db, storage } from '../firebase'
import { ToastContainer, toast } from 'react-toastify'
import { Avatar } from '@material-ui/core'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

function Storyrow() {
  const [stories, setStories] = useState([])
  const [isMobileView, setMobileView] = useState("")
  const [file, setFile] = useState([])
  const [selectedUrl, setUrl] = useState("https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/f4/4a/e5/f44ae50a-5ffa-6b67-5d23-ad301e2a236a/source/512x512bb.jpg")
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedStory, setSelectedStory] = useState([])
  const [modalShow, setModalShow] = useState(false);

  //get current width
  var height = $(window).innerHeight()
  var width = $(window).innerWidth()
  useEffect(() => {
    if (width > 760 && height < 1024) {
      setMobileView("tablet")
    } else if (width < 760 && width > 430) {
      setMobileView("medium")
    } else if (width < 430) {
      setMobileView("mobile")
    } else {
      setMobileView("")
    }
  })
  $(window).resize(() => {
    height = $(window).innerHeight()
    width = $(window).innerWidth()
    if (width > 760 && height < 1024) {
      setMobileView("tablet")
    } else if (width < 760 && width > 430) {
      setMobileView("medium")
    } else if (width < 430) {
      setMobileView("mobile")
    } else {
      setMobileView("")
    }
  })

  //get all the stories
  useEffect(() => {
    db.collection("story").orderBy("time", "desc").onSnapshot(snapshot => {
      setStories(snapshot.docs.map(doc => doc.data()))
    })
  }, [])


  const CreateStoryCard = () => {
    return (
      <>
        <div className="createStoryCard mx-2" onClick={handleShow}>
          <img src={process.env.PUBLIC_URL + "/img/me.jpeg"} id="storeCreateImg" />
          <AddCircle className="text-primary" id="plusIcon" /><br />
          <center><span id="createStoryText">Create story</span></center>
        </div>
      </>
    )
  }
  const StoryCard = (props) => {
    return (
      <>
        <div className="StoryCard mx-2" onClick={() => setModalShow(true)} >
          <img src={props.profile} className="StoryProfilePic" />
          <img src={props.src} onClick={() => redirectToViewPage(props)} />
          <center><p className="px-1">{props.uname}</p></center>
        </div>
      </>
    )
  }

  //image icon click for corresponding imgfile auto click
  const imgIconClick = () => {
    $("#imgFile").click()
  }
  const selectPhoto = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
    let binaryData = []
    binaryData.push(e.target.files[0])
    let currentUrl = URL.createObjectURL(new Blob(binaryData, { type: "application/text" }))
    setUrl(currentUrl)
  }

  //redirect to view page
  const redirectToViewPage = (src) => {
    console.log(src)
    setSelectedStory(src)
  }

  const postStory = () => {
    const profileData = JSON.parse(localStorage.getItem("facebook-clone"))
    const task = storage.ref(file.name).put(file, file.type)
    task.then(snapshot => {
      return snapshot.ref.getDownloadURL()
    }).then(url => {
      db.collection("story").add({
        name: profileData.name,
        imgUrl: url,
        profile: profileData.profile,
        time: new Date().toLocaleTimeString(),
        email: profileData.email
      })
      toast.success("Story Posted !!")
    })

  }

  function MydModalWithGrid(props) {
    return (
      <Modal {...props} fullscreen={'md-down'} aria-labelledby="contained-modal-title-vcenter" className="viewStoryModal">

        <AwesomeSlider className="slider" >
          {
            stories.map((data, index) => (
              <div data-src={data.imgUrl} key={index}>
                <div className="d-flex position-absolute p-2" id="storyProfile">
                  <Avatar src={data.profile} />
                  <div>
                    <h6 className="mx-2">{data.name}</h6>
                    <span id="time">{data.time}</span>
                  </div>
                </div>
              </div>
            ))
          }
        </AwesomeSlider>
      </Modal>
    );
  }


  return (
    <div className="storyrow d-flex justify-content-around py-4">
      <CreateStoryCard />

      {
        isMobileView === "tablet" ? <>
          {
            stories.map((data, index) => (
              index < 4 ? <StoryCard
                uname={data.name}
                src={data.imgUrl}
                profile={data.profile}
                email={data.email}
                key={index}
              /> : null
            ))
          }
        </> :
          isMobileView === "medium" ?
            <>
              {
                stories.map((data, index) => (
                  index < 3 ? <StoryCard
                    uname={data.name}
                    src={data.imgUrl}
                    profile={data.profile}
                    email={data.email}
                    key={index}
                  /> : null
                ))
              }
            </> :
            isMobileView === "mobile" ?
              <>
                {
                  stories.map((data, index) => (
                    index < 2 ? <StoryCard
                      uname={data.name}
                      src={data.imgUrl}
                      profile={data.profile}
                      email={data.email}
                      key={index}
                    /> : null
                  ))
                }
              </> :
              <>
                {
                  stories.map((data, index) => (
                    index < 4 ? <StoryCard
                      uname={data.name}
                      src={data.imgUrl}
                      profile={data.profile}
                      email={data.email}
                      key={index}
                    /> : null
                  ))
                }
              </>
      }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create Story</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {/* <Draggable defaultPosition={{ x: 90, y: 200 }}>
            <div className="bg-success text-light p-1 border border-none shadow-none" style={{ width: "300px", overflow: "wrap" }} contentEditable="true" suppressContentEditableWarning="true">Story Text</div>
          </Draggable> */}
        </Modal.Body>
        <img src={selectedUrl} className="img-fluid" style={{ marginTop: "-30px" }} />
        <Modal.Footer className="d-flex justify-content-between">
          <div>
            <input type="file" className="d-none" id="imgFile" onChange={selectPhoto} />
            <PhotoLibrary onClick={imgIconClick} />
          </div>
          <div className="d-flex">
            <Button variant="" onClick={handleClose}>
              Cancel Post
            </Button>
            <Button variant="primary" onClick={postStory}>
              Upload
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
      <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  )
}

export default Storyrow
