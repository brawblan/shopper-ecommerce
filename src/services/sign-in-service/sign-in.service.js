export class SignInService {
  static checkIfUsernameExists = (usersArr, input) => {
    return !!usersArr.filter(({ username }) => username === input).length
  }

  static checkIfPasswordExists = (usersArr, input) => {
    return !!usersArr.filter(({ password }) => password === input).length
  }

  static usernameAndPasswordMatch = (usersArr, username, password) => {
    const { value: usernameValue } = username
    const { value: passwordValue } = password
    const currentUser = usersArr.filter((user) => {
      if (user.username === usernameValue && user.password === passwordValue) {
        return user
      }
      return null
    })
    return currentUser
  }

  static getUser = (usersArr, username) => {
    return usersArr.filter((user) => {
      console.log(user.username, username)
      return user.username === username
    })
  }
}
