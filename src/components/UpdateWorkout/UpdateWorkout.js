import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import UpdateForm from '../UpdateForm/UpdateForm'

import { updateWorkout, showWorkout } from '../../api/workouts'

class UpdateWorkout extends Component {
  constructor (props) {
    super(props)

    const { user } = this.props

    this.state = {
      workout: {
        title: '',
        author: user,
        difficulty: null,
        category: '',
        description: ''
      },
      createId: null,
      updated: false,
      showUpdateModal: true
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

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    const id = match.params.id
    showWorkout(id, user)
      .then(res => this.setState({ workout: res.data.workout }))
      .catch(error => {
        msgAlert({
          message: `Couldn't Show Because: ${error.message}`,
          variant: 'danger'
        })
      })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, match, msgAlert } = this.props
    const { workout } = this.state

    const id = match.params.id

    updateWorkout(id, workout, user)
      .then(res => {
        this.setState({ updated: true })
        return res
      })
      .then(res => msgAlert({
        message: 'Updated The Workout Successfully!',
        variant: 'success'
      }))
      .catch(error => msgAlert({
        message: `Failed to update due to this error: ${error.message}`,
        variant: 'danger'
      }))
  }

  render () {
    const { workout, updated } = this.state

    if (updated) {
      return <Redirect to={`/workouts/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <UpdateForm
          workout={workout}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default withRouter(UpdateWorkout)
