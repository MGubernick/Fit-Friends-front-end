import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import { indexAllWorkouts } from './../../api/workouts'

class IndexAll extends Component {
  constructor (props) {
    super(props)

    this.state = {
      workouts: []
    }
  }

  handleSearchOne = (id, event) => {
    const { history } = this.props

    history.push(`/workouts/${id}`)
  }

  componentDidMount () {
    const { msgAlert, user } = this.props

    indexAllWorkouts(user)
      .then(res => {
        console.log('This is res at indexMyWorkouts', res)
        this.setState({ workouts: res.data.workouts })
      })
      .then(() => msgAlert({
        message: 'Check it out! Here are all of the workouts!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Index Of All The Workouts Failed',
          message: `could not load workouts: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  render () {
    let workoutJsx
    console.log('this is workouts before map: ', this.state.workouts)
    const { workouts } = this.state

    if (!workouts) {
      // return 'Loading...'
      workoutJsx = <img style={{ width: '80%' }} src="https://media.giphy.com/media/11T6LuIxeHtJJu/giphy.gif" alt="loading gif" />
    }

    workoutJsx = workouts.map(workout => (
      <Card key={workout.id}
        onClick={(event) => {
          this.handleSearchOne(workout.id, event)
        }}
        className='index-bg' style={{ margin: '10px', padding: '10px', width: '100%', marginTop: '10px' }}>
        <Card.Body>
          <Card.Title>{workout.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{workout.author}</Card.Subtitle>
          <Card.Text>Category: {workout.category}</Card.Text>
          <Card.Text>Difficulty Level: {workout.difficulty}</Card.Text>
          {/* <Card.Link href={`#workouts/${workout._id}`}>See Full Post</Card.Link> */}
        </Card.Body>
      </Card>
    ))

    return (
      <div>
        <h2>Lets take a look at those workouts!</h2>
        <p><small>(click on a workout to see full details)</small></p>
        <ul>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {workoutJsx.reverse()}
          </div>
        </ul>
      </div>
    )
  }
}

export default withRouter(IndexAll)
