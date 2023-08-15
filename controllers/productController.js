const connection_db = require('../database/connexion')
const Joi = require('joi');

const getProducts = (req, res) => {
    const sql = "SELECT * FROM product";
    connection_db.query(sql, (err,result) =>{
     if(err){
        res.status(500).json({ message : err.message });
     }else{
        if(result.length === 0){
            res.json({message : "No Product Found !"})
        }else{
            res.status(200).json({products : result})
        }
     }
    })
};
const getOneProduct = (req, res) => {
    const { id } = req.query;
    const sql = "SELECT * FROM product WHERE id ='"+id+"'";
    connection_db.query(sql, (err,result) =>{
     if(err){
        res.status(500).json({ message : err.message });
     }else{
        if(result.length === 0){
            res.json({message : "No Product Found With ID = " + id + "!"})
        }else{
            res.status(200).json({product : result[0]})
        }
     }
    })
};


const deleteProduct = (req, res) => {
    const { id } = req.query;
    const sql1 = "SELECT * FROM product WHERE id ='"+id+"'";
    connection_db.query(sql1, (err,result) => {
     if(err){
        res.status(500).json({ message : err.message });
     }else{
        if(result.length === 0){
            res.json({message : "No Product Found With ID = " + id + "!"})
        }else{
            const foundCategoryId = result[0].id;
            const sql2 = `DELETE FROM product WHERE id = ${foundCategoryId}`;
            
            connection_db.query(sql2, (err,result) =>{
            if(err){
                res.status(500).json({message : err.message});
            }else{
                res.json({message : "¨Product has been deleted  !"})
            }
        })
        }
     }
    });
}

const createProduct = (req, res) => {
  const { 
    name,
    description,
    price,
    quantity,
    image,
    id_category
  } = req.body;

   // use validator or Manula validation 
   const signupSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    image: Joi.string().required(),
    id_category: Joi.number().required()
  });

  const { error } = signupSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }else{
    const sql = `INSERT INTO product (name, description, price, quantity, image, id_category) 
    VALUES ('${name}','${description}',${price},'${quantity}','${image}','${id_category}')`;
  
    connection_db.query(sql, (err) =>{
      if(err){
        res.status(500).json({ message : err.message });
      }else{
        res.status(200).json({ message : "Product Inserted Successfully !" })
      }
    })
  }
}

const updateProduct = (req, res) => {
    const { id } = req.query;
    const sql1 = "SELECT * FROM product WHERE id ='"+id+"'";
    connection_db.query(sql1, (err,result) => {
     if(err){
        res.status(500).json({ message : err.message });
     }else{
        if(result.length === 0){
          res.json({message : "No Produc Found With ID = " + id + "!"})
        }else{
          const { 
            name,
            description,
            price,
            quantity,
            image_name,
            id_category
          } = req.body;
          // use validator or Manula validation 
          const signupSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            image: Joi.string().required(),
            id_category: Joi.number().required()
          });

          const { error } = signupSchema.validate(req.body);

          if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }else{
            const sql2 = `UPDATE product 
            SET name = '${name}' , description ='${description}', price ='${price}', 
            quantity ='${quantity}', image ='${image_name}', id_category ='${id_category}'
            WHERE id = '${id}'`;

            connection_db.query(sql2, (err) =>{
              if(err){
              res.status(500).json({message : err.message});
              }else{
                  res.status(200).json({
                      message : "Product Updated Successfully !",
                      updatedProduc : {
                          id : id,
                          updatedProduc : req.body
                      }
                  })
              }
            })
          }
        }
     }
  }) 
};


module.exports = {
  createProduct,
  getProducts,
  getOneProduct,
  deleteProduct,
  updateProduct
};
