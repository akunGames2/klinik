const Logger = {
  IS_LOGGABLE: true,
  IS_DEEP_TRACE: true,

  log: (tag, any) => {
    if (!tag) {
      tag = 'LINKQU'
    }
    if (Logger.IS_LOGGABLE) {
      if (typeof any === 'object') {
        console.log(`${tag} => ${JSON.stringify(any)}`)
      } else if (any !== undefined) {
        console.log(`${tag} => ${any}`)
      } else {
        console.log(tag)
      }
    }
  },

  warn: (tag, any) => {
    if (!tag) {
      tag = 'LINKQU'
    }
    if (Logger.IS_LOGGABLE) {
      const parsedError = Logger.parse(any)

      Logger.log(tag, parsedError.message)
      console.warn(parsedError.stack)
    }
  },

  error: (tag, any) => {
    if (Logger.IS_LOGGABLE) {
      const parsedError = Logger.parse(any)

      Logger.log(tag, parsedError.message)
      console.error(parsedError.stack)
    }
  },

  parse: (error) => {
    const parsedError = {
      message: 'n/a',
      status: 'n/a',
      stack: 'n/a',
    }

    // get best available error message
    if (error && error.message) {
      parsedError.status = error.message
    }

    // include HTTP status code
    if (error && error.status) {
      parsedError.status = error.status
    }

    // include stack trace
    if (error && error.stack) {
      parsedError.stack = error.stack
    }

    return parsedError
  },
}

export default Logger
