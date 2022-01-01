import Logger from "./Logger"

const Formatter = {
  price: (money) => {
    if (!money) {
      money = ''
    }
    const v = money.toString().replace(/[^0-9]/gi, '')
    let f = parseInt(v) // eslint-disable-line radix
    if (Number.isNaN(f)) {
      f = 0
    }
    return f.toFixed(0).replace(/./g, (c, i, a) =>
      // eslint-disable-next-line no-nested-ternary
      i && c !== '.' && !((a.length - i) % 3) ? `.${c}` : c === '.' ? `,${c.substring(1)}` : c
    )
  },

  serial: (value, length) => {
    if (!value) {
      value = ''
    }
    if (!length) {
      length = 16
    }
    const v = value.replace(/-+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(new RegExp(`\\d{4,${length}}`, 'g'))
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join('-')
    }
    return value
  },

  positive: (value) => {        
    if(value) {
      if(value.charAt(0) == 0) {
        value = value.toString().replace(/[^1-9]/g, '')
      } else {
        value = value.toString().replace(/[^0-9]/g, '')
      }
      const v = value.toString().replace(/[^0-9]/gi, '')
      let f = parseInt(v) // eslint-disable-line radix
      if (Number.isNaN(f)) {
        f = 0
      }
      return f.toFixed(0).replace(/./g, (c, i, a) =>
        // eslint-disable-next-line no-nested-ternary
        i && c !== '.' && !((a.length - i) % 3) ? `.${c}` : c === '.' ? `,${c.substring(1)}` : c
      )
    }
  }
}

export default Formatter
