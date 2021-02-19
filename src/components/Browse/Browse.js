import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

class BrowseCategory extends Component {
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

  onUpperBodyClick = (event) => {
    const { history } = this.props

    history.push('/upper-body-workouts')
  }

  onLowerBodyClick = (event) => {
    const { history } = this.props

    history.push('/lower-body-workouts')
  }

  onCardioClick = (event) => {
    const { history } = this.props

    history.push('/cardio-workouts')
  }

  onCoreClick = (event) => {
    const { history } = this.props

    history.push('/core-workouts')
  }

  onFullBodyClick = (event) => {
    const { history } = this.props

    history.push('/full-body-workouts')
  }

  onRecoveryClick = (event) => {
    const { history } = this.props

    history.push('/recovery-workouts')
  }

  render () {
    return (
      <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2>Welcome to the workout browser!</h2>
          <p><small>(click on a category to check them out)</small></p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', margin: '40px', whiteSpace: 'pre-wrap' }}>
          <Card
            border="primary"
            onClick={this.onUpperBodyClick}
            className='index-bg' style={{ borderRadius: '12px', borderStyle: 'outset', height: '180px', margin: '40px', padding: '10px', width: '180px', marginTop: '10px' }}>
            <Card.Body>
              <Card.Title style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Upper Body</Card.Title>
              <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
                <Card.Img src={'https://imgur.com/9LMuOGJ.png'} style={{ height: '100px', width: '100px' }} alt='image of a muscle'/>
              </div>
            </Card.Body>
          </Card>
          <Card
            border="primary"
            onClick={this.onCardioClick}
            className='index-bg' style={{ borderRadius: '12px', height: '180px', margin: '40px', padding: '10px', width: '180px', marginTop: '10px' }}>
            <Card.Body>
              <Card.Title style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Cardio</Card.Title>
              <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
                <Card.Img src={'https://imgur.com/BGq99v9.png'} style={{ height: '100px', width: '100px' }} alt='image of a muscle'/>
              </div>
            </Card.Body>
          </Card>
          <Card
            border="primary"
            onClick={this.onLowerBodyClick}
            className='index-bg' style={{ borderRadius: '12px', height: '180px', margin: '40px', padding: '10px', width: '180px', marginTop: '10px' }}>
            <Card.Body>
              <Card.Title style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Lower Body</Card.Title>
              <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
                <Card.Img src={'https://imgur.com/VKDfplf.png'} style={{ height: '100px', width: '100px' }} alt='image of a muscle'/>
              </div>
            </Card.Body>
          </Card>
          <Card
            border="primary"
            onClick={this.onCoreClick}
            className='index-bg' style={{ borderRadius: '12px', height: '180px', margin: '40px', padding: '10px', width: '180px', marginTop: '10px' }}>
            <Card.Body>
              <Card.Title style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Core</Card.Title>
              <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
                <Card.Img src={'https://imgur.com/IQoO7qe.png'} style={{ alignItems: 'center', height: '100px', width: '100px' }} alt='image of a muscle'/>
              </div>
            </Card.Body>
          </Card>
          <Card
            border="primary"
            onClick={this.onFullBodyClick}
            className='index-bg' style={{ borderRadius: '12px', height: '180px', margin: '40px', padding: '10px', width: '180px', marginTop: '10px' }}>
            <Card.Body>
              <Card.Title style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Full Body</Card.Title>
              <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
                <Card.Img src={'https://imgur.com/1XXJ1zU.png'} style={{ height: '100px', width: '100px' }} alt='image of a muscle'/>
              </div>
            </Card.Body>
          </Card>
          <Card
            border="primary"
            onClick={this.onRecoveryClick}
            className='index-bg' style={{ borderRadius: '12px', height: '180px', margin: '40px', padding: '10px', width: '180px', marginTop: '10px' }}>
            <Card.Body>
              <Card.Title style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>Recovery</Card.Title>
              <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
                <Card.Img src={'https://imgur.com/sgWB0ro.png'} style={{ height: '100px', width: '100px' }} alt='image of a muscle'/>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }
}

export default withRouter(BrowseCategory)
