const AWS= require ('aws-sdk');


AWS.config.update({ 
  region: process.env.REACT_APP_REGIONS,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
 })

 const s3 = new AWS.S3();

module.exports= {s3}