import React, { Component } from 'react'

// import { Link, withRouter } from 'react-router-dom'
import { Redirect, withRouter } from 'react-router-dom'

import { showWorkout, deleteWorkout } from '../../api/workouts'

// import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'
// import Card from 'react-bootstrap/Card'

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
  const userId = user.id
  console.log('this is author before authorId set', workout.author)
  const authorId = workout.author.id

  let workoutDisplay

  if (userId !== authorId) {
    workoutDisplay = (
      <div className="index-bg">
        <h3>{workout.title}</h3>
        <h5>Author: {workout.author}</h5>
        <h6><small>Category: <strong>{workout.category}</strong></small></h6>
        <h6><small>Difficulty: <strong>{workout.difficulty}</strong></small></h6>
        <div style={{ border: '1px solid #d3e427', margin: '10px', padding: '10px' }}>
          <h6 style={{ whiteSpace: 'pre-wrap' }}>
            {workout.description}
          </h6>
        </div>
      </div>
    )
  } else {
    workoutDisplay = (
      <div>
        <h3>{workout.title}</h3>
        <h5>Author: {workout.author}</h5>
        <h6><small><strong>Category: {workout.category}</strong></small></h6>
        <h6><small>Difficulty: {workout.difficulty}</small></h6>
        <div style={{ border: '1px solid #d3e427', margin: '10px', padding: '10px' }}>
          <h6 style={{ whiteSpace: 'pre-wrap' }}>
            {workout.description}
          </h6>
        </div>
        <Button onClick={this.updateWorkoutClicked} style={{ backgrounColor: '#d3e427' }}>Update</Button>
        <Button style={{ marginLeft: '10px' }} onClick={this.onDeleteWorkout} variant="outline-secondary">Delete</Button>
      </div>
    )
  }

  return (
    <div>
      {workoutDisplay}
    </div>
  )
}
}

export default withRouter(OneWorkout)
