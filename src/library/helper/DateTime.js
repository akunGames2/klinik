import moment from 'moment'

const DateTime = {
  FORMAT_DATE_DM: 'DD MMM',
  FORMAT_DATE_DMY: 'DD-MM-YYYY',
  FORMAT_DATE_DMYHM: 'DD-MM-YYYY HH:mm',
  FORMAT_DATE_DMYHMS: 'DD-MM-YYYY HH:mm:ss',
  FORMAT_DATE_DMY_LONG_MONTH: 'DD-MMMM-YYYY',
  FORMAT_DATE_DMY_LONG_MONTH_NO_SEPARATOR: 'DD MMMM YYYY',
  FORMAT_DATE_DMY_SLASH: 'DD/MMMM/YYYY',
  FORMAT_DATE_DAY: 'dddd',
  FORMAT_DATE_EDM_SHORT_MONTH: 'ddd, DD MMM',
  FORMAT_DATE_EDM_LONG_MONTH: 'ddd, DD MMMM',
  FORMAT_DATE_EDMY_LONG_MONTH: 'dddd, DD MMMM YYYY',
  FORMAT_DATE_EDMYHM_LONG_MONTH: 'dddd, DD MMMM YYYY HH:mm',
  FORMAT_DATE_EDMYHMS_LONG_MONTH: 'dddd, DD MMMM YYYY HH:mm:ss',
  FORMAT_DATE_MYE_LONG_MONTH: 'MMMM YYYY, dddd',
  FORMAT_DATE_YMD: 'YYYY-MM-DD',
  FORMAT_DATE_YMD_NO_SEPARATOR: 'YYYYMMDD',
  FORMAT_DATE_MDY_SLASH: 'MM/DD/YYYY',
  FORMAT_DATE_YMD_SLASH: 'YYYY/MM/DD',
  FORMAT_DATE_TIME_YMDHM: 'YYYY-MM-DD HH:mm',
  FORMAT_DATE_TIME_YMDHMS: 'YYYY-MM-DD HH:mm:ss',
  FORMAT_DATE_TIME_YMDHMS_NO_SEPARATOR: 'YYYYMMDDHHmmss',
  FORMAT_DATE_TIME_DMYHM_LONG_MONTH: 'DD-MMMM-YYYY HH:mm',
  FORMAT_DATE_TIME_DMYHM_LONG_MONTH_NO_SEPARATOR: 'DD MMMM YYYY HH:mm',
  FORMAT_TIME_HM: 'HH:mm',
  FORMAT_TIME_HM_NO_SEPARATOR: 'HHmm',
  FORMAT_TIME_HMS: 'HH:mm:ss',
  FORMAT_TIME_FORMAT_DATE_DMYHM_LONG_MONTH: 'DD MMMM YYYY, HH:mm',

  format: (date, format) => moment(date).format(format),

  parse: (date, format, def) => {
    if (!def) {
      def = new Date()
    }

    try {
      return moment(date, format).toDate()
    } catch (e) {
      return def
    }
  },

  convert: (date, format_start, format_end) => {
    let dev
    try {
      dev = moment(date, format_start)
    } catch (e) {
      dev = moment()
    }

    return dev.format(format_end)
  },

  diffSeconds: (date_start, date_end) => moment(date_start).diff(date_end),

  diffHourMinutes: (date_start, date_end) =>
    moment.utc(moment(date_start).diff(date_end)).format(DateTime.FORMAT_TIME_HMS),

  diffHourMinutesNoSecond: (date_start, date_end) =>
    moment.utc(moment(date_start).diff(date_end)).format(DateTime.FORMAT_TIME_HM),

  today: () => moment(Date.now()).format(DateTime.FORMAT_DATE_YMD),
}

export default DateTime
