import _ from 'lodash'

export default class ErrorHandler {
  items = []

  isEmpty () {
    return (this.items.length >= 1) ? false : true
  }

  has(name) {
    let i = _.findIndex(this.items, function (f) {
      return f.name == name
    })
    return (i >= 0)
  }

  get(name) {
    let index = _.findIndex(this.items, function (f) {
      return f.name == name;
    })

    if (index >= 0) {
      return this.items[index].message
    }
  }

  remove (field) {
    let index = _.findIndex(this.items, function (f) {
      return f.name == field;
    })

    if (index > -1) {
      this.items.splice(index, 1)
    }
  }

  clear () {
    this.items = []
  }
}


