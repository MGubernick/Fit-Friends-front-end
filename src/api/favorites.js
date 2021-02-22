import apiUrl from '../apiConfig'
import axios from 'axios'

// find my user
export const myUser = async (user) => {
  return axios({
    url: apiUrl + '/one-user/' + user.id,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

// add a favorite to user
export const addFav = (workout, currentUser, user) => {
  // console.log('this is workout.id', workout.id)
  // console.log('this is user.user.id', currentUser.user.id)
  return axios({
    url: apiUrl + '/favorites',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      favorite: {
        workout_id: workout.id,
        user_id: currentUser.user.id
      }
    }
  })
}

// remove a favorite
export const removeFav = (user, favId) => {
  return axios({
    url: apiUrl + '/favorites/' + favId,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

// get all Favorites
export const allFavs = async (user) => {
  return axios({
    url: apiUrl + '/favorites',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
