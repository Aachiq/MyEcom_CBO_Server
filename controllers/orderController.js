const express = require('express');
const router = express.Router();
const connection_db = require('../database/connexion')


const getOrders = (req,res) => {
    const sql = "SELECT * FROM order_mvp";
    connection_db.query(sql, (err,result) =>{
     if(err){
        res.status(500).json({message : err.message});
     }else{
        if(result.length === 0){
            res.json({message : "No Order Found !"})
        }else{
            res.status(200).json({orders : result})
        }
     }
    })
};

const deleteOrder = (req, res) => {
    const { id } = req.query;
    const sql1 = "SELECT * FROM order_mvp WHERE id ='"+id+"'";
    connection_db.query(sql1, (err,result) => {
     if(err){
        res.status(500).json({ message : err.message });
     }else{
        if(result.length === 0){
            res.json({message : "No Order Found With ID = " + id + "!"})
        }else{
            const foundOrderId = result[0].id;
            const sql2 = `DELETE FROM order_mvp WHERE id = ${foundOrderId}`;
            
            connection_db.query(sql2, (err,result) =>{
            if(err){
                res.status(500).json({message : err.message});
            }else{
                res.json({message : "Order has been deleted  !"})
            }
        })
        }
     }
    });
}
// there is no create order in CBO because it's BackOffice not clinet that gonna buy a product
// there is no Update order in CBO because it's BackOffice not clinet that gonna buy a product

router.get('/archive/:id', (req,res) => {
// Arhciver : dleete and insert in other table of archived orders
    const sql = "DELETE FROM category WHERE id =";

    // store delete one in other table "Declencheur Triggers"

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

module.exports = {
    getOrders,
    deleteOrder
};
