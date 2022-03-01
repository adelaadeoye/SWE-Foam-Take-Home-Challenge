const { db } = require("../util/admin");
// const { s3 } = requir../../AwsConfigfig");
// const axios = require("axios");

//  here i create the image collection into the firebase database by getting the images url from the aws bucket
// exports.createCollection = (req, res) => {
//   db.collection("images")
//     .doc("imageCollection")
//     .get()
//     .then((data) => {
//       response.header("Access-Control-Allow-Origin", "*");
//       if (response.json(data.data().data).length <= 0) {
//         s3.listObjects(
//           {
//             Bucket: process.env.REACT_APP_BUCKET,
//           },
//           function (err, response) {
//             console.log("i got here");
//             if (err) {
//               console.log(err);
//             } else {
//               let data = res.Contents.map((item, index) => {
//                 return { imageKey: item.Key, status: "", id: index, users: [] };
//               });
//               db.collection("images").doc("imageCollection").set({ data });
//             }
//           }
//         );
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).json({ error: err.code });
//     });
// };

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

// exports.classifyImage = (request, response) => {
//   db.collection("images")
//     .doc("imageCollection")
//     .get()
//     .then((result) => {
//       let data = result.data().data;
//       result.data().data.some((item) => {
//         if (item.id == 1) {
//           data[1] = {
//             id: 1,
//             imageKey:
//               "prod-exp13436-2020-01-08-at-15.01.15-sb6by9nohfpx416zeltkn4x3fi2h8mhzt5fzpuoxsdv23fx3o84bu7qjihakmwx5.png",
//             status: "",
//             users: [
//               { email: "addd@a.com", status: "Foaming" },
//               { email: "addsdddd@a.com", status: "Foaming" },
//             ],
//           };
//           db.collection("images")
//             .doc("imageCollection")
//             .update({ data })
//             .then((data) => {
//               return response.json({ message: "Updated successfully", data });
//             })
//             .catch((err) => {
//               console.error(err);
//               return response.status(500).json({
//                 error: err.code,
//               });
//             });
//         }
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//       return response.status(500).json({ error: err.code });
//     });

// };
