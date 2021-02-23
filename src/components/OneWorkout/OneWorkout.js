import React, { Component } from 'react'

// import { Link, withRouter } from 'react-router-dom'
import { Redirect, withRouter } from 'react-router-dom'

import { showWorkout, deleteWorkout } from '../../api/workouts'
import { myUser, addFav } from '../../api/favorites'

// import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'

class OneWorkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      workout: null,
      exists: true,
      deleted: false,
      clickUpdateWorkout: false,
      favorited: false,
      currentUser: ''
    }
  }

handleChange = event => {
  event.persist()
  this.setState((state) => {
    return {
      content: { ...state.content, [event.target.name]: event.target.value }
    }
  })
}

updateWorkoutClicked = (event) => {
  this.setState({ clickUpdateWorkout: true })
}

onDeleteWorkout = () => {
  const { user, match, history, msgAlert } = this.props
  deleteWorkout(match.params.id, user)
    .then(this.setState({ exists: false }))
    .then(() => msgAlert({
      message: 'Deleted the Workout Successfully!',
      variant: 'success'
    }))
    .then(() => history.push('/browser'))
    .catch(error => {
      msgAlert({
        message: `Failed to delete the workout due to: ${error.message}`,
        variant: 'danger'
      })
    })
}

addToFavorites = () => {
  const { user, match, msgAlert } = this.props
  const { workout, currentUser } = this.state

  addFav(workout, currentUser, user)
    .then(res => {
      this.setState({ favorited: true })
      return res
    })
    .then(res => msgAlert({
      message: `${workout.title} has been added to your favorites!`,
      variant: 'success'
    }))
    .catch(error => msgAlert({
      message: `Oops, we couldn't add that workout to your favorites because: ${error.message}`,
      variant: 'danger'
    }))

  showWorkout(match.params.id, user)
    .then(res => {
      this.setState({ workout: res.data.workout })
    })
}

componentDidMount () {
  const { user, match, msgAlert } = this.props

  showWorkout(match.params.id, user)
    .then(res => {
      this.setState({ workout: res.data.workout })
      return res
    })
    .then(res => msgAlert({
      message: `Here is ${res.data.workout.title}!`,
      variant: 'success'
    }))
    .catch(error => {
      msgAlert({
        message: `Oops, Couldn't show that workout due to: ${error.message}`,
        variant: 'danger'
      })
    })

  myUser(user)
    .then(res => {
      this.setState({ currentUser: res.data })
    })
    .catch(error => {
      msgAlert({
        message: `could not load current user becuase of this error: ${error.message}`,
        variant: 'danger'
      })
    })
}

