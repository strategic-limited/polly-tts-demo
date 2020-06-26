import * as mongoose from 'mongoose'

const speechTaskSchema = mongoose.Schema({
  taskId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
  },
  status: {
    type: String,
  },
  statusReason:{
    type: String,
  },
  text:{
    type: String,
    required: true
  },
  outputUri:{
    type: String,
    require: true
  },
  voiceId:{
    type: String,
  }
}, { timestamps: true });

export default mongoose.model('speechTask', speechTaskSchema)
