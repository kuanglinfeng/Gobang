function User(name) {
  this.name = name
  this.win = 0
  this.fail = 0
  this.total = this.win + this.fail
}

/**
 * 根据名字创建用户，并将用户信息写入到locaStorage
 * @param {*} name 
 */
function createUser(name) {
  var user = new User(name)
  var code = encodeUser(user)
  if (localStorage.getItem('user')) {
    localStorage.removeItem('user')
  }
  localStorage.setItem('user', code)
  return user
}

/**
 * 从localStorage中读取user信息
 */
function getUser() {
  if (localStorage.getItem('user') === null)  return null
  var code = localStorage.getItem('user')
  var user = decodeUser(code)
  return user
}

/**
 * 对localStorage的用户信息进行重新设置
 * @param {*} name 
 * @param {*} win 
 * @param {*} fail 
 */
function setUser(name, win, fail) {
  var user = getUser()
  user.name = name 
  user.win = win
  user.fail = fail
  user.total = user.win + user.fail
  var code = encodeUser(user)
  if (localStorage.getItem('user')) {
    localStorage.removeItem('user')
  }
  localStorage.setItem('user', code)
}

/**
 * 对用户胜局次数+1
 */
function addUserWin() {
  var user = getUser()
  if (user) {
    setUser(user.name, user.win + 1, user.fail)
  }
}

/**
 * 对用户负局次数-1
 */
function addUserFail() {
  var user = getUser()
  if (user) {
    setUser(user.name, user.win, user.fail + 1)
  }
}

/**
 * 将用户对象转成JSON字符串
 * @param {*} user 
 */
function encodeUser(user) {
  var code = JSON.stringify(user)
  return code
}

/**
 * 将JSON字符串转为用户对象
 * @param {*} code 
 */
function decodeUser(code) {
  var user = JSON.parse(code)
  return user
}




