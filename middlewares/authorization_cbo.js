const jwt = require('jsonwebtoken');
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