import axios from 'axios'
import { API_URL } from '../settings'
import { IMDB_API_URL } from '../settings'

const MovieService = {

  getOne(movieID) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/movies/${movieID}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getAll() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/movies`)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getAllOfUser(userID) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/users/${userID}?_embed=movies`)
        .then(response => {
          resolve(response.data.movies)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  createOne(movie) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/movies`, movie)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  updateOne(movie) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${API_URL}/movies/${movie.id}`, movie)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  loadFromIMDB(imdbID) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${IMDB_API_URL}&i=${imdbID}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  deleteOne(dataID) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${API_URL}/movies/${dataID}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  find(params) {
    return new Promise((resolve, reject) => {
      axios({
          method: 'get',
          url: `${API_URL}/movies`,
          params: params
        })
        .then(response => {
          const found = response.data
          if(found.length){
            resolve(found)
          }else{
            reject("Not found")
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }



}

export default MovieService