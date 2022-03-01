const { db } = require("../util/admin");
const { s3 } = require("../util/AwsConfig");
const axios = require("axios");

//  here i create the image collection into the firebase database by getting the images url from the aws bucket
exports.createCollection = (req, res) => {
  db.collection("images")
    .limit(1)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log("collection is not created");
        s3.listObjects(
          {
            Bucket: process.env.BUCKET,
          },
          function (err, response) {
            if (err) {
              console.log(err);
            } else {
              let data = response.Contents.map((item, index) => {
                return { imageKey: item.Key, id: index, users: [] };
              });
              db.collection("images").doc("imageCollection").set({ data });
            }
          }
        );
      }
      return res
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// get all images from the firebase db
exports.getAllImages = (request, response) => {
  db.collection("images")
    .doc("imageCollection")
    .get()
    .then((data) => {
      // console.log('request.user', data.data())
      return response.json({
        data: data.data().data,
        user: { userID: request.user.user_id, email: request.user.email },
      });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.classifyImage = (request, response) => {
  // console.log(request.body)
  let data = request.body;
  db.collection("images")
    .doc("imageCollection")
    .update({ data })
    .then((data) => {
      return response.json({ message: "Updated successfully", data });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({
        error: err.code,
      });
    });
};
