import _ from 'lodash'

class Utils {
  constructor () {
    this.$_ = _
  }
  str_split(string, splitLength) {

    if (splitLength === null) {
      splitLength = 1
    }
    if (string === null || splitLength < 1) {
      return false
    }
    string += ''
    var chunks = []
    var pos = 0
    var len = string.length
    while (pos < len) {
      chunks.push(string.slice(pos, pos += splitLength))
    }
    return chunks
  }

  strip_tags (input) {
    return this.$_.trim(
      this.$_.replace(
        input.replace(/<\/?[^>]+(>|$|)/g, ""), /\r?\n|\r/g, '')
    )
  }

  pull_starting_num (input) {
    return _.trim(_.replace(input, /^\d+/, ''))
  }

  key_exist (arr, key) {
    if (arr[key] !== void 0) {
      return true
    } else {
      return false
    }
  }

  find_all_paragraph_number (arr) {
    let output = []
    arr.forEach((val, index) => {
      output.push(val.paragraph_number)
    })

    return output
  }

  hasData (context) {
    let  data = context.$store.getters.getRawData

    return (
      data.xml !== undefined && data.metadata !== undefined 
      && data.range.start >= 1 && data.range.end >= 1
    ) ? true : false
  }
}

export default new Utils()