import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import { indexAllWorkouts } from './../../../api/workouts'

class FullBodyIndex extends Component {
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
        this.setState({ workouts: res.data.workouts })
      })
      .then(() => msgAlert({
        message: 'Check it out! Here are all of the full body workouts!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing The Full Body Workouts Failed',
          message: `could not load workouts: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  render () {
    let workoutJsx
    const { workouts } = this.state

    if (!workouts) {
      // return 'Loading...'
      workoutJsx = <img style={{ width: '80%' }} src="https://media.giphy.com/media/11T6LuIxeHtJJu/giphy.gif" alt="loading gif" />
    }

    const fullBodyWorkouts = workouts.filter(workout => workout.category === 'Full Body')

    workoutJsx = fullBodyWorkouts.map(workout => (
      <Card key={workout.id}
        onClick={(event) => {
          this.handleSearchOne(workout.id, event)
        }}
        border="primary"
        className='index-bg style-card' style={{ borderRadius: '12px', height: '270px', margin: '40px', padding: '8px', width: '250px', marginTop: '10px' }}>
        <Card.Body>
          <Card.Title>{workout.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{workout.author}</Card.Subtitle>
          <Card.Text>Category: {workout.category}</Card.Text>
          <Card.Text>Difficulty Level: {workout.difficulty}</Card.Text>
          <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
            <Card.Img src={'https://imgur.com/1XXJ1zU.png'} style={{ alignSelf: 'center', height: '80px', width: '80px' }} alt='image of a muscle'/>
          </div>
        </Card.Body>
      </Card>
    ))

    return (
      <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2>Lets take a look at our library of full body workouts!</h2>
          <p><small>(click on a workout to see full details)</small></p>
        </div>
        <ul>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', margin: '10px', whiteSpace: 'pre-wrap' }}>
            {workoutJsx.reverse()}
          </div>
        </ul>
      </div>
    )
  }
}

export default withRouter(FullBodyIndex)
