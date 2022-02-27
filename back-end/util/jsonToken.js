const jwt = require("jsonwebtoken");

module.exports={
    signToken
}
function signToken(user) {
    const payload = {
      username: user.username
    };
    const secret = process.env.JWT_SECRET || "keep me secret";
    const options = {
      expiresIn: "1d"
    };
    return jwt.sign(payload, secret, options);
  }