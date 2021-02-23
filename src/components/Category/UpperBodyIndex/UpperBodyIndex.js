import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import { indexAllWorkouts } from './../../../api/workouts'

class UpperBodyIndex extends Component {
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
        // console.log('This is res at indexAllWorkouts', res)
        this.setState({ workouts: res.data.workouts })
        // console.log('This is workouts at indexAllWorkouts', this.state.workouts)
      })
      .then(() => msgAlert({
        message: 'Check it out! Here are all of the upper body workouts!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing the upper body Workouts Failed',
          message: `could not load workouts: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  render () {
    let workoutJsx
    // console.log('this is workouts before map: ', this.state.workouts)
    const { workouts } = this.state

    if (!workouts) {
      // return 'Loading...'
      workoutJsx = <img style={{ width: '80%' }} src="https://media.giphy.com/media/11T6LuIxeHtJJu/giphy.gif" alt="loading gif" />
    }

    const uBWorkouts = workouts.filter(workout => workout.category === 'Upper Body')

    workoutJsx = uBWorkouts.map(workout => (
      <Card key={workout.id}
        onClick={(event) => {
          this.handleSearchOne(workout.id, event)
        }}
        border="primary"
        className='index-bg' style={{ borderRadius: '12px', height: '270px', margin: '40px', padding: '8px', width: '250px', marginTop: '10px' }}>
        <Card.Body>
          <Card.Title>{workout.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{workout.author}</Card.Subtitle>
          <Card.Text>Category: {workout.category}</Card.Text>
          <Card.Text>Difficulty Level: {workout.difficulty}</Card.Text>
          <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
            <Card.Img src={'https://imgur.com/9LMuOGJ.png'} style={{ alignSelf: 'center', height: '80px', width: '80px' }} alt='image of a muscle'/>
          </div>
        </Card.Body>
      </Card>
    ))

    return (
      <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2>Lets take a look at our library of upper body workouts!</h2>
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

export default withRouter(UpperBodyIndex)
