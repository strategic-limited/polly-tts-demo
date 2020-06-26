import speechTask from "../models/speechTask";

class SpeechTaskDao {
  async createTask(messagePolly) {
    try {
      return speechTask.create({
        taskId: messagePolly.SynthesisTask.TaskId,
        userId: messagePolly.SynthesisTask.userId,
        status: messagePolly.SynthesisTask.TaskStatus,
        statusReason: messagePolly.SynthesisTask.TaskStatusReason,
        outputUri: messagePolly.SynthesisTask.OutputUri,
        text: messagePolly.text,
        voiceId: messagePolly.SynthesisTask.VoiceId,
      })
    } catch (e) {
      console.log(e);
    }
  }

  async updateTask(taskBody) {
    return speechTask.findOneAndUpdate(
      {taskId: taskBody.taskId},
      {$set: {status: taskBody.taskStatus}},
      {new: true},);

  }
}

export const speechTaskDao = new SpeechTaskDao()
