import { Avatar } from '@material-ui/core'
import { InsertEmoticon, InsertPhoto, Videocam, VideoLibrary } from '@material-ui/icons'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './StatusBar.css'
import { Modal, Button, Spinner } from 'react-bootstrap'
import { db, storage } from '../firebase.js'
import $ from 'jquery'

function StatusBar(props) {
  const [status, clearInput] = useState("")
  const [show, setShow] = useState(false)
  const [media, setMedia] = useState([])
  const [uploadingPost, setUploadingPost] = useState("d-none")
  const [selectedMediaUrl, setMediaUrl] = useState()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const keypress = (e) => {
    clearInput(e.target.value)
  }

  const Postcard = () => {
    return (
      <>
        <div className="py-2">
          <Videocam className="emoji text-danger" />
          <span>&nbsp; Live Video</span>
        </div>
        <div className="py-2" onClick={handleShow}>
          <InsertPhoto className="emoji text-success" />
          <span>&nbsp; Photo/Video</span>
        </div>
        <div className="py-2">
          <InsertEmoticon className="emoji text-warning" />
          <span>&nbsp; Feeling/Activity</span>
        </div>
      </>
    )
  }

  const clickPhoto = () => {
    $("#mediaIcon #hiddenMediaSelector").click()
  }
  const clickVideo = () => {
    $("#mediaIcon #hiddenMediaSelector").click()
  }

  const insertMedia = (e) => {
    let binaryData = []
    setMedia(e.target.files[0])
    binaryData.push(e.target.files[0])
    let refineSrc = URL.createObjectURL(new Blob(binaryData, { type: "application/text" }))
    setMediaUrl(refineSrc)
  }
  const postStatus = (e) => {
    if (status && media.length === 0) {
      setUploadingPost("d-flex")
      db.collection("posts").add({
        status: status,
        imgUrl: "",
        videoUrl: "",
        time: new Date().toLocaleTimeString(),
        uid: props.data.data.name,
        profile: props.data.data.profile
      }).then((docRef) => {
        //clear the input
        setUploadingPost("d-none")
        clearInput("")
        setMediaUrl("")
        setMedia([])
        $("#cancleCreatePostModel").click()
        toast.success("Uploaded Successful !")
      })
    } else if (status.length <= 0 && media.length != 0) {
      setUploadingPost("d-flex")
      const task = storage.ref(media.name).put(media, media.type)
      task.then((snapshot) => {
        return snapshot.ref.getDownloadURL()
      }).then(url => {
        db.collection("posts").add({
          status: "",
          imgUrl: (media.type.search("mp4") < 0) ? url : "",
          videoUrl: (media.type.search("mp4") < 0) ? "" : url,
          time: new Date().toLocaleTimeString(),
          uid: props.data.data.name,
          profile: props.data.data.profile
        }).then((docRef) => {
          //clear the input
          setUploadingPost("d-none")
          clearInput("")
          setMediaUrl("")
          setMedia([])
          $("#cancleCreatePostModel").click()
          toast.success("Uploaded Successful !")
        })
      })
    } else {
      db.collection("posts").add({
        status: status,
        imgUrl: "",
        videoUrl: "",
        time: new Date().toLocaleTimeString(),
        uid: props.data.data.name,
        profile: props.data.data.profile
      }).then((docRef) => {
        //clear the input
        clearInput("")
        setMediaUrl("")
        setMedia([])
        $("#cancleCreatePostModel").click()
        toast.success("Uploaded Successful !")
      })
    }
  }

  return (
    <div className="statusbar">
      <div className="formContainer d-flex">
        <Avatar src={props.data.data.profile} />
        <input
          type="text"
          className="mx-2 bg-light border-0 form-control border-none shadow-none"
          placeholder="Whats on your mind, Parbat ?"
          onClick={handleShow}
        />
      </div><hr />
      <div className="media d-flex justify-content-around">
        <Postcard />
      </div>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center d-flex">
          <textarea
            type="text"
            value={status}
            onChange={keypress}
            className="mx-2 bg-light border-0 form-control border-none shadow-none"
            placeholder="Whats on your mind, Parbat ?"
            style={{ height: "50px" }}></textarea>
        </Modal.Body>
        {
          (media.length != 0) ? (media.type.search("image") >= 0 || media.type.search("jpeg") >= 0 || media.type.search("jpg") >= 0 || media.type.search("png") >= 0 || media.type.search("svg") >= 0) ?
            <img src={selectedMediaUrl} className="img-fluid" /> : <video src={selectedMediaUrl} className="img-fluid" autoPlay controls muted></video>
            : null
        }
        <div className="m-3 p-2 d-flex justify-content-between" id="mediaIcon">
          <div><p id="mediaText">Add to your post</p></div>
          <div className="d-flex">
            <input type="file" className="d-none" onChange={insertMedia} id="hiddenMediaSelector" accept="image/video/*" />
            <div className="px-2 py-1 mx-2 rounded-1" id="photoLibrary" onClick={clickPhoto}><InsertPhoto /></div>
            <div className="px-2 py-1 mx-1 rounded-1" id="videoLibrary" onClick={clickVideo}><VideoLibrary /></div>
          </div>
        </div>
        <Modal.Footer>
          <Button variant="" id="cancleCreatePostModel" onClick={handleClose}>
            Cancel Post
          </Button>
          <Button className="d-flex" variant="primary" onClick={postStatus}>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              className={uploadingPost}
            />
            {
              (uploadingPost != "d-none") ? <span>Uploading......</span> :
                <span>Upload</span>
            }
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default StatusBar
