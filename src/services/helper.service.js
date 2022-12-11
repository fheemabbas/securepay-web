import moment from 'moment'

import { get } from 'lodash'
import Constant from '../util/constant'

export const getReleaseTime = (timestamp) => {
  timestamp = timestamp * 1000
  let dt = new Date(timestamp)
  return `${moment(dt).format('DD MMM, YYYY')} at ${moment(dt).format(
    'hh:mm A',
  )}`
}

export const getYear = (date) => {
  return `${moment(date).format('YYYY')}`
}

export const getTimelineTime = (timestamp) => {
  timestamp = timestamp * 1000
  const dt = new Date(timestamp)
  const now = new Date().getTime()
  if (now - timestamp < 1000 * 60 * 60 * 24 * 5) {
    return moment(dt).fromNow()
  } else {
    return `${moment(dt).format('DD MMM, YYYY')} at ${moment(dt).format(
      'hh:mm A',
    )}`
  }
}

export const UID = () => {
  let array = new Uint32Array(8)
  window.crypto.getRandomValues(array)
  let str = ''
  for (let i = 0; i < array.length; i++) {
    str += (i < 2 || i > 5 ? '' : '-') + array[i].toString(16).slice(-4)
  }
  return str
}
export function setStoredData(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.log('error', error)
  }
}
export function getStoredData(key) {
  try {
    let data = localStorage.getItem(key)
    return data
  } catch (error) {
    console.log('error', error)
  }
}
export function checkedIdsArray(isChecked, id, array) {
  if (!isChecked) {
    array.splice(array.indexOf(id), 1)
  } else {
    array.push(id)
  }
  return array
}
export function confirmationMsg(manageType, type, title, modalType) {
  if (manageType === 'single') {
    return (
      'Are you sure you want to' +
      ' ' +
      type +
      ' ' +
      modalType +
      ' ' +
      title +
      '?'
    )
  } else {
    return 'Are you sure you want to' + ' ' + type + ' ' + modalType + '?'
  }
}
export function createUserEnvironment(userDict) {
  localStorage.setItem('KeyUser', JSON.stringify(userDict))
}
export function getUser() {
  return JSON.parse(localStorage.getItem('KeyUser'))
}
export function getFormDataObj(obj) {
  let formData = new FormData()
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      let element = obj[i]
      formData.append(i, element)
    }
  }
  return formData
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length <= 0
}

export function clearUser() {
  localStorage.clear()
}
export function clearStorageValue(params) {
  localStorage.removeItem(params)
}

export function isValidValue(value) {
  if (typeof value === 'undefined' || value === null || value === '') {
    return false
  }
  return true
}

export function hasProperty(object, key) {
  if (Array.isArray(object) || typeof key != 'string' || !object) {
    return false
  } else {
    return object.hasOwnProperty(key)
  }
}

export function getValueFromObject(object, key) {
  if (hasProperty(object, key)) {
    if (isValidValue(object[key])) {
      return object[key]
    }
  }
  return ''
}

export function isCheckValueAndSetParams(params, value) {
  if (typeof value === 'undefined' || value === null || value === '') {
    return ''
  }
  return params + value
}

export function getDateValueFromObject(object, key, format, additionalFlag) {
  if (hasProperty(object, key)) {
    if (isValidValue(object[key])) {
      let cDate
      if (additionalFlag) {
        cDate = object[key] * 1000
      } else {
        cDate = object[key]
      }
      return moment(new Date(cDate)).format(format)
    }
  }
  return '-'
}

export function timeConvert(num) {
  if (typeof num === 'undefined' || num === null || num === '') {
    return '-'
  }
  var hours = Math.floor(num / 60)
  var minutes = num % 60
  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  var strTime = hours + ':' + minutes + ' ' + ampm

  return strTime
}
export function contains(arr, value) {
  return arr.some((a) => a === value)
}
export function dateFormat(date, format = 'DD/MM/yyyy') {
  return date ? moment(date).format(format) : date === '-' ? '-' : ''
}
export const downloadFile = (link) => {
  fetch(link).then((response) => {
    let filename = response.url.split('/')
    response.blob().then((blob) => {
      let url = window.URL.createObjectURL(blob)
      let a = document.createElement('a')
      a.href = url
      a.download = filename[filename.length - 1]
      a.click()
    })
  })
}
export const getTrainingDay = (Day) => {
  switch (Day) {
    case 1:
      return Constant.TRAINING_DAYS.TRAINING_DAY
      break
    case 2:
      return Constant.TRAINING_DAYS.NON_TRAINING_DAY
      break
    case 3:
      return Constant.TRAINING_DAYS.HIGH_DAY
      break
    case 4:
      return Constant.TRAINING_DAYS.TRAINING_OR_NON_TRAINING_DAY
      break
    case 5:
      return Constant.TRAINING_DAYS.TRAINING_OR_HIGH_DAY
      break
    default:
      break
  }
}
export function autoLogout() {
  localStorage.clear()
  window.history.back()
}
export function minuteToConvertSecond(date) {
  const formatedTime = moment(date).format('hh:mm a')
  const timePart = formatedTime.split(' ')
  var hours = timePart[0].split(':')[0]
  const minutes = timePart[0].split(':')[1]
  const amPm = timePart[1]
  const isAM = amPm == 'am'
  hours = isAM ? (hours > 11 ? '00' : hours) : hours
  const addHours = isAM ? 0 : 12
  var number = (parseInt(hours) + addHours) * 60
  number += parseInt(minutes)
  return number
}
export function getRoundedValues(num) {
  if (num % 1 > 0.5) {
    return Math.ceil(num)
  } else {
    return Math.floor(num)
  }
}
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export function getMonth(num) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return months[num - 1]
}
