import AWS from 'aws-sdk';


AWS.config.update({ 
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
 })

export const s3 = new AWS.S3();

