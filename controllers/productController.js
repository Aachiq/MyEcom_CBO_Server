const connection_db = require('../database/connexion')
const Joi = require('joi');
require('dotenv');
const path = require('path');

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
    id_category
  } = req.body;
  const { image } = req.files;

  // console.log(req.body);
  // console.log(req.files);

  // use validator or Manula validation 
  const signupSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    id_category: Joi.number().required()
  });
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }else{
    // Validate file format (only allow JPEG and PNG)
    const allowedFormats = ['image/jpeg', 'image/png'];
    if (!allowedFormats.includes(image.mimetype)) {
      return res.status(400).send('Invalid file format.');
    }
    // Validate file size (e.g., maximum 1 MB)
    const maxSizeBytes = 1 * 1024 * 1024; // 1 MB
    if (image.size > maxSizeBytes) {
      return res.status(400).send('File size not accepted !');
    }
    const customFileName = Date.now() + path.extname(image.name);
    image.mv(`${process.env.UPLOAD_DOCUMENT_PATH}/${customFileName}`, (err) => {
      if(err){
        res.json({ message : err.message })
      }else{
        // don't store the same file name as user choose. new Date().Now()
        const sql = `INSERT INTO product (name, description, price, quantity, image, id_category) 
        VALUES ('${name}','${description}',${price},'${quantity}','${customFileName}','${id_category}')`;
        
        connection_db.query(sql, (err) =>{
          if(err){
            res.status(500).json({ message : err.message });
          }else{
            res.status(200).json({ message : "Product Inserted Successfully !" })
          }
        })
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
            id_category
          } = req.body;
          const { image } = req.files;
          // use validator or Manula validation 
          const signupSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            id_category: Joi.number().required()
          });

          const { error } = signupSchema.validate(req.body);

          if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }else{
            image.mv(`${process.env.UPLOAD_DOCUMENT_PATH}/${image.name}`, (err) => {
              if(err){
                res.json({ message : err.message })
              }else{
                 // don't store the same file name as user choose. new Date().Now()
                 const sql2 = `UPDATE product 
                  SET name = '${name}' , description ='${description}', price ='${price}', 
                  quantity ='${quantity}', image ='${image.name}', id_category ='${id_category}'
                  WHERE id = '${id}'
                `;
        
                  connection_db.query(sql2, (err) =>{
                    if(err){
                      res.status(500).json({ message : err.message });
                    }else{
                      res.status(200).json({ message : "Product Updated Successfully !" })
                    }
                  })
               }
              })
            }
          }
        }
    })
};

const searchProduct = (req, res) => {

  const { word } = req.body;
  const sql = `SELECT * FROM product WHERE name LIKE '%${word}%' OR description LIKE '%${word}%'`;
  
  connection_db.query(sql, (err,result) => {
    if(err){
     res.status(500).json({error: err.message})
    }else{
     if(result.length === 0){
      res.status(200).json({message : "No Product Found for Search !"})
     }else{
      res.json({ foundProducts : result })
     }
    }
  })
}

const paginationProduct = (req, res) => {
  let page;
  if(!req.query.page){
    //page = 0;
    page = 1;
  }else{
    page = req.query.page;
  }

  connection_db.query("SELECT * FROM product",(err,result)=>{
    if(err){
        res.json({error : err})
    }else{
        if(result.length === 0){
            res.json({ message : "No Product Found !" })
        }else{
            const item_lenght = result.length;
            const items_per_page = 5;
            const number_of_page = item_lenght / items_per_page;
            // number_of_page / it's usefull only for front to create list of numbers of pagination
            
            let page_first_result = (page - 1) * items_per_page;

            const sql = `SELECT * FROM product LIMIT ${items_per_page} OFFSET ${page_first_result}`;
            connection_db.query(sql,(err,result)=>{
                if(err) console.log(err)
                res.json({ paginatedProduct: result })
            })
        }
    }   
  })

}

const getProductImage = (req, res) => {
  const { id } = req.query;
  const sql = "SELECT * FROM product WHERE id ='"+id+"'";
  connection_db.query(sql, (err,result) =>{
   if(err){
      res.status(500).json({ message : err.message });
   }else{
      if(result.length === 0){
          res.json({message : "No Product Found With ID = " + id + "!"})
      }else{
          res.sendFile(`${process.env.UPLOAD_DOCUMENT_PATH}/${result[0].image}`)
      }
   }
  })
}

module.exports = {
  createProduct,
  getProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  getProductImage,
  searchProduct,
  paginationProduct
};
