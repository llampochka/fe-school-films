import UserService from "@/services/UserService"

const AuthService = {

  logIn(user) {
    return new Promise((resolve, reject) => {

      UserService.getOneByLogin(user.login)
        .then(user => {
          if (user) {                        
            resolve(user)
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