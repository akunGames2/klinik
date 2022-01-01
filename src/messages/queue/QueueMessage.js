
import { BaseMessage } from '../BaseMessage'
import Logger from '../../library/helper/Logger'

export default class QueueMessage extends BaseMessage {
  constructor(path) {
    super(path)

    this.path = path    
  }

  getPath() {
    let path
    
    if(this.path =='ACTIVE') {
      path =  'queue/getqueueactive'
    } else if(this.path =='OWN') {
      path =  'queue/getyourqueue'
    } else if(this.path =='PENDING') {
      path =  'queue/createqueue'
    } else if(this.path =='FINISHED') {
      path =  'queue/setdone'
    }
    return path
  }

  setUsername(username) {
    return this.data.username = username
  }

  setData(data) {
    return this.data = data
  }
  
}
