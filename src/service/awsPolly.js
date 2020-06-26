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
      'OutputS3BucketName': 'videoremix-tts',
      'OutputS3KeyPrefix': `test/${data.engine}`,
      'SnsTopicArn': 'arn:aws:sns:us-east-1:635849326894:videoremix-tts'
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
