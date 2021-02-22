import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

// import { myUser, allFavs } from './../../api/favorites'
import { myUser, removeFav, allFavs } from './../../api/favorites'
import { indexAllWorkouts } from './../../api/workouts'

class Favorites extends Component {
  constructor (props) {
    super(props)

    this.state = {
      workouts: [],
      currentUser: null,
      favorites: null
    }
  }

  handleSearchOne = (id, event) => {
    const { history } = this.props

    history.push(`/workouts/${id}`)
  }

  removeFavorite = (workout, event) => {
    const { user, msgAlert, history } = this.props
    const { favorites } = this.state
    console.log('this is workout', workout)
    const favorite = favorites.filter(favorite => {
      return favorite.user.id === user.id && favorite.workout.id === workout.id
    })
    console.log('favorite', favorite)
    console.log('this is favorites', this.state.favorites)

    removeFav(user, favorite[0].id)
      .then(() => msgAlert({
        message: 'Removed from favorites!',
        variant: 'success'
      }))
      .then(() => {
        history.push('/browser')
      })
      .catch(error => msgAlert({
        message: `Oops, that didn't remove because ${error.message}`
      }))
  }

  async componentDidMount () {
    const { user, msgAlert } = this.props

    allFavs(user)
      .then(res => {
        this.setState({ favorites: res.data.favorites })
      })

    myUser(user)
      .then(res => {
        this.setState({ currentUser: res.data.user })
      })

    indexAllWorkouts(user)
      .then(res => {
        const favoriteWorkouts = res.data.workouts.filter(workout => {
          return workout.favorites.includes(user.user_name)
        })
        return favoriteWorkouts
      })
      .then(favoriteWorkouts => {
        this.setState({ workouts: favoriteWorkouts })
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
    const { workouts } = this.state

    // console.log('this is workouts', workouts)
    if (workouts.length === 0) {
      // return 'Loading...'
      workoutJsx = (
        <div style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
          <h1>Looks like you don&apos;t have any favorites yet...Go check out All Workouts to favorite some!</h1>
        </div>
      )
    }
    // console.log('workouts before map', workouts)
    workoutJsx = workouts.map(workout => (
      <Card key={workout.id}
        onClick={(event) => {
          this.handleSearchOne(workout.id, event)
        }}
        border="primary"
        className='index-bg' style={{ borderRadius: '12px', height: '250px', margin: '40px', padding: '10px', width: '250px', marginTop: '10px' }}>
        <Button className="close" style={{ alignSelf: 'flex-end', display: 'flex', height: '12px', width: '12px' }} type="button" onClick={(event) => this.removeFavorite(workout, event)}>
          X
        </Button>
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
              <Card.Img src={'https://imgur.com/BGq99v9.png'} style={{ height: '60px', width: '60px' }} alt='image of a figure running'/>
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

    return (
      <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2>Lets take a look at those workouts!</h2>
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

export default withRouter(Favorites)
