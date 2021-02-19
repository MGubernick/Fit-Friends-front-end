import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
// import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const WorkoutForm = ({ post, handleSubmit, handleChange }) => {
  const [showCreateModal, setShowCreateModal] = useState(true)
  const [backHome, setBackHome] = useState(false)

  const handleCloseCreateModal = (event) => {
    setShowCreateModal(false)
    setBackHome(true)
  }

  if (backHome) {
    return (
      <Redirect to={'/browser'} />
    )
  }

  return (
    <Modal
      show={showCreateModal}
      onHide={handleCloseCreateModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className='modal-bg' closeButton>
        <Modal.Title>Lets Get Started!</Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-bg'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter Title"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Pick a Difficulty:<small>(1 = Too Easy, 5 = Brutal!)</small></Form.Label>
            <Form.Control
              as="select"
              name="difficulty"
              onChange={handleChange}>
              <option>Scale of 1 (too easy) - 5 (brutal!)</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Pick A Category:</Form.Label>
            <Form.Control
              as="select"
              name="category"
              onChange={handleChange}>
              <option>Pick A Category...</option>
              <option>Upper Body</option>
              <option>Lower Body</option>
              <option>Full Body</option>
              <option>Cardio</option>
              <option>Core</option>
              <option>Recovery</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Label>Steps/description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Write Out Steps/Description Here"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
              Close
          </Button>
          <Button
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

// export default withRouter(WorkoutForm)
export default WorkoutForm
