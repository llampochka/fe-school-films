import axios from 'axios'
import { API_URL } from '../settings'

// const createParamsString = (paramName, arr) => {
//   return `${paramName}=` + arr.join(`&${paramName}=`)
// }

class ServerExchangeClass {

  constructor(dataName) {
    this.dataName = dataName
  }

  getOne(dataID) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/${this.dataName}/${dataID}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getAll() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/${this.dataName}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  createOne(dataObj) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${API_URL}/${this.dataName}`, dataObj)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  updateOne(dataObj) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${API_URL}/${this.dataName}/${dataObj.id}`, dataObj)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getOneExtend(dataID, extendParams) {

    /*
      extendParams - Object, example:
      {
        embed: ['likes', 'dislikes'],
        expand: 'user'
      }
    */

    const params = []

    if (extendParams && extendParams.embed) {
      params.push(`_embed=${extendParams.embed.join('&_embed=')}`)
    }
    if (extendParams && extendParams.expand) {
      params.push(`_expand=${extendParams.expand}`)
    }

    const paramStr = params.join('&')

    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/${this.dataName}/${dataID}?${paramStr}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  deleteOne(dataID) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${API_URL}/${this.dataName}/${dataID}`)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

}

export default ServerExchangeClass