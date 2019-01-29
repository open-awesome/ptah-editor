/**
 * DTL for convertation of translation files
 *
 * @example <caption>Convert JSON file to CSV table</caption>
 * result will be in ./temp/ directory
 *
 * gulp locale_to_table --locale=ru
 *
 *
 * @example <caption>Update JSON file from CSV table (without removing of old values)</caption>
 * CSV table path: ./temp/<locale>.csv (f.e.: ./temp/ru.csv)
 *
 * gulp locale_to_json --locale=ru
 *
 */

'use strict'

var fs = require('fs')
var recursive = require('recursive-readdir')
var jsonminify = require('jsonminify')
var csvConvertor = require('./csvConvertor')
var args = require('yargs').argv
var config = {
  langList: ['en', 'ru']
}

var excludedKeys = ['is']

module.exports = (function () {
  var fileDir = './src/assets/lang/'
  var tableDir = './temp/'
  var fileSuffix = '.json'
  var tableSuffix = '.csv'
  var fileVersion		= '.v' + args.buildNumber || ''

  var jsonToArray = function (json, prefix) {
    var arr = []
    var keys = Object.keys(json)

    keys.forEach(function (key) {
      var value = json[key]

      if (typeof value === 'object') {
        arr = arr.concat(jsonToArray(value, prefix + key + '.'))
      } else {
        arr.push({
          key: prefix + key,
          value: value
        })
      }
    })

    return arr
  }

  var getFilteredList = function (list, callback) {
    var fileList = []

    recursive('./sources/js', function (err, files) {
      fileList = fileList.concat(files)

      recursive('./deploy/tpl', function (err, files) {
        fileList = fileList.concat(files)

        var flagList = []
        list.forEach(function (item) {
          flagList.push({
            key: item.key,
            value: item.value,
            exist: false
          })
        })

        var text = ''
        fileList.forEach(function (file) {
          text = fs.readFileSync(file, 'utf8')
          for (var i = 0; i < flagList.length; i++) {
            if (text.indexOf(flagList[i].key) > -1) {
              flagList[i].exist = true
            }
          }
        })

        callback(flagList)
      })
    })
  }

  var fromFileToTable = function (lang, callback) {
    var filename = fileDir + lang + fileSuffix
    var data = fs.readFileSync(filename, 'utf8')

    var obj = JSON.parse(data)
    var list = jsonToArray(obj, '')

    getFilteredList(list, function (resultList) {
      var filteredCount = 0

      // build CSV row
      var filteredSrc = []
      for (var i = 0; i < resultList.length; i++) {
        if (resultList[i].exist) {
          filteredSrc.push([
            resultList[i].key,
            resultList[i].value
          ])

          filteredCount++
        }
      }

      var csv = new csvConvertor()
      csv.del = ','
      csv.enc = '"'

      var tableStr = csv.arrayToCSV(filteredSrc)

      console.log('all count: ' + list.length)
      console.log('filtered count: ' + filteredCount)

      // write CSV
      var tableFilename = tableDir + lang + tableSuffix
      fs.writeFileSync(tableFilename, tableStr, 'utf8')
      console.log('--- done')

      callback()
    })
  }

  var setNestedField = function (obj, path, value, needDecode) {
    var schema = obj // a moving reference to internal objects within obj
    var pList = path.split('.')
    var len = pList.length
    for (var i = 0; i < len - 1; i++) {
      var elem = pList[i]
      if (!schema[elem]) {
        schema[elem] = {}
      }
      schema = schema[elem]
    }

    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }

    if (needDecode) {
      value = decode(value)
    }

    schema[pList[len - 1]] = value
  }

  var decode = function (value) {
    var value = value
      .replace(/\\n/g, '\n')
      .replace(/\\'/g, "\'")
      .replace(/\\"/g, '\"')
      .replace(/\\&/g, '\&')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')

    return value
  }

  var encode = function (value) {
    var value = value
      .replace(/\n/g, '\\n')
      .replace(/\'/g, "\\'")
      .replace(/\"/g, '\\"')
      .replace(/\&/g, '\\&')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t')

    return value
  }

  var padRight = function (src, replace, count) {
    if (src.length > count) {
      return src
    }

    return src + (new Array(count - src.length + 1)).join(replace || ' ')
  }

  var getFormattedJSONStr = function (srcObj) {
    var strOffset = 4
    var valueOffset = 40
    var jsonStr = JSON.stringify(srcObj, null, strOffset)
    var jsonStrParsed = jsonStr.split(/\r\n|\n/g)

    var jsonStrFormattedArr = []
    var regex = /^(\s*\".*\":\s*)(\".*\"\,?.*)$/

    jsonStrParsed.forEach(function (str) {
      var matches = str.match(regex)
      if (!matches) {
        jsonStrFormattedArr.push(str)
        return
      }

      var part1 = matches[1],
        part2 = matches[2]

      part1 = padRight(part1, ' ', valueOffset)

      jsonStrFormattedArr.push(part1 + part2)
    })

    var jsonStrFormatted = jsonStrFormattedArr.join('\r\n')

    return jsonStrFormatted
  }

  var fromTableToFile = function (lang, callback) {
    var filename = fileDir + lang + fileSuffix
    var srcData = fs.readFileSync(filename, 'utf8')

    var obj = JSON.parse(srcData)

    var tableFilename = tableDir + lang + tableSuffix
    var tableRawData = fs.readFileSync(tableFilename, 'utf8')

    var csv = new csvConvertor()
    csv.del = ','
    csv.enc = '"'

    var tableData = csv.CSVToArray(tableRawData)

    tableData.forEach(function (cells, index) {
      var key = cells[0],
        value = cells[1]

      if (key != null && value != null) {
        key = key.trim()

        var canAdd = key != ''
                    && excludedKeys.indexOf(key.toLowerCase()) === -1

        if (canAdd) {
          setNestedField(obj, key, value, true)
        }
      } else {
        console.log(
          'Warning: key or value is null.' +
                    'index = ' + index + ', key = ' + key + ', value = ' + value)

        console.log('You should use comma-separated list in CSV.')
      }
    })

    // write locale file
    var jsonStr = getFormattedJSONStr(obj)
    fs.writeFileSync(filename, jsonStr, 'utf8')
    console.log('--- done')

    callback()
  }

  var getLocaleList = function (data) {
    var localeRow = data[0]
    var list = []

    // from 2-nd column, where locales started
    for (var i = 1; i < localeRow.length; i++) {
      list.push(localeRow[i])
    }

    return list
  }

  var rmDir = function (dirPath) {
    try { var files = fs.readdirSync(dirPath) } catch (e) { return }
    if (files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var filePath = dirPath + '/' + files[i]
        if (fs.statSync(filePath).isFile()) { fs.unlinkSync(filePath) }
      } 
    }
  }

  var fromAllLocaleDataToFiles = function (data) {
    if (!data || data.length === 0) {
      throw new Error('Incorrect JSON data format from Google App.')
    }

    var localeList = getLocaleList(data)

    console.log(localeList)

    console.log('--- remove old lang files')
    rmDir('deploy/resources/i18n')

    localeList.forEach(function (lang, index) {
      if (config.langList.indexOf(lang) === -1) { return }

      var columnIndex = index + 1,
        firstRowIndex = 1

      fromDataToFile(data, lang, firstRowIndex, columnIndex)
    })
  }

  var fromDataToFile = function (data, lang, firstRowIndex, columnIndex) {
    console.log('--- start with: ' + lang)

    firstRowIndex = firstRowIndex || 0
    // var filename = fileDir + lang + fileVersion + fileSuffix;
    var filename = fileDir + lang + fileSuffix

    console.log('--- check is exists file ' + filename)
    if (fs.existsSync(filename) === false) {
      console.log('--- file is not exists, create new file ' + filename)

      if (fs.existsSync(fileDir) === false) { fs.mkdirSync(fileDir) }

      fs.writeFileSync(filename, '{}')
    }

    var srcData = fs.readFileSync(filename, 'utf8')

    var obj = JSON.parse(srcData)

    for (var i = firstRowIndex; i < data.length; i++) {
      var key = data[i][0],
        value = data[i][columnIndex]

      if (key != null && value != null) {
        key = key.trim()

        setNestedField(obj, key, value, true)
      } else {
        console.log(
          'Warning: key or value is null.' +
                    'index = ' + index + ', key = ' + key + ', value = ' + value)
      }
    }

    // write locale file
    var jsonStr = getFormattedJSONStr(obj)
    fs.writeFileSync(filename, jsonStr, 'utf8')

    console.log('--- minify json file: ' + filename)
    jsonStr = jsonminify(jsonStr)

    console.log('--- done with: ' + lang)
  }

  return {
    fromFileToTable: fromFileToTable,
    fromTableToFile: fromTableToFile,
    fromAllLocaleDataToFiles: fromAllLocaleDataToFiles
  }
})()
