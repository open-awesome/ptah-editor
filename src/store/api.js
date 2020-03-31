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
      .catch(err => {
        console.warn(err)
      })
  },

  /**
   * upload image to gamenet cdn
   * @param request FormData
   * @returns {Promise.<TResult>|Promise<any>}
   */
  uploadFile (request) {
    return axios.post(process.env.VUE_APP_S3, request)
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

    request.append('file', file[0])

    return this.uploadFile(request)
  },

  /**
   * Uploads a file after click button
   *
   * @param {Event} event native dom-event
   */
  uploadFileAfterClickButton (event) {
    let file = event.target.files || event.dataTransfer.files

    if (!file.length) {
      return
    }

    return file[0]
  },

  uploadFileByFile (file) {
    let request = new FormData()

    request.append('file', file)

    return this.uploadFile(request)
  }
}
