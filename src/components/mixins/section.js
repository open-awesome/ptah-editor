/**
 * Switching layout sections
 * save/recovery in/from state Landing
 * after change layout of section
 *
 * The basic elements in the slots of the sections have unique indexes 'key'
 * for restoring/saving state data
 */

import { mapActions } from 'vuex'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import Draggable from 'vuedraggable'
import { StyleObject } from '@editor/types'

export default {
  components: {
    Draggable
  },
  $schema: {
    temp: {},
    groupName: '',
    sectionName: '',
    schemaCustom: ''
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },

  watch: {
    '$sectionData': {
      handler () {
        this.storeData(this)
      },
      deep: true
    }
  },

  methods: {
    ...mapActions('Landing', [
      'updateGroupData',
      'updateSectionData',
      'saveState'
    ]),

    // check there is data for the section in the state
    canRestore () {
      return this.$store.state.Landing.groups.indexOf(this.groupName) === -1 && !!this.$store.state.Landing.sectionData[this.sectionName]
    },

    // search for modified parameters after change
    checkSectionProps (newProps, oldProps, nameObj) {
      let props = {}
      props[nameObj] = {}

      if (oldProps === undefined) {
        return
      }

      for (let key in oldProps) {
        if (key === 'styles') {
          props[nameObj][key] = {}
          for (let style in newProps[key]) {
            if (oldProps[key] !== undefined && newProps[key][style] !== oldProps[key][style]) {
              props[nameObj][key][style] = newProps[key][style]
            }
          }
        } else if (newProps[key] !== undefined) {
          if (Array.isArray(newProps[key])) {
            props[nameObj][key] = []
            props[nameObj][key] = newProps[key]
          }
          if (typeof newProps[key] === 'object' && oldProps[key] !== undefined) {
            props[nameObj][key] = {}
            _.merge(props[nameObj][key], newProps[key])
          }
          if (typeof newProps[key] === 'string' && oldProps[key] !== undefined && (newProps[key] !== oldProps[key])) {
            props[nameObj][key] = ''
            props[nameObj][key] = newProps[key]
          }
        }

        if (typeof props[nameObj][key] === 'object' && _.isEmpty(props[nameObj][key])) delete props[nameObj][key]
      }
      // return object with modified parameters
      return props
    },

    storeData: function (self) {
      let $sectionData = self.$sectionData
      let data = { components: [] } // new data for save in state
      let ms = {}
      let temp = $sectionData.temp || {} // section data after create component

      for (let keyObj in $sectionData) {
        // components list
        if (keyObj.indexOf('components') !== -1) {
          data[keyObj] = []
          $sectionData[keyObj].forEach(function (item, i, arr) {
            let change = {}
            let tempEl = _.filter(temp[keyObj], function (el, i) {
              return item.key === el.key
            })
            if (tempEl[0] !== undefined && tempEl[0].element !== undefined) {
              change = self.checkSectionProps(item.element, tempEl[0].element, 'element')
              change['key'] = tempEl[0].key
            }
            data['components'].push(change)
          })
        } else if (keyObj.indexOf('mainStyle') !== -1) {
          //
          let tempKeyObj = {}
          let mainStyle = {}
          tempKeyObj = $sectionData[keyObj] !== undefined ? tempKeyObj[keyObj] = $sectionData[keyObj] : {}
          mainStyle = tempKeyObj

          ms = self.checkSectionProps(mainStyle, temp[keyObj], keyObj)
          _.merge(data, ms)
          data['edited'] = true
        }
      }
      this.updateDataStore(data, $sectionData)
    },

    groupDataMerge (groupDataStore, $sectionData) {
      if (groupDataStore) {
        for (let keyObj in $sectionData) {
          if (keyObj.indexOf('components') !== -1) {
            //
            $sectionData[keyObj].forEach(function (item) {
              let groupDataStoreEl = groupDataStore['components'].filter(function (el) {
                return item.key === el.key
              })
              if (groupDataStoreEl[0]) {
                let itemEl = item.element
                let el = groupDataStoreEl[0].element
                for (let key in itemEl) {
                  if (el[key] !== undefined) {
                    if (typeof el[key] === 'object' && _.isEmpty(el[key]) !== true) {
                      _.merge(itemEl[key], el[key])
                    } else {
                      itemEl[key] = el[key]
                    }
                  }
                }
              }
            })
          } else if (keyObj.indexOf('mainStyle') !== -1) {
            //
            for (let key in $sectionData[keyObj]) {
              if (groupDataStore[keyObj] !== undefined && groupDataStore[keyObj][key] !== undefined) {
                if (typeof groupDataStore[keyObj][key] === 'object' && _.isEmpty(groupDataStore[keyObj][key]) !== true) {
                  _.merge($sectionData[keyObj][key], groupDataStore[keyObj][key])
                } else {
                  if (_.isEmpty(groupDataStore[keyObj][key]) !== true) {
                    $sectionData[keyObj][key] = groupDataStore[keyObj][key]
                  }
                }
              }
            }
          }
        }
      }
    },

    checkDataAboutRestoreAfterSave ($sectionData, schemaCustom) {
      let self = this
      let data = { components: [] } // new data for save in state
      let ms = {}

      for (let keyObj in $sectionData) {
        if (keyObj.indexOf('components') !== -1) {
          //
          $sectionData[keyObj].forEach(function (item, i, arr) {
            let change = {}
            let tempEl = _.filter(schemaCustom[keyObj], function (el, i) {
              return item.key === el.key
            })
            if (tempEl[0] !== undefined && tempEl[0].element !== undefined) {
              change = self.checkSectionProps($sectionData[keyObj][i].element, tempEl[0].element, 'element')
              change['key'] = tempEl[0].key
            } else {
              change = item
            }
            data['components'].push(change)
          })
        } else if (keyObj.indexOf('mainStyle') !== -1) {
          //
          ms = self.checkSectionProps($sectionData[keyObj], schemaCustom[keyObj], keyObj)
          _.merge(data, ms)
          data['edited'] = true
        }
      }
      this.updateDataStore(data)
    },

    updateDataStore (data, $sectionData) {
      this.updateGroupData({ name: this.groupName, data })
      this.updateSectionData({
        name: this.sectionName,
        data: _.cloneDeep($sectionData)
      })

      /*
       * AutoSave landing after editing section
       */
      let newState = this.$builder.export('JSON')
      this.saveState(newState)
    },

    checkComponentInSectionStore ($sectionData, sectionDataStore, keyObj) {
      sectionDataStore[keyObj].forEach(function (item) {
        let $sectionDataEl = _.filter($sectionData[keyObj], function (el) {
          return item.key === el.key
        })
        if ($sectionDataEl[0]) {
          let itemEl = $sectionDataEl[0].element
          let el = item.element
          for (let key in itemEl) {
            if (el[key] !== undefined) {
              if (typeof el[key] === 'object' && _.isEmpty(el[key]) !== true) {
                _.merge(itemEl[key], el[key])
              } else {
                itemEl[key] = el[key]
              }
            }
          }
        }
      })
    },

    restoreAddedComponentFromSectionStore ($sectionData, sectionDataStore, keyObj) {
      sectionDataStore[keyObj].forEach(function (item) {
        let $sectionDataEl = _.filter($sectionData[keyObj], function (el) {
          return item.key === el.key
        })
        if (!$sectionDataEl[0]) {
          $sectionData[keyObj].push(item)
        }
      })
    },

    checkComponentInSectionData ($sectionData, sectionDataStore, keyObj) {
      $sectionData[keyObj].forEach(function (item, i) {
        let sectionDataStoreEl = _.filter(sectionDataStore[keyObj], function (el) {
          return item.key === el.key
        })
        if (sectionDataStoreEl[0] === undefined) {
          $sectionData[keyObj].splice(i, 1)
        }
      })
    },

    restoreSortComponent ($sectionData, sectionDataStore, keyObj) {
      let orderObj = sectionDataStore[keyObj].reduce(function (a, c, i) {
        if (c['key'] !== undefined) a[c.key] = i
        return a
      }, {})
      $sectionData[keyObj].sort(function (l, r) {
        return orderObj[l.key] - orderObj[r.key]
      })
    },

    /**
     * Creating a section and filling it with data from the state or default
     *
     * @param {Object} groupDataStore
     * @param {Object} sectionDataStore
     * @param {Object} sectionData
     * @param {String} groupName - name group of sections
     * @param {String} sectionName - name section
     * @param {Object} schemaCustom - default props section (styles and texts)
     */
    createdSection (groupDataStore, sectionDataStore, sectionData, $sectionData, groupName, sectionName, schemaCustom) {
      this.groupName = groupName
      this.sectionName = sectionName
      this.schemaCustom = schemaCustom

      if (sectionDataStore !== undefined && sectionDataStore.edited) {
        $sectionData.edited = sectionData.edited
      }

      // set section data
      if ($sectionData.edited === undefined) {
        // merge default section data and restore data
        Seeder.seed(_.merge($sectionData, sectionData))
        // save temporary data to control changes in section
        $sectionData.temp = _.merge({}, $sectionData)
        // merge group data from store in section data
        this.groupDataMerge(groupDataStore, $sectionData)
      } else if (sectionDataStore) {
        //  merge section data from store in section data
        let groupStore = _.merge({}, groupDataStore)
        for (let keyObj in $sectionData) {
          if (keyObj.indexOf('components') !== -1) {
            // checking for component availability in section data
            this.checkComponentInSectionData($sectionData, sectionDataStore, keyObj)
            //  checking for component availability in section store
            this.checkComponentInSectionStore($sectionData, sectionDataStore, keyObj)
            this.restoreAddedComponentFromSectionStore($sectionData, sectionDataStore, keyObj)
            // restore sort of components
            this.restoreSortComponent($sectionData, sectionDataStore, keyObj)
          } else if (keyObj.indexOf('mainStyle') !== -1) {
            // merge section properties
            _.merge($sectionData[keyObj], sectionDataStore[keyObj])
          }
        }
        // merge group data in section data
        this.groupDataMerge(groupStore, $sectionData)
        // save temporary data to control changes in section
        $sectionData.temp = _.merge({}, $sectionData, this.schemaCustom)
      } else {
        let data = _.merge({}, Seeder.seed({ 'mainStyle': StyleObject }), this.schemaCustom)
        this.checkDataAboutRestoreAfterSave($sectionData, data)
        // save temporary data to control changes in section
        $sectionData.temp = _.merge({}, $sectionData, this.schemaCustom)
      }
    }

  }

}
