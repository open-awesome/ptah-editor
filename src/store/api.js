import axios from 'axios'

export default {
  // send any api request
  request ({ url, params, method, headers }) {
    let requset = {
      url: `${process.env.VUE_APP_API}${url}`,
      method: method || 'post'
    }

    method === 'get' ? requset.params = params : requset.data = params

    if (headers !== undefined) requset.headers = headers

    return axios(requset)
      .then(response => {
        return response.data
      })
  },

  /**
   * upload image to gamenet cdn
   * @param request FormData
   * @returns {Promise.<TResult>|Promise<any>}
   */
  uploadFile (request) {
    return axios.post('//images.stg.gamenet.ru/restapi', request)
      .then(function (response) {
        if (!response.hasOwnProperty('data') || !response['data'].hasOwnProperty('response') ||
          !response['data']['response'].hasOwnProperty('data') ||
          !Array.isArray(response['data']['response']['data'])) {
          return
        }

        return response['data']['response']['data'][0]
      })
  },

  /**
   * Uploads a file by event from input-file
   *
   * @param {Event} event native dom-event
   */
  uploadFileFromInputFile (event) {
    let file = event.target.files || event.dataTransfer.files

    if (!file.length) {
      return
    }

    let request = new FormData()

    request.append('file[]', file[0])
    request.append('method', 'storefront.upload')
    request.append('format', 'json')

    return this.uploadFile(request)
  },

  uploadFileByFile (file) {
    let request = new FormData()

    request.append('file[]', file)
    request.append('method', 'storefront.upload')
    request.append('format', 'json')

    return this.uploadFile(request)
  }

}
