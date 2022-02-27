const bcrypt = require("bcryptjs");

module.exports = {
  hash,
  unHash
};

function hash(passToHash) {
  let pass = bcrypt.hashSync(passToHash, 10);
  return pass;
}

//res===> result from search of user exist , logPass===> password user entered, storedPass===>Password that is fetch from the db for that user
 function unHash(res, logPass, storedPass) {
  let result =  (res && bcrypt.compareSync(logPass, storedPass));
  return result;
}