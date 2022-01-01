import moment from 'moment'
import MessageSender from '../../library/handler/MessageSender'
import { authConstant } from '../constants'
import ToolsMessage from '../../messages/tools/ToolsMessage'
import ReportMessage from '../../messages/report/ReportMessage'

export const get_list_report_data = () => async (dispatch) => {
  const msg = new ReportMessage()

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_report_data = (data) => async (dispatch) => {
  const msg = new ReportMessage(data)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}