export function getCookie(name) {
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  var arr = document.cookie.match(reg)
  if (arr) {
    return (arr[2])
  } else {
    return null
  }
}
export function setCookie (uid, uname) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  document.cookie = uid + '=' + uname
}
