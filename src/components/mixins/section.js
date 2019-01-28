import { mapActions } from 'vuex'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import Draggable from 'vuedraggable'

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
  methods: {
    ...mapActions('Landing', [
      'updateGroupData',
      'updateSectionData'
    ]),

    canRestore () {
      return this.$store.state.Landing.groups.indexOf(this.groupName) === -1 && !!this.$store.state.Landing.sectionData[this.sectionName]
    },

    checkSectionProps (newProps, oldProps, nameObj) {
      let props = {}
      props[nameObj] = {}

      for (let key in newProps) {
        if (key === 'styles') {
          props[nameObj][key] = {}
          for (let style in newProps[key]) {
            if (oldProps[key] !== undefined && newProps[key][style] !== oldProps[key][style]) {
              props[nameObj][key][style] = newProps[key][style]
            }
          }
        } else {
          if (key !== 'classes') {
            if (oldProps[key] !== undefined && JSON.stringify(newProps[key]) !== JSON.stringify(oldProps[key])) {
              props[nameObj][key] = newProps[key]
            }
          } else {
            props[nameObj][key] = newProps[key]
          }
        }

        if (typeof props[nameObj][key] === 'object' && _.isEmpty(props[nameObj][key])) delete props[nameObj][key]
      }
      return props
    },

    storeData: _.after(2, function (self) {
      let $sectionData = self.$sectionData
      let data = { components: [] }
      let ms = {}
      // let components = $sectionData.components !== undefined ? $sectionData.components : []
      let temp = $sectionData.temp || {}

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
        } else if (keyObj.indexOf('mainStyle') !== -1 || keyObj.indexOf('container') !== -1) {
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
    }),

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
                let el = groupDataStoreEl[0].element
                let itemEl = item.element
                for (let key in itemEl) {
                  if (el[key] !== undefined) {
                    if (Array.isArray(el[key])) {
                      itemEl[key] = el[key]
                    } else if (typeof el[key] === 'object' && _.isEmpty(el[key]) !== true) {
                      _.merge(itemEl[key], el[key])
                    } else if (el[key] !== '') {
                      itemEl[key] = el[key]
                    }
                  }
                }
              }
            })
          } else if (keyObj.indexOf('mainStyle') !== -1 || keyObj.indexOf('container') !== -1) {
            for (let key in $sectionData[keyObj]) {
              if (groupDataStore[keyObj] !== undefined && groupDataStore[keyObj][key] !== undefined) {
                if (Array.isArray(groupDataStore[keyObj][key]) && groupDataStore[keyObj][key].length > 0) {
                  $sectionData[keyObj][key] = groupDataStore[keyObj][key]
                } else if (typeof groupDataStore[keyObj][key] === 'object' && _.isEmpty(groupDataStore[keyObj][key]) !== true) {
                  _.merge($sectionData[keyObj][key], groupDataStore[keyObj][key])
                }
              }
            }
          }
        }
      }
    },

    checkDataAboutRestoreAfterSave ($sectionData, schemaCustom) {
      let self = this
      let data = {}
      let ms = {}

      for (let keyObj in $sectionData) {
        if (keyObj.indexOf('components') !== -1) {
          //
          data[keyObj] = []
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
            data[keyObj].push(change)
          })
        } else if (keyObj.indexOf('mainStyle') !== -1 || keyObj.indexOf('container') !== -1) {
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
    },

    createdSection (groupDataStore, sectionDataStore, sectionData, $sectionData, GROUP_NAME, SECTION_NAME, SCHEMA_CUSTOM) {
      this.groupName = GROUP_NAME
      this.sectionName = SECTION_NAME
      this.schemaCustom = SCHEMA_CUSTOM

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
        //
      } else if (sectionDataStore) {
        //  merge section data from store in section data
        for (let keyObj in $sectionData) {
          if (keyObj.indexOf('components') !== -1) {
            //  checking for component availability in section store
            $sectionData[keyObj].forEach(function (item) {
              let sectionDataStoreEl = _.filter(sectionDataStore['components'], function (el) {
                return item.key === el.key
              })
              if (sectionDataStoreEl[0]) {
                let el = sectionDataStoreEl[0].element
                let itemEl = item.element
                for (let key in itemEl) {
                  if (el[key] !== undefined) {
                    if (Array.isArray(el[key])) {
                      itemEl[key] = el[key]
                    } else if (typeof el[key] === 'object' && _.isEmpty(el[key]) !== true) {
                      _.merge(itemEl[key], el[key])
                    } else if (el[key] !== '') {
                      itemEl[key] = el[key]
                    }
                  }
                }
              } else {
                $sectionData[keyObj].push(item)
              }
            })

            // checking for component availability in section data
            $sectionData[keyObj].forEach(function (item, i) {
              let sectionDataStoreEl = _.filter(sectionDataStore['components'], function (el) {
                return item.key === el.key
              })
              if (sectionDataStoreEl[0] === undefined) {
                $sectionData[keyObj].splice(i, 1)
              }
            })

            // restore sort of components
            let orderObj = sectionDataStore['components'].reduce(function (a, c, i) {
              if (c['key'] !== undefined) a[c.key] = i
              return a
            }, {})
            $sectionData[keyObj].sort(function (l, r) {
              return orderObj[l.key] - orderObj[r.key]
            })
          } else if (keyObj.indexOf('mainStyle') !== -1 || keyObj.indexOf('container') !== -1) {
            // merge section properties
            _.merge($sectionData[keyObj], sectionDataStore[keyObj])
          }
        }
        // merge group data in section data
        this.groupDataMerge(groupDataStore, $sectionData)
        // save temporary data to control changes in section
        $sectionData.temp = _.merge({}, $sectionData, this.schemaCustom)
      } else {
        this.checkDataAboutRestoreAfterSave($sectionData, this.schemaCustom)
        // save temporary data to control changes in section
        $sectionData.temp = _.merge({}, $sectionData, this.schemaCustom)
      }
    }

  },

  updated () {
    this.storeData(this)
  }

}
