import React from 'react'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import { Route, Switch } from 'react-router-dom'

function WelcomePage() {
  return (
    <Switch>
     <Route exact path="/"><Home /></Route>
     <Route exact path="/Login"><Login /></Route>
      <Route exact path="/Signup"><Signup /></Route>
    </Switch>
  )
}

export default WelcomePage
