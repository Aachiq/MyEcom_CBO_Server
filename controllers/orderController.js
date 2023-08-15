const express = require('express');
const router = express.Router();
const connection_db = require('../database/connexion')


router.get('/show', (req,res) => {
    const sql = "SELECT * FROM orders_mvp";
    connection_db.query(sql, (err,result) =>{
     if(err){
        res.status(500).json({message : err.message});
     }else{
        if(result.length === 0){
            res.json({message : "No Catgeory Found !"})
        }else{
            res.status(200).json({categories : result})
        }
     }
    })
});


router.get('/archive/:id', (req,res) => {
// Arhciver : dleete and insert in other table of archived orders
    const sql = "DELETE FROM category WHERE id =";
    connection_db.query(sql, (err,result) =>{
     if(err){
        res.status(500).json({message : err.message});
     }else{
        if(result.length === 0){
            res.json({message : "No Catgeory Found !"})
        }else{
            res.status(200).json({categories : result})
        }
     }
    })
});

router.get('/update/:id', (req,res) => {
    const sql = "UPDATE orders_mvp SET ...";
    connection_db.query(sql, (err,result) =>{
     if(err){
        res.status(500).json({message : err.message});
     }else{
        if(result.length === 0){
            res.json({message : "No Catgeory Found !"})
        }else{
            res.status(200).json({categories : result})
        }
     }
    })
});


module.exports = router;
