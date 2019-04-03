import axios from 'axios'

const AuthService = {

  logIn(user) {
    return new Promise((resolve, reject) => {

      axios
        .get('/api/users')
        .then(response => {
          let data = response.data;
          const currentUser = data.filter(userItem => {
            return userItem.login == user.login
          })[0]
          if (currentUser) {                        
            resolve(currentUser)
          } else {
            reject('Username and/or password is wrong')
          }

        })
        .catch(err => {         
          reject(err)
        })

    })
  },

  logOut() {
    return new Promise((resolve, reject) => {
      resolve()
      reject()
    })  
  }

}

export default AuthService;