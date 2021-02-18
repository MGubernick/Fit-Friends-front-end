import apiUrl from '../apiConfig'
import axios from 'axios'

// Crerate a Workout
export const createWorkout = (workout, user) => {
  return axios({
    url: apiUrl + '/workouts',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { workout: workout }
  })
}

// Index ALL Workouts
export const indexAllWorkouts = user => {
  console.log('tic indexAllWorkouts API')
  return axios({
    url: apiUrl + '/workouts',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

// Index All of My workouts
export const indexMyWorkouts = user => {
  return axios({
    url: apiUrl + '/myworkouts',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

// Show One Workout
export const showWorkout = (id, user) => {
  return axios({
    url: apiUrl + '/workouts/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

// Update A Workout
export const updateWorkout = (id, workout, user) => {
  return axios({
    url: apiUrl + '/workouts/' + id,
    method: 'PATCH',
    data: { workout: workout },
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

// Delete A Workout
export const deleteWorkout = (id, user) => {
  return axios({
    url: apiUrl + '/workouts/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
