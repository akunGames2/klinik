/* global FormData */
import axios from 'axios'
import qs from 'qs'
import publicIP from 'react-native-public-ip'
import { baseUrl, baseUrlRegistration, clientId, clientSecret, IS_DEV, MOBILE_TOKEN_API } from '../../utils'
import { setLoading } from '../../store/actions/loadingAction'
import { BaseMessage } from '../../messages/BaseMessage'
import { authConstant } from '../../store/constants'
import Logger from '../helper/Logger'
import { Basket } from '../../utils/basket'
import RemoteConfig from '../helper/RemoteConfig'

const INCLUDE_HEADER = false

export default class MessageSender {
  constructor(dispatch)  {
    this.dispatch = dispatch
    axios.defaults.validateStatus = () => true
    this.mainInstance = axios.create({
      baseURL: baseUrl,
      // headers: {
      //   'client-id': clientId,
      //   'client-secret': clientSecret,
      // },
      responseType: 'json',
      timeout: 60000,
    })

    this.tag = ''
    this.mainInstance.interceptors.request.use(this.onRequestSuccess, this.onRequestError)
    this.mainInstance.interceptors.response.use(this.onResponseSuccess, this.onResponseError)    
  }

  onRequestSuccess = (config) => {
    if (INCLUDE_HEADER) {
      Logger.log(`REQUEST HEADER${this.tag}`, config.headers)
    }
    
    if (config.method === 'get') {
      Logger.log(
        `REQUEST DATA${this.tag}`,
        qs.stringify(config.params, { arrayFormat: 'brackets' })
      )
    } else {
      Logger.log(`REQUEST DATA${this.tag}`, config.data)
    }

    return config
  }

  onRequestError = (error) => {
    Logger.error(`REQUEST ERROR OCCURED${this.tag}`, error)

    if (this.dispatch) {
      this.dispatch(setLoading(true))
    }
    return Promise.reject(error)
  }

  onResponseSuccess = (response) => {
    if (INCLUDE_HEADER) {
      Logger.log(`RESPONSE HEADER${this.tag}`, response.headers)
    }
    Logger.log(`RESPONSE DATA${this.tag}`, response.data)

    const msg = new BaseMessage()
    msg.merge(response.data)

    if (this.dispatch) {
      this.dispatch(setLoading(false))
    }
    return msg
  }

  onResponseError = (error) => {
    Logger.error(`RESPONSE ERROR OCCURED${this.tag}`, error)

    const msg = new BaseMessage()
    msg.setRc('GE')
    msg.setRd(error)

    if (this.dispatch) {
      this.dispatch(setLoading(false))
    }
    return Promise.resolve(msg)
  }

  async doGet(msg, loading = true, ip=true) {
    if (this.dispatch && loading) {
      this.dispatch(setLoading(true))
    }
    
    if(ip) msg.data.ipAddress = await this.getIP()  
      
    this.tag = ` OF ${msg.getPath()}`
    if (Logger.IS_DEEP_TRACE) {
      this.tag = `${this.tag}?${qs.stringify(msg.getData(), { arrayFormat: 'brackets' })}`
    }

    return this.mainInstance.get(msg.getPath(), {
      params: msg.getData(),
      // headers: { "Content-Type": "application/x-www-form-urlencoded" },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
    })
  }

  async doPost(msg) {
    if (this.dispatch) {
      this.dispatch(setLoading(true))
    }
    
    // if(ip) msg.data.ipAddress = await this.getIP()

    this.tag = ` OF ${msg.getPath()}`

    let params
    let data
    if (typeof msg.isMultipart === 'function' && msg.isMultipart()) {
      const obj = msg.getData()
      data = new FormData()
      Object.keys(obj).forEach((e) => {
        data.append(e, obj[e])
      })
      if (typeof msg.getMedia === 'function' && msg.getMedia()) {
        data.append('image', msg.getMedia())
      }
      params = {
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8; boundary="devel";',
          Accept: 'application/json',
        },
      }
    } else {
      data = msg.getData()
      params = {
        paramsSerializer: (param) => JSON.stringify(param),
      }
    }
    Logger.log('check data send',data)
    let response = null
    // if(customUrl) {
    //   let token = await this.getToken()
    //   this.registrationInstance = axios.create({
    //     baseURL: baseUrlRegistration,
    //     headers: {
    //       'token': token
    //     },
    //     responseType: 'json',
    //     timeout: 60000,
    //   })
    //   this.registrationInstance.interceptors.request.use(this.onRequestSuccess, this.onRequestError)
    //   this.registrationInstance.interceptors.response.use(this.onResponseSuccess, this.onResponseError)
    //   response = await this.registrationInstance.post(msg.getPath(), data, params)
    // } else {
      response = await this.mainInstance.post(msg.getPath(), data, params)
    // }

    if (!IS_DEV) {
      if (
        this.dispatch &&
        // eslint-disable-next-line no-bitwise
        ~msg.getPath().indexOf('core') &&
        // eslint-disable-next-line no-bitwise
        ~':07:09:'.indexOf(`:${response.getRc()}:`)
      ) {
        this.dispatch({
          type: authConstant.SET_AUTH_DATA,
          payload: null,
        })
      }
    }

    return response
  }

  async getIP() {
    let ip = Basket.getIPAddress()
    if (!ip) {
      ip = await publicIP()
      Basket.setIPAddress(ip)
    }

    return ip
  }

  async getToken() {
    let token = await RemoteConfig.getValue('MOBILE_TOKEN_API')
    return token
  }
}
