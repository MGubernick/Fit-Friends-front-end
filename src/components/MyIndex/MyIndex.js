import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import { indexMyWorkouts } from './../../api/workouts'

class MyIndex extends Component {
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

    indexMyWorkouts(user)
      .then(res => {
        // console.log('This is res at indexAllWorkouts', res)
        this.setState({ workouts: res.data.workouts })
        // console.log('This is workouts at indexAllWorkouts', this.state.workouts)
      })
      .then(() => {
        this.setState({ loaded: true })
      })
      .then(() => msgAlert({
        message: 'Check it out! Here are all of your workouts!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Index Of All Your Workouts Failed',
          message: `could not load workouts: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  render () {
    let workoutJsx
    // console.log('this is workouts before map: ', this.state.workouts)
    const { workouts, loaded } = this.state

    if (workouts.length === 0 && loaded === true) {
      // return 'Loading...'
      workoutJsx = (
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '30px' }}>
          <h4>Looks like you haven&apos;t posted any workouts yet...Hit <strong>Put One Up</strong> and get started!</h4>
        </div>
      )
    } else {
      workoutJsx = workouts.map(workout => (
        <Card key={workout.id}
          onClick={(event) => {
            this.handleSearchOne(workout.id, event)
          }}
          border="primary"
          className='index-bg' style={{ borderRadius: '12px', height: '250px', margin: '40px', padding: '8px', width: '250px', marginTop: '10px' }}>
          <Card.Body>
            <Card.Title>{workout.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{workout.author}</Card.Subtitle>
            <Card.Text>Category: {workout.category}</Card.Text>
            <Card.Text>Difficulty Level: {workout.difficulty}</Card.Text>
            {workout.category === 'Upper Body'
              ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
                <Card.Img src={'https://imgur.com/9LMuOGJ.png'} style={{ height: '60px', width: '60px' }} alt='image of a bicep'/>
              </div>
              : null }
            {workout.category === 'Lower Body'
              ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
                <Card.Img src={'https://imgur.com/VKDfplf.png'} style={{ height: '60px', width: '60px' }} alt='image of legs walking up stairs'/>
              </div>
              : null }
            {workout.category === 'Cardio'
              ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
                <Card.Img src={'https://imgur.com/BGq99v9.png'} style={{ height: '60px', width: '60px' }} alt='image of figure running'/>
              </div>
              : null }
            {workout.category === 'Core'
              ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
                <Card.Img src={'https://imgur.com/IQoO7qe.png'} style={{ height: '60px', width: '60px' }} alt='image of abs'/>
              </div>
              : null }
            {workout.category === 'Full Body'
              ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
                <Card.Img src={'https://imgur.com/1XXJ1zU.png'} style={{ height: '60px', width: '60px' }} alt='image of a figure flexing'/>
              </div>
              : null }
            {workout.category === 'Recovery'
              ? <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
                <Card.Img src={'https://imgur.com/sgWB0ro.png'} style={{ height: '60px', width: '60px' }} alt='image of yoga'/>
              </div>
              : null }
          </Card.Body>
        </Card>
      ))
    }

    return (
      <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2>Here are your workouts!</h2>
          <p><small>(click on a workout to see full details)</small></p>
        </div>
        <ul>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', margin: '10px', whiteSpace: 'pre-wrap' }}>
            {workoutJsx}
          </div>
        </ul>
      </div>
    )
  }
}

export default withRouter(MyIndex)
