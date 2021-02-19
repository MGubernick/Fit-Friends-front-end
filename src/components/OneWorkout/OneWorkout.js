import React, { Component } from 'react'

// import { Link, withRouter } from 'react-router-dom'
import { Redirect, withRouter } from 'react-router-dom'

import { showWorkout, deleteWorkout } from '../../api/workouts'

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
      rating: ''
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
    .then(() => history.push('/index'))
    .catch(error => {
      msgAlert({
        message: `Failed to delete the workout due to: ${error.message}`,
        variant: 'danger'
      })
    })
}

componentDidMount () {
  const { user, match, msgAlert } = this.props

  showWorkout(match.params.id, user)
    .then(res => {
      console.log('this is res after showWorkout', res)
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
}

render () {
  const { workout, clickUpdateWorkout } = this.state
  // const { msgAlert, user } = this.props
  const { user } = this.props

  if (!workout) {
    return (<img style={{ width: '80%' }} src="https://media.giphy.com/media/11T6LuIxeHtJJu/giphy.gif" alt="loading gif" />)
  }

  if (clickUpdateWorkout) {
    return (
      <Redirect to={`/update-workout/${workout.id}`} />
    )
  }

  console.log('this is user before userId set', user)
  const userName = user.user_name
  console.log('this is workout before authorId set', workout)
  const authorName = workout.author

  let workoutDisplay

  if (userName !== authorName) {
    workoutDisplay = (
      <Card key={workout.id}
        className="index-bg"
        style={{ borderRadius: '12px', boxShadow: ' -.3px .5px 0px .5px grey', display: 'flex', marginLeft: '5px', marginRight: '5px', marginBottom: '20px', padding: '10px', width: '700px' }} >
        <Card.Title >{workout.title}</Card.Title>
        <Card.Body className="card-body" style={{ display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
          <div style={{ margin: '30px' }}>
            <Card.Title style={{ fontSize: '30px' }}>Author: {workout.author}</Card.Title>
            <Card.Text style={{ fontStyle: 'italic', fontSize: '15px' }}><small>Category: <strong>{workout.category}</strong></small></Card.Text>
            <Card.Text style={{ fontStyle: 'italic', fontSize: '15px' }}><small>Difficulty: <strong>{workout.difficulty}</strong></small></Card.Text>
            <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
              {workout.description}
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    )
  } else {
    workoutDisplay = (
      <Card key={workout.id}
        className="index-bg"
        style={{ border: '1px solid #d3e427', borderRadius: '12px', boxShadow: ' -.3px .5px 0px .5px grey', display: 'flex', marginLeft: '5px', marginRight: '5px', marginBottom: '20px', padding: '10px', width: '800px' }} >
        <Card.Body className="card-body" style={{ display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
          <div style={{ margin: '30px' }}>
            <Card.Title style={{ fontSize: '30px' }}>{workout.title}</Card.Title>
            <Card.Title >Author: {workout.author}</Card.Title>
            <Card.Text style={{ fontStyle: 'italic', fontSize: '15px' }}><small>Category: <strong>{workout.category}</strong></small></Card.Text>
            <Card.Text style={{ fontStyle: 'italic', fontSize: '15px' }}><small>Difficulty: <strong>{workout.difficulty}</strong></small></Card.Text>
            <Card.Text style={{ whiteSpace: 'pre-wrap' }}>
              {workout.description}
            </Card.Text>
            <Button onClick={this.updateWorkoutClicked} style={{ borderColor: '#d3e427' }}>Update</Button>
            <Button style={{ marginLeft: '10px' }} onClick={this.onDeleteWorkout} variant="secondary">Delete</Button>
          </div>
        </Card.Body>
      </Card>
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
