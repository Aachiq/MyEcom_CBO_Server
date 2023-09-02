const connection_db = require('../database/connexion')

const getCategories = (req, res) => {
    const sql = "SELECT * FROM category";
    connection_db.query(sql, (err,result) =>{
     if(err){
        res.status(500).json({ message : err.message });
     }else{
        if(result.length === 0){
            res.json({message : "No Catgeory Found !"})
        }else{
            res.status(200).json({categories : result})
        }
     }
    })
};
const getCategory = (req, res) => {
    const { id } = req.query;
    const sql = "SELECT * FROM category WHERE id ='"+id+"'";
    connection_db.query(sql, (err,result) =>{
     if(err){
        res.status(500).json({ message : err.message });
     }else{
        if(result.length === 0){
            res.json({message : "No Catgeory Found With ID = " + id + "!"})
        }else{
            res.status(200).json({category : result[0]})
        }
     }
    })
};


const deleteCategory = (req, res) => {
    const { id } = req.query;
    const sql1 = "SELECT * FROM category WHERE id ='"+id+"'";
    connection_db.query(sql1, (err,result) => {
     if(err){
        res.status(500).json({ message : err.message });
     }else{
        if(result.length === 0){
            res.json({message : "No Catgeory Found With ID = " + id + "!"})
        }else{
            const foundCategoryId = result[0].id;
            const sql2 = `DELETE FROM category WHERE id = ${foundCategoryId}`;
            
            connection_db.query(sql2, (err,result) =>{
            if(err){
                res.status(500).json({message : err.message});
            }else{
                res.json({message : "Catgeory has been deleted  !"})
            }
        })
        }
     }
    });
}

const createCategory = (req, res) => {
    const { name } = req.body;
    const sql = "INSERT INTO category (name) VALUES ('"+name+"')";

    connection_db.query(sql, (err) =>{
        if(err){
        res.status(500).json({message : err.message});
        }else{
            res.status(200).json({message : "Catgeory Inserted Successfully !"})
        }
    })
}


const updateCategory = (req, res) => {
    const { id } = req.query;
    const sql1 = "SELECT * FROM category WHERE id ='"+id+"'";
    connection_db.query(sql1, (err,result) => {
     if(err){
        res.status(500).json({ message : err.message });
     }else{
        if(result.length === 0){
          res.json({message : "No Catgeory Found With ID = " + id + "!"})
        }else{
          const { name } = req.body;
          const sql = "UPDATE category SET name ='"+name+"' WHERE id ="+id;
    
          connection_db.query(sql, (err) =>{
            if(err){
            res.status(500).json({message : err.message});
            }else{
                res.status(200).json({
                    message : "Catgeory Updated Successfully !",
                    updatedCatgeory : {
                        id : id,
                        name : name
                    }
                })
            }
          })
        }
     }
    }) 
};

const searchCategory = (req,res)=>{
    const { word } = req.body;
    const sql = " SELECT * FROM category WHERE name LIKE '%"+word+"%' ";
    connection_db.query(sql, (err,result) => {
        if(err){
            res.status(500).json({message : err})
        }else{
            if(result.length === 0){
                res.json({message : "No Catgeory Found !"})
            }else{
                res.json({ foundCategories : result });
            }
        }
    }) 
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
    searchCategory,
    updateCategory,
};
