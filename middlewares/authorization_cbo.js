const jwt = require('jsonwebtoken');
const connetion_db = require('../database/connexion');
require('dotenv').config();


exports.isAuth = (req, res, next) => {
 const authorization = req.headers.authorization;
 if(!authorization){
    res.status(401).json({ message : "Not Authorized Token Missing !" })
 }else{
    const extractedToken = authorization.split(' ')[1]; //[0] Bearer
    jwt.verify(extractedToken,process.env.JWT_SECRET, { algorithms: ['HS256'] }, (err,decoded) => {
     if(err){
       res.status(403).json({ message : err.message })
     }else{
       req.auth = decoded;
       next();
     }
    })
 }
}

exports.userById = (req, res, next) => {
  const { idUser } = req.params;
    const sql = `SELECT * FROM users_cbo WHERE id = '${idUser}'`;
    connetion_db.query(sql, (err,result) => {
      if(err) {
        res.status(500).json({ error : "Database Query Error !" })
      }else{
        if(result.length === 0){
            res.status(200).json({ message : "User Note Found" })
        }else{
            req.user = result[0];
            next()
        }
      }
    })
}

exports.isOwner= (req, res, next) => {

  let isOwn = req.user && req.auth && (req.user.id == req.auth.idUser)
  if(!isOwn) {
      return res.status(403).json({
          error: "Access Denied Not Owner !"
      })
  }
  next();
}

exports.isAdmin = (req, res, next) => {

  if(req.user.status !== "admin"){
    res.json({ message : "Admin Resource Access Denied !" })
  }
  next();
}