const functions = require("firebase-functions");
const app = require("express")();

const { getAllImages,classifyImage} = require("./APIs/images");

app.get("/images", getAllImages);
app.get("/update", classifyImage);
exports.api = functions.https.onRequest(app);
