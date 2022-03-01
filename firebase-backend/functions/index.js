const functions = require("firebase-functions");
const app = require("express")();
const auth = require('./util/auth');

const cors = require('cors');

app.use(cors());
const { getAllImages, classifyImage } = require("./APIs/images");

const { loginUser,signUpUser } = require("./APIs/users");

app.get("/images",auth, getAllImages);
app.put('/images/:imageId',auth, classifyImage);
app.post("/login", loginUser);
app.post("/signup", signUpUser);

exports.api = functions.https.onRequest(app);
