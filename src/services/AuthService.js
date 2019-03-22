let loggedIn = false;

export default class AuthService {
  isLoggedIn() {
    return loggedIn;
  }

  login() {
    loggedIn = true;
  }

  logout() {
    loggedIn = false;
  }
}