render () {
  const { workout, clickUpdateWorkout, favorited } = this.state
  // const { msgAlert, user } = this.props
  const { user } = this.props
  // console.log('this is currentUser at show one', this.state.currentUser)
  // console.log('this is workout at show one', workout)

  if (!workout) {
    return (<img style={{ width: '80%' }} src="https://media.giphy.com/media/11T6LuIxeHtJJu/giphy.gif" alt="loading gif" />)
  }

  // if (!workout) {
  //   return (<Redirect to={'/browser'} />)
  // }

  if (clickUpdateWorkout) {
    return (
      <Redirect to={`/update-workout/${workout.id}`} />
    )
  }

  // console.log('this is user before userId set', user)
  const userName = user.user_name
  // console.log('this is workout before authorId set', workout)
  const authorName = workout.author

  let workoutDisplay

  if (userName !== authorName) {
    workoutDisplay = (
      <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
        <Card key={workout.id}
          className="index-bg"
          style={{ border: '1px solid #d3e427', borderRadius: '12px', boxShadow: ' -.3px .5px 0px .5px grey', display: 'flex', marginLeft: '5px', marginRight: '5px', marginBottom: '20px', padding: '10px', width: '800px' }} >
          <Card.Body className="card-body" style={{ display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '200px' }}>
                <Card.Title style={{ fontSize: '40px' }}>{workout.title}</Card.Title>
                <Card.Title style={{ fontStyle: 'italic' }} >Author: {workout.author}</Card.Title>
                <Card.Text style={{ fontSize: '15px' }}>Category: <strong>{workout.category}</strong></Card.Text>
                <Card.Text style={{ fontSize: '15px' }}>Difficulty: <strong>{workout.difficulty}</strong></Card.Text>
                {workout.favorites.includes(user.user_name) || favorited ? null : <Button onClick={this.addToFavorites} style={{ backgroundColor: '#d3e427', borderColor: '#000', color: '#000', marginTop: '15px', width: '165px' }}>Add This Workout To Favorites</Button>}
                {workout.category === 'Upper Body'
                  ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Card.Img src={'https://imgur.com/9LMuOGJ.png'} style={{ height: '200px', width: '200px' }} alt='image of a bicep'/>
                  </div>
                  : null }
                {workout.category === 'Lower Body'
                  ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Card.Img src={'https://imgur.com/VKDfplf.png'} style={{ height: '200px', width: '200px' }} alt='image of legs walking up stairs'/>
                  </div>
                  : null }
                {workout.category === 'Cardio'
                  ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Card.Img src={'https://imgur.com/BGq99v9.png'} style={{ height: '200px', width: '200px' }} alt='image of a figure running'/>
                  </div>
                  : null }
                {workout.category === 'Core'
                  ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Card.Img src={'https://imgur.com/IQoO7qe.png'} style={{ height: '200px', width: '200px' }} alt='image of abs'/>
                  </div>
                  : null }
                {workout.category === 'Full Body'
                  ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Card.Img src={'https://imgur.com/1XXJ1zU.png'} style={{ height: '200px', width: '200px' }} alt='image of a figure flexing'/>
                  </div>
                  : null }
                {workout.category === 'Recovery'
                  ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Card.Img src={'https://imgur.com/sgWB0ro.png'} style={{ height: '200px', width: '200px' }} alt='image of yoga'/>
                  </div>
                  : null }
              </div>
              <div>
                <Card.Text style={{ fontSize: '20px', margin: '30px 30px 10px 30px' }}>Here is how it&apos;s done:</Card.Text>
                <div style={{ border: '1px solid #d3e427', borderRadius: '9px', margin: '10px 30px 30px 30px', padding: '20px', width: '475px' }}>
                  <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
                    {workout.description}
                  </Card.Text>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  } else {
    workoutDisplay = (
      <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
        <Card key={workout.id}
          className="index-bg"
          style={{ border: '1px solid #d3e427', borderRadius: '12px', boxShadow: ' -.3px .5px 0px .5px grey', display: 'flex', marginLeft: '5px', marginRight: '5px', marginBottom: '20px', padding: '10px', width: '800px' }} >
          <Card.Body className="card-body" style={{ display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '200px' }}>
                <Card.Title style={{ fontSize: '40px' }}>{workout.title}</Card.Title>
                <Card.Title style={{ fontStyle: 'italic' }}>Author: {workout.author}</Card.Title>
                <Card.Text style={{ fontSize: '15px' }}>Category: <strong>{workout.category}</strong></Card.Text>
                <Card.Text style={{ fontSize: '15px' }}>Difficulty: <strong>{workout.difficulty}</strong></Card.Text>
                <Button onClick={this.updateWorkoutClicked} style={{ borderColor: '#d3e427' }}>Update</Button>
                <Button style={{ marginLeft: '10px' }} onClick={this.onDeleteWorkout} variant="secondary">Delete</Button>
                {workout.favorites.includes(user.user_name) || favorited ? null : <Button onClick={this.addToFavorites} style={{ backgroundColor: '#d3e427', borderColor: '#000', color: '#000', marginTop: '15px', width: '165px' }}>Add This Workout To Favorites</Button>}
                {workout.category === 'Upper Body'
                  ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Card.Img src={'https://imgur.com/9LMuOGJ.png'} style={{ height: '200px', width: '200px' }} alt='image of a bicep'/>
                  </div>
                  : null }
                {workout.category === 'Lower Body'
                  ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Card.Img src={'https://imgur.com/VKDfplf.png'} style={{ height: '200px', width: '200px' }} alt='image of legs walking up stairs'/>
                  </div>
                  : null }
                {workout.category === 'Cardio'
                  ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Card.Img src={'https://imgur.com/BGq99v9.png'} style={{ height: '200px', width: '200px' }} alt='image of a figure running'/>
                  </div>
                  : null }
                {workout.category === 'Core'
                  ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Card.Img src={'https://imgur.com/IQoO7qe.png'} style={{ height: '200px', width: '200px' }} alt='image of abs'/>
                  </div>
                  : null }
                {workout.category === 'Full Body'
                  ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Card.Img src={'https://imgur.com/1XXJ1zU.png'} style={{ height: '200px', width: '200px' }} alt='image of a figure flexing'/>
                  </div>
                  : null }
                {workout.category === 'Recovery'
                  ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Card.Img src={'https://imgur.com/sgWB0ro.png'} style={{ height: '200px', width: '200px' }} alt='image of yoga'/>
                  </div>
                  : null }
              </div>
              <div>
                <Card.Text style={{ fontSize: '20px', margin: '30px 30px 0px 30px' }}>Here is how it&apos;s done:</Card.Text>
                <div style={{ border: '1px solid #d3e427', borderRadius: '9px', margin: '10px 30px 30px 30px', padding: '20px', width: '475px' }}>
                  <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
                    {workout.description}
                  </Card.Text>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2>Lets Get To Work!</h2>
      </div>
      <div>
        {workoutDisplay}
      </div>
    </div>
  )
}
}

export default withRouter(OneWorkout)
