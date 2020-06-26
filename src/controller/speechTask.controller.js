import awsPolly from '../service/awsPolly'
import {speechTaskDao} from '../dao/speechTask.dao'


class SpeechTaskController {
  async createTask (params) {
   let messagePolly = await awsPolly(params);
   await speechTaskDao.createTask(messagePolly);
   return messagePolly
  }
}

export const ttsController = new SpeechTaskController()
