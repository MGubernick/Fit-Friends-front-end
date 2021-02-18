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
