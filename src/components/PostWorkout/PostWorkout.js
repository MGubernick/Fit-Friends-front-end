import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import WorkoutForm from '../WorkoutForm/WorkoutForm'

// import { createPost } from '../../../api/posts'
import { createWorkout } from '../../api/workouts'

class CreateAWorkout extends Component {
  constructor (props) {
    super(props)

    const { user } = this.props
    // console.log('this is user at create', user)
    this.state = {
      workout: {
        title: '',
        author: user.user_name,
        difficulty: null,
        category: '',
        description: ''
      },
      createId: null
    }
  }

  handleChange = event => {
    event.persist()

    this.setState((state) => {
      return {
        workout: { ...state.workout, [event.target.name]: event.target.value }
      }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const { workout } = this.state

    // console.log('this is the workout', workout)
    createWorkout(workout, user)

      .then(res => {
        this.setState({ createId: res.data.workout.id })
        return res
      })
      .then(res => msgAlert({
        message: `Successfully Created ${res.data.workout.title}, Let's get to work!`,
        variant: 'success'
      }))
      .catch(error => msgAlert({
        message: `That didn't work, because error: ${error.message}`,
        variant: 'danger'
      }))
  }

  render () {
    const { workout, createId } = this.state

    if (createId) {
      return <Redirect to={`/workouts/${createId}/`} />
    }

    return (
      <div>
        <WorkoutForm
          workout={workout}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default CreateAWorkout
