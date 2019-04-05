import axios from 'axios'
import {API_URL} from '../settings'

const UserService = {

  getOne(userID) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/users/${userID}`)
        .then(response => {                          
          resolve(response.data)         
        })
        .catch(err => {         
          reject(err)
        })
    })  
  },

  getOneByLogin(login) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/users?login=${login}&_limit=1`)
        .then(response => { 
          const user = response.data.length ? response.data[0] : null                         
          resolve(user)         
        })
        .catch(err => {         
          reject(err)
        })
    })  
  },


  saveOne(user) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${API_URL}/users/${user.id}`, user)
        .then(response => {                      
          resolve(response.data)         
        })
        .catch(err => {         
          reject(err)
        })
    })  
  }

}

export default UserService;