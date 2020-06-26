import {speechTaskDao} from '../dao/speechTask.dao'
import {SOCKET_MESSAGE_EVENT, socketMessage} from "../events/socketMessage";

const TASK_STATUS_COMPLETE = 'COMPLETED';

export const handleTaskFinished = async (message) => {
  const messageBody = JSON.parse(message.Body);
  const task = await speechTaskDao.updateTask(JSON.parse(messageBody.Message));
  if (task.status === TASK_STATUS_COMPLETE) {
    console.log(task.status);
    socketMessage.emit(SOCKET_MESSAGE_EVENT, task)
  }
};
