const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const user = {
      firstName:"Adela",
      lastName:"Adeoye",
      token:"sajkdjejw399Ai32(ISJ)cd"
  }

  res.status(200).json(user);
});

module.exports = router;