const connection_db = require('../database/connexion')
const Joi = require('joi');
require('dotenv');

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
    image.mv(`${process.env.UPLOAD_DOCUMENT_PATH}/${image.name}`, (err) => {
      if(err){
        res.json({ message : err.message })
      }else{
        // don't store the same file name as user choose. new Date().Now()
        const sql = `INSERT INTO product (name, description, price, quantity, image, id_category) 
        VALUES ('${name}','${description}',${price},'${quantity}','${image.name}','${id_category}')`;
        
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
/*
  app.post('/upload', (req, res) => {
    // req.files contains uploaded files
    console.log(req.files);

    // Handle the uploaded files
    if (req.files && req.files.file) {
        const uploadedFile = req.files.file;
        
        // Generate a new filename using Date.now() and the original file extension
        const newFilename = Date.now() + path.extname(uploadedFile.name);
        
        // Move the uploaded file to a new location with the new filename
        uploadedFile.mv('./uploads/' + newFilename, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send('File uploaded');
        });
    } else {
        res.status(400).send('No file uploaded');
    }
}); 
*/
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

const getProductImage = (req, res) => {
 // send image
}

module.exports = {
  createProduct,
  getProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  getProductImage
};
