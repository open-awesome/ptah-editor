/**
 * Data layer that makes request to Google Script API,
 * reads the localization data from spreadsheet
 * and returns an array with locales values
 */

'use strict'

let fs = require('fs'),
    request = require('request')

module.exports = (function () {
  // public API for data access.
  // Dedicated Google Application for serving this requests.
  const localeUrl = 'https://script.google.com/macros/s/AKfycbxBeuIpJ2vzejPGeiX57rvipIqfDeu1rIei5jf5jt0cBtJCZXbI/exec'

  let makeRequest = function (callback) {
    request(localeUrl, function (error, response, body) {
      if (error || !body) {
        throw new Error('Google API request error: ', error)
      }

      callback(body)
    })
  }

  let getLocales = function (callback) {
    makeRequest(callback)
  }

  return {
    getLocales: getLocales
  }
})()
