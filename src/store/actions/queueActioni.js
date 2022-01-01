import moment from 'moment'
import MessageSender from '../../library/handler/MessageSender'
import { authConstant } from '../constants'
import ToolsMessage from '../../messages/tools/ToolsMessage'
import ReportMessage from '../../messages/report/ReportMessage'
import QueueMessage from '../../messages/queue/QueueMessage'

export const get_queue_active = () => async (dispatch) => {
  const msg = new QueueMessage('ACTIVE')

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_your_queue = (data) => async (dispatch) => {
  const msg = new QueueMessage('OWN')
  msg.setUsername(data)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const create_your_queue = (data) => async (dispatch) => {
  const msg = new QueueMessage('PENDING')
  msg.setData(data)

  const response = await new MessageSender(dispatch).doPost(msg)

  return response
}

export const set_done = (data) => async (dispatch) => {
  const msg = new QueueMessage('FINISHED')
  msg.setData(data)

  const response = await new MessageSender(dispatch).doPost(msg)

  return response
}