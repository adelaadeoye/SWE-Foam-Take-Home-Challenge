//Dependencies
require('dotenv').config()
const express = require('express');
const helmet = require("helmet");
const cors = require('cors')
const morgan = require('morgan')

//Self declared export
const userRoutes= require('./routes/userRoute');

//Declaration
const server = express();


//Use dependency
server.use(helmet()); // Help hide header sensitive details
server.use(cors()); // Help in securing request from different origin most especially from front end to backend over https request
server.use(morgan('combined'))
server.use(express.json()); // Node frame work to give back json format as promise

//Route to different endpoints
server.use('/api/user',userRoutes)


server.use('/', (req, res) => res.send('API up and running!'));

const port =process.env.PORT || 3000
// using port 9000 for this example
server.listen(port, () => console.log('API running on port '+port));