import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header/Header';
import Body from './Body/Body';
import Login from './WelcomePage/Login'
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import WelcomePage from './WelcomePage/WelcomePage';

function App() {
  const [mode, setLoginCheck] = useState()
  let data = JSON.parse(localStorage.getItem("facebook-clone"))
  if (data === null) {
    localStorage.setItem("facebook-clone", JSON.stringify({
      name: "",
      profile: "",
      email: "",
      mode: "secondary"
    }))
    window.location.reload()
  } else {
    var profileData = JSON.parse(localStorage.getItem("facebook-clone"))
  }
  useEffect(() => {
    setLoginCheck(`${data.mode}`)
  })

  return (
    <div className="App">
      {
        mode != "secondary" ?
          <>
            <Header />
            <Body data={profileData} />
          </> :
          <WelcomePage />
      }
      <ToastContainer />
    </div>
  );
}

export default App;
