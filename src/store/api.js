/**
 * Mock for API
 */
import axios from 'axios'

export default {
  getLandingsList () {
    return new Promise((resolve) => {
      resolve([
        {
          slug: 'Hero',
          theme: {
            name: 'Hero',
            sections: ['HeroUnit']
          }
        },
        {
          slug: 'Columns',
          theme: {
            name: 'Columns',
            sections: ['ThreeColumns', 'TwoColumns']
          }
        },
        {
          slug: 'Products',
          theme: {
            name: 'Products',
            sections: ['Products', 'ProductsExtend']
          }
        },
        {
          slug: 'System',
          theme: {
            name: 'System',
            sections: ['System']
          }
        }
      ])
    })
  },

  saveLanding (slug, data) {
    return new Promise((resolve) => {
      localStorage.removeItem(slug)
      localStorage.setItem(slug, data)
      resolve(true)
    })
  },

  getLanding (slug) {
    return new Promise((resolve) => {
      let landing = {}

      if (localStorage.getItem(slug) !== null) {
        landing = localStorage.getItem(slug)
        resolve(JSON.parse(landing))
      } else {
        return this.getLandingsList().then((data) => {
          resolve(data.filter(item => item.slug === slug)[0])
        })
      }
    })
  },

  /**
   * upload image to gamenet cdn
   * @param request FormData
   * @returns {Promise.<TResult>|Promise<any>}
   */
  uploadFile (request) {
    return axios.post('http://images.stg.gamenet.ru/restapi', request)
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
  }

}
