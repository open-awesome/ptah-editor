import { mapActions } from 'vuex'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import Draggable from 'vuedraggable'

export default {
  components: {
    Draggable
  },
  $schema: {
    groupDataStore: {},
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
      }
      return props
    },

    storeData: _.after(2, function (self) {
      let $sectionData = self.$sectionData
      let data = {}
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
            data[keyObj].push(change)
          })
        } else if (keyObj.indexOf('mainStyle') !== -1 || keyObj.indexOf('container') !== -1) {
          //
          let tempKeyObj = {}
          tempKeyObj = $sectionData[keyObj] !== undefined ? tempKeyObj[keyObj] = $sectionData[keyObj] : {}
          let mainStyle = tempKeyObj
          ms = self.checkSectionProps(mainStyle, temp[keyObj], keyObj)
          _.merge(data, ms)
          data['edited'] = true
        }
      }
      console.log(data)
      this.updateDataStore(data, $sectionData)
    }),

    groupDataMerge (groupData, sectionData, $sectionData) {
      if (groupData) {
        for (let keyObj in $sectionData) {
          if (keyObj.indexOf('components') !== -1) {
            //
            $sectionData[keyObj].forEach(function (item, i, arr) {
              let tempEl = groupData[keyObj].filter(function (el, i) {
                return item.key === el.key
              })
              if (tempEl[0]) _.merge(item, tempEl[0])
            })
          } else if (keyObj.indexOf('mainStyle') !== -1 || keyObj.indexOf('container') !== -1) {
            //
            _.merge($sectionData[keyObj], groupData[keyObj])
            $sectionData[keyObj].classes = groupData[keyObj].classes
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
            }
            data[keyObj].push(change)
          })
        } else if (keyObj.indexOf('mainStyle') !== -1 || keyObj.indexOf('container') !== -1) {
          //
          ms = self.checkSectionProps($sectionData[keyObj], schemaCustom[keyObj], keyObj)
          console.log(ms)
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
        $sectionData.temp = _.merge({}, this.schemaCustom)
        this.groupDataMerge(groupDataStore, sectionDataStore, $sectionData)
        console.log(1)
      } else if (sectionDataStore) {
        //
        for (let keyObj in $sectionData) {
          if (keyObj.indexOf('components') !== -1) {
            //
            sectionDataStore[keyObj].forEach(function (item, i, arr) {
              let tempEl = _.filter($sectionData[keyObj], function (el, i) {
                return item.key === el.key
              })
              if (tempEl[0]) {
                _.merge(tempEl[0], item)
              } else {
                $sectionData[keyObj].push(item)
              }
            })

            // checking for component availability in section data
            $sectionData[keyObj].forEach(function (item, i, arr) {
              let tempEl = _.filter(sectionDataStore[keyObj], function (el, i) {
                return item.key === el.key
              })
              if (tempEl[0] === undefined) {
                arr.splice(i, 1)
              }
            })

            // restore sort of components
            let orderObj = sectionDataStore[keyObj].reduce(function (a, c, i) {
              if (c['key'] !== undefined) a[c.key] = i
              return a
            }, {})
            $sectionData[keyObj].sort(function (l, r) {
              return orderObj[l.key] - orderObj[r.key]
            })
          } else if (keyObj.indexOf('mainStyle') !== -1 || keyObj.indexOf('container') !== -1) {
            //
            _.merge($sectionData[keyObj], sectionDataStore[keyObj])
          }
        }
        // merge group data in section data
        console.log(2)
        this.groupDataMerge(groupDataStore, sectionDataStore, $sectionData)
        $sectionData.temp = _.merge({}, $sectionData)
      } else {
        console.log(3)
        this.checkDataAboutRestoreAfterSave($sectionData, this.schemaCustom)
        $sectionData.temp = _.merge({}, $sectionData)
      }
    }

  },

  updated () {
    this.storeData(this)
  }

}
