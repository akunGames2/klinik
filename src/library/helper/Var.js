const Var = {
  toString(any, def) {
    if (!def) {
      def = ''
    }
    if (typeof any === 'string') {
      return any
    }
    if (typeof any === 'number') {
      return String(any)
    }
    if (typeof any === 'object' && any != null) {
      return any.toString()
    }
    return def
  },

  toInt(any, def) {
    if (!def) {
      def = 0
    }
    if (typeof any === 'number') {
      return any
    }
    if (typeof any === 'string') {
      const p = parseInt(any) // eslint-disable-line radix

      return Number.isNaN(p) ? def : p
    }
    return def
  },

  toFloat(any, def) {
    if (!def) {
      def = 0.0
    }
    if (typeof any === 'number') {
      return any
    }
    if (typeof any === 'string') {
      const p = parseFloat(any)

      return Number.isNaN(p) ? def : p
    }
    return def
  },

  toBoolean(any, def) {
    if (!def) {
      def = false
    }
    if (typeof any === 'boolean') {
      return any
    }
    if (typeof any === 'string') {
      return any.toLowerCase() === 'true'
    }
    return def
  },

  toObject(any, def) {
    if (!(def instanceof Object)) {
      def = {}
    }
    if (any instanceof Object) {
      return any
    }
    return def
  },

  toList(any, def) {
    if (!(def instanceof Array)) {
      def = []
    }
    if (any instanceof Array) {
      return any
    }
    return def
  },

  getFirstArray(any, def) {
    if (!(def instanceof Array)) {
      def = []
    }
    if (any instanceof Array) {
      return any[0]
    }
    return def
  },

  getIgnoreBound(arr, index, def) {
    if (index >= arr.length) {
      return def
    }
    if (this.isArrayOfString(arr)) {
      return this.toString(arr[index], def)
    }
    if (this.isArrayOfNumber(arr)) {
      return this.toInt(arr[index], def)
    }
    if (this.isArrayOfBoolean(arr)) {
      return this.toBoolean(arr[index], def)
    }
    return arr[index]
  },

  isArrayOfString(value) {
    return Array.isArray(value) && value.every((item) => typeof item === 'string')
  },

  isArrayOfNumber(value) {
    return Array.isArray(value) && value.every((item) => typeof item === 'number')
  },

  isArrayOfBoolean(value) {
    return Array.isArray(value) && value.every((item) => typeof item === 'boolean')
  },
}

export default Var
