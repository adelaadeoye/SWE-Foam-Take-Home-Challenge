const knex =require('knex')


const knexConfig= require('../knexfile.js')
db=knex(knexConfig.development)
module.exports= db;