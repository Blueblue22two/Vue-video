/**
 * Created by Laughing on 2018/3/13.
 */
export function saveToLocal(key, value) {
  let listImg = window.sessionStorage.__listImg__

  if (!listImg) {
    listImg = {}
  } else {
    listImg = JSON.parse(listImg)
    if (!listImg) {
      listImg = {}
    }
  }

  listImg[key] = value
  window.sessionStorage.__listImg__ = JSON.stringify(listImg)
}
export function loadFromLocal() {
  let listImg = window.sessionStorage.__listImg__
  if (!listImg) {
    return
  }
  listImg = JSON.parse(listImg)
  return listImg
}
export function saveToLocal250(key, value) {
  let listImg = window.sessionStorage.__top250__

  if (!listImg) {
    listImg = {}
  } else {
    listImg = JSON.parse(listImg)
    if (!listImg) {
      listImg = {}
    }
  }

  listImg[key] = value
  window.sessionStorage.__top250__ = JSON.stringify(listImg)
}
export function loadFromLocal250() {
  let listImg = window.sessionStorage.__top250__
  if (!listImg) {
    return
  }
  listImg = JSON.parse(listImg)
  return listImg
}
