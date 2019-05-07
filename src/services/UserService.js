import axios from 'axios'
import { API_URL } from '../settings'
import ServerExchangeClass from "@/services/ServerExchangeClass"

const createParamsString = (paramName, arr) => {
  return `${paramName}=` + arr.join(`&${paramName}=`)
}

class UserServiceClass extends ServerExchangeClass {

  getOneExtend(userID) {
    return this.getOneExtend(userID, {
      embed: ['friendsIn', 'friendsOut', 'friends']
    })
  }

  getOneByLogin(login) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/${this.dataName}?login=${login}&_limit=1`)
        .then(response => {
          const user = response.data.length ? response.data[0] : null
          if(user !== null){
            resolve(user)
          } else {
            reject('User is not found')
          }          
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getFriends(user) {
    return this.getUsersByIDs(user.friendIDs)
  }

  getUsersByIDs(ids) {
    return new Promise((resolve, reject) => {
      if (ids && ids.length) {
        const requestParams = createParamsString('id', ids)
        return axios.get(`${API_URL}/${this.dataName}?${requestParams}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      } else {
        resolve([])
      }
    })
  }

  getInRequests(user) {
    return this.getUsersByIDs(user.requestsIn)
  }
  getOutRequests(user) {
    return this.getUsersByIDs(user.requestsOut)
  }

  addFriend(user, friendID) {

    return new Promise((resolve, reject) => {
      this.getOne(friendID)
        .then(newFriend => {
          // update new friend's info about his friends and Outcoming requests
          newFriend.friendIDs.push(user.id)
          newFriend.requestsOut.splice(user.requestsOut.indexOf(user.id), 1)
          return this.updateOne(newFriend)
        })
        .then(newFriend => {
          user.friendIDs.push(newFriend.id)
          user.requestsIn.splice(user.requestsIn.indexOf(newFriend.id), 1)
          return this.updateOne(user)
        })
        .then(savedUser => {
          resolve(savedUser)
        })
        .catch(err => {
          reject(err)
        })
    })

  }

  sendRequest(user, sendToID) {

    return new Promise((resolve, reject) => {
      this.getOne(sendToID)
        .then(possibleFriend => {
          // update possible friend's requestsIn array
          possibleFriend.requestsIn.push(user.id)
          return this.updateOne(possibleFriend)
        })
        .then(() => {
          user.requestsOut.push(sendToID)
          return this.updateOne(user)            
        })
        // .then(savedUser => {
        //   resolve({
        //     'user': savedUser,
        //     'possibleFriend': possibleFriend
        //   })
        // })
        .then(savedUser => {
          resolve(savedUser)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  removeFriend(user, friendID) {

    return new Promise((resolve, reject) => {

      this.getOne(friendID)
        .then(friend => {
          // remove current user from friends 
          const friendIndex = friend.friendIDs.indexOf(user.id)
          friend.friendIDs.splice(friendIndex, 1)
          return this.updateOne(friend)
        })
        .then(friend => {
          // remove neccessary user from friends
          const friendIndex = user.friendIDs.indexOf(friend.id)
          user.friendIDs.splice(friendIndex, 1)
          return this.updateOne(user)
        })
        .then(savedUser => {
          resolve(savedUser)
        })
        .catch(err => {
          reject(err)
        })
    })

  }

  removeInRequest(user, friendID) {

    return new Promise((resolve, reject) => {

      this.getOne(friendID)
        .then(friend => {
          // update friend's info about his Outcoming requests
          friend.requestsOut.splice(friend.requestsOut.indexOf(user.id), 1)
          return this.updateOne(friend)
        })
        .then(() => {
          // remove friend from Incoming requests
          user.requestsIn.splice(user.requestsIn.indexOf(friendID), 1)
          return this.updateOne(user)
        })
        .then(savedUser => {
          resolve(savedUser)
        })
        .catch(err => {
          reject(err)
        })
    })

  }

  removeOutRequest(user, friendID) {

    return new Promise((resolve, reject) => {

      this.getOne(friendID)
        .then(friend => {
          // update friend's info about his Incoming requests
          friend.requestsIn.splice(friend.requestsIn.indexOf(user.id), 1)
          return this.updateOne(friend)
        })
        .then(() => {
          // remove friend from Outcoming requests
          user.requestsOut.splice(user.requestsOut.indexOf(friendID), 1)
          return this.updateOne(user)
        })
        .then(savedUser => {
          resolve(savedUser)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  isMyFriend(user, otherUserID) {
    return user.friendIDs.indexOf(parseInt(otherUserID)) >= 0
  }

}

const UserService = new UserServiceClass('users')

export default UserService