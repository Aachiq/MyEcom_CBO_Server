const connection_db = require('../database/connexion');
const jwt = require('jsonwebtoken'); 
const Joi  = require('joi');

const Signin = async (req,res)=>{
    const {login,password} = req.body;

    const signupSchema = Joi.object({
      login: Joi.string().required(),
      password: Joi.string().required()
    });

    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }else{
      const sql = "SELECT * FROM users_cbo WHERE login='"+login+"'";
      connection_db.query(sql, async (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: 'Database query error !' });
          } else {
            console.log("sql result: ", result);
            if (result.length === 0) {
              res.json({ error: "User with this login not found!" });
            } else {
               try {
                let idUser = result[0].id;
                const token = jwt.sign({ idUser }, process.env.JWT_SECRET);
                console.log(token); 
                const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                res.cookie('token', token, { expire: expirationDate });
                res.json({
                    token,
                    user: result[0]
                });
                } catch (error) {
                  console.log(error);
                  res.status(500).json({ error: 'JWT signing error' });
                }
              }
            }
          })
    }
}

const Signout = (req,res) => {
    res.clearCookie('token');
    res.json({
        message: "User Signout"
    })
}

module.exports = {
    Signin,
    Signout
};