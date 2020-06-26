import { Consumer } from 'sqs-consumer'
import AWS from 'aws-sdk'
import {handleTaskFinished} from "./speechTask";

AWS.config.update({region: 'us-east-1'});

function sqsConsumer () {
  const app = Consumer.create({
    queueUrl: 'https://sqs.us-east-1.amazonaws.com/635849326894/videoremix-tts-queue',
    handleMessage: async (message) => {
      await handleTaskFinished(JSON.parse(JSON.stringify(message)));
    },
    sqs: new AWS.SQS()
  });

  app.on('error', (err) => {
    console.error(err.message);
  });

  app.on('processing_error', (err) => {
    console.error(err.message);
  });

  app.on('timeout_error', (err) => {
    console.error(err.message);
  });

  app.start();
}


export { sqsConsumer }
