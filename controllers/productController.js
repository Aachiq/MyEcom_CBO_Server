const express = require('express');
// const connection_db = require('../database/connexion');

const router = express.Router();

router.get('/show',(req, res) => {
    const sql = "SELECT * FROM product";
    connection_db.query(sql, (err,result) => {
      if(err){
       res.status(500).json({error: err.message})
      }else{
       if(result.length === 0){
        res.status(200).json({message : "No Products Found !"})
       }else{
        res.json({ products : result })
       }
      }
    })
})
router.get('/update/:id',(req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM product WHERE id = ${id}`;

    connection_db.query(sql, (err,result) => {
      if(err){
       res.status(500).json({error: err.message})
      }
      else{
       if(result.length === 0){
        res.status(200).json({message : "No Product Found With this ID !"})
       }else{
        // here SET UPADATE the product result[0]
       }
      }
    })
})
router.get('/show/category/:id',(req, res) => {

    const { id } = req.params;
    const sql = `SELECT * FROM product WHERE id_category = ${id}`;
    
    connection_db.query(sql, (err,result) => {
      if(err){
       res.status(500).json({error: err.message})
      }else{
       if(result.length === 0){
        res.status(200).json({message : "No Products Found With given Category !"})
       }else{
        res.json({ products : result })
       }
      }
    })
})
router.post('/search',(req, res) => {

    const { word } = req.body;
    const sql = `SELECT * FROM product WHERE name LIKE '%${word}%' OR description LIKE '%${word}%'`;
    
    connection_db.query(sql, (err,result) => {
      if(err){
       res.status(500).json({error: err.message})
      }else{
       if(result.length === 0){
        res.status(200).json({message : "No Product Found for Search !"})
       }else{
        res.json({ products : result })
       }
      }
    })
})

module.exports = router;