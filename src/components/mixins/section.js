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
            if (newProps[key][style] !== oldProps[key][style]) {
              props[nameObj][key][style] = newProps[key][style]
            }
          }
        } else {
          if (key !== 'classes') {
            if (JSON.stringify(newProps[key]) !== JSON.stringify(oldProps[key])) {
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
      let data = { components: [] }
      let ms = {}
      let mainStyle = $sectionData.mainStyle !== undefined ? $sectionData.mainStyle : {}
      let components = $sectionData.components !== undefined ? $sectionData.components : []
      let temp = $sectionData.temp || {}

      // check changes components in section
      components.forEach(function (item, i, arr) {
        let change = {}
        let tempEl = _.filter(temp.components, function (el, i) {
          return item.key === el.key
        })
        if (tempEl[0] !== undefined && tempEl[0].element !== undefined) {
          change = self.checkSectionProps(components[i].element, tempEl[0].element, 'element')
          change['key'] = tempEl[0].key
        }
        data.components.push(change)
      })

      // get change props of section styles
      ms = self.checkSectionProps(mainStyle, temp.mainStyle, 'mainStyle')
      _.merge(data, ms)
      //

      this.updateDataStore(data, $sectionData)
    }),

    groupDataMerge (groupData, sectionData, $sectionData) {
      if (groupData) {
        _.merge($sectionData.mainStyle, groupData.mainStyle)
        $sectionData.mainStyle.classes = groupData.mainStyle.classes

        // restore data of components of store groupData
        $sectionData.components.forEach(function (item, i, arr) {
          let tempEl = groupData.components.filter(function (el, i) {
            return item.key === el.key
          })
          if (tempEl[0]) _.merge(item, tempEl[0])
        })
      }
    },

    checkDataAboutRestoreAfterSave ($sectionData, schemaCustom) {
      let self = this
      let data = { components: [] }
      let ms = {}

      $sectionData.components.forEach(function (item, i, arr) {
        let change = {}
        let tempEl = _.filter(schemaCustom.components, function (el, i) {
          return item.key === el.key
        })
        if (tempEl[0] !== undefined && tempEl[0].element !== undefined) {
          change = self.checkSectionProps($sectionData.components[i].element, tempEl[0].element, 'element')
          change['key'] = tempEl[0].key
        }
        data.components.push(change)
      })

      // get change props of section styles
      ms = self.checkSectionProps($sectionData.mainStyle, schemaCustom.mainStyle, 'mainStyle')
      _.merge(data, ms)
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

      if (sectionDataStore !== undefined && sectionDataStore.edited !== undefined) {
        $sectionData.edited = sectionData.edited
      }

      // set section data
      if ($sectionData.edited === undefined) {
        // merge default section data and restore data
        $sectionData.temp = _.merge({}, sectionData)
        Seeder.seed(_.merge($sectionData, sectionData))
        this.groupDataMerge(groupDataStore, sectionDataStore, $sectionData)
      } else if (sectionDataStore) {
        _.merge($sectionData.mainStyle, sectionDataStore.mainStyle)

        // restore data of components of store sectionData
        sectionDataStore.components.forEach(function (item, i, arr) {
          let tempEl = _.filter($sectionData.components, function (el, i) {
            return item.key === el.key
          })
          if (tempEl[0]) {
            _.merge(tempEl[0], item)
          } else {
            $sectionData.components.push(item)
          }
        })

        // checking for component availability in section data
        $sectionData.components.forEach(function (item, i, arr) {
          let tempEl = _.filter(sectionDataStore.components, function (el, i) {
            return item.key === el.key
          })
          if (tempEl[0] === undefined) {
            arr.splice(i, 1)
          }
        })

        // restore sort of components
        let orderObj = sectionDataStore.components.reduce(function (a, c, i) {
          if (c['key'] !== undefined) a[c.key] = i
          return a
        }, {})
        $sectionData.components.sort(function (l, r) {
          return orderObj[l.key] - orderObj[r.key]
        })

        // merge group data in section data
        this.groupDataMerge(groupDataStore, sectionDataStore, $sectionData)
        $sectionData.temp = _.merge({}, $sectionData)
      } else {
        this.checkDataAboutRestoreAfterSave($sectionData, this.schemaCustom)
        $sectionData.temp = _.merge({}, $sectionData)
      }
    }

  },

  updated () {
    this.storeData(this)
  }

}
