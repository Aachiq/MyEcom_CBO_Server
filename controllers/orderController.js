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

const searchOrder = (req, res) => {

    const { word } = req.body;
    const sql = `SELECT * FROM order_mvp WHERE address LIKE '%${word}%'`;
    
    connection_db.query(sql, (err,result) => {
      if(err){
       res.status(500).json({error: err.message})
      }else{
       if(result.length === 0){
        res.status(200).json({message : "No Order Found for Search !"})
       }else{
        res.json({ foundOrders : result })
       }
      }
    })
  }
  
  const paginationOrder = (req, res) => {
    let page;
    if(!req.query.page){
      //page = 0;
      page = 1;
    }else{
      page = req.query.page;
    }
  
    connection_db.query("SELECT * FROM order_mvp", (err,result) => {
      if(err){
          res.json({error : err})
      }else{
          if(result.length === 0){
              res.json({ message : "No Order Found !" })
          }else{
              const item_lenght = result.length;
              const items_per_page = 5;
              const number_of_page = item_lenght / items_per_page;
              // number_of_page / it's usefull only for front to create list of numbers of pagination
              
              let page_first_result = (page - 1) * items_per_page;
  
              const sql = `SELECT * FROM order_mvp LIMIT ${items_per_page} OFFSET ${page_first_result}`;
              connection_db.query(sql,(err,result)=>{
                  if(err) console.log(err)
                  res.json({ paginatedOrder : result })
              })
          }
      }   
    })
  
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
    deleteOrder,
    searchOrder,
    paginationOrder
};
