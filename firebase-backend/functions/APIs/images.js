const { db } = require("../util/admin");

exports.createCollection = (req, res) => {
  db.collection("images")
    .limit(1)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log("collection is not created");
        let data = seed.map((item, index) => {
          return { imageKey: item.url, id: index, users: [] };
        });
        db.collection("images").doc("imageCollection").set({ data });

        return res;
      }
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
