const mysql = require('mysql');

const connetion_db = mysql.createConnection({
    database : process.env.DB_NAME,
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.PASSWORD
})

connetion_db.connect((err) => {
 if(err) {
  console.log(`database connexion failed : ${err}`)
 }else {
    console.log("connection with databse is successfully !")
 }
})
module.exports = connetion_db;