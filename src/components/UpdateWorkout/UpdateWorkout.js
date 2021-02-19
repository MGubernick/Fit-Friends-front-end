import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'

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

  // handleClose = (event) => {
  //   const { history } = this.props
  //   this.setState({ showUpdateModal: false })
  //
  //   history.push(`/workouts/${this.props.match.params.id}`)
  // }

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

// <Modal show={this.state.showUpdateModal} backdrop="static" keyboard={false} onHide={this.handleClose}>
//   <Modal.Header style={{ color: '#fff', backgroundColor: '#114b5f' }} closeButton>
//     <Modal.Title>Update Your Post!</Modal.Title>
//   </Modal.Header>
//   <Modal.Body style={{ backgroundColor: '#f3e9d2' }}>
//     <Form onSubmit={this.handleSubmit}>
//       <Form.Group controlId="formBasicTitle">
//         <Form.Label>Title</Form.Label>
//         <Form.Control
//           type="text"
//           name="title"
//           placeholder="Enter Title"
//           onChange={this.handleChange}
//         />
//       </Form.Group>
//
//       <Form.Group controlId="formBasicAuthor">
//         <Form.Label>Author</Form.Label>
//         <Form.Control
//           type="text"
//           name="author"
//           placeholder="Author"
//           onChange={this.handleChange}
//         />
//       </Form.Group>
//
//       <Form.Group controlId="formBasicContent">
//         <Form.Label>Content</Form.Label>
//         <Form.Control
//           as="textarea"
//           rows={3}
//           name="content"
//           placeholder="Content"
//           onChange={this.handleChange}
//         />
//       </Form.Group>
//       <Button variant="secondary" onClick={this.handleClose}>
//         Close
//       </Button>
//       <Button
//         variant="primary"
//         type="submit"
//       >
//         Submit
//       </Button>
//     </Form>
//   </Modal.Body>
// </Modal>
