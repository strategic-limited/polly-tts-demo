import AWS from 'aws-sdk'


export default (data) => {
  return new Promise((resolve, reject) => {
// Create an Polly client
    const Polly = new AWS.Polly({
      signatureVersion: 'v4',
      region: 'us-east-1'
    });

    let params = {
      'Engine': data.engine,
      'Text': data.text,
      'LanguageCode': "en-US",
      'OutputFormat': 'mp3',
      'VoiceId': data.voice,
      'OutputS3BucketName': process.env.AWS_BUCKET_NAME,
      'OutputS3KeyPrefix': `test/${data.engine}`,
      'SnsTopicArn': process.env.AWS_SNS_TOPIC_ARN,
    };

    Polly.startSpeechSynthesisTask(params, (err, data) => {
      if (err) {
        reject(err)
      } else if (data) {
        resolve({...data, text: params.Text})
      }
    })
  })
}
