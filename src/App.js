import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

// import workout componenets
import CreateWorkout from './components/PostWorkout/PostWorkout'
import IndexAll from './components/IndexWorkouts/IndexWorkouts'
import MyIndex from './components/MyIndex/MyIndex'
import OneWorkout from './components/OneWorkout/OneWorkout'
import BrowseCategory from './components/Browse/Browse'
import UpdateWorkout from './components/UpdateWorkout/UpdateWorkout'
import UpperBodyIndex from './components/Category/UpperBodyIndex/UpperBodyIndex'
import LowerBodyIndex from './components/Category/LowerBodyIndex/LowerBodyIndex'
import FullBodyIndex from './components/Category/FullBodyIndex/FullBodyIndex'
import Landing from './components/Landing/Landing'
import Cardio from './components/Category/Cardio/Cardio'
import CoreIndex from './components/Category/CoreIndex/CoreIndex'
import RecoveryIndex from './components/Category/RecoveryIndex/RecoveryIndex'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <Landing msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-a-workout' render={() => (
            <CreateWorkout msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/index-all' render={() => (
            <IndexAll msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/my-index' render={() => (
            <MyIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/workouts/:id' render={() => (
            <OneWorkout msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/browser' render={() => (
            <BrowseCategory msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/update-workout/:id' render={() => (
            <UpdateWorkout msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/upper-body-workouts' render={() => (
            <UpperBodyIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/lower-body-workouts' render={() => (
            <LowerBodyIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/cardio-workouts' render={() => (
            <Cardio msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/core-workouts' render={() => (
            <CoreIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/full-body-workouts' render={() => (
            <FullBodyIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/recovery-workouts' render={() => (
            <RecoveryIndex msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
