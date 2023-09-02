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

const paginationCatgeory = (req, res) => {
  let page;
  if(!req.query.page){
    //page = 0;
    page = 1;
  }else{
    page = req.query.page;
  }

  connection_db.query("SELECT * FROM category",(err,result)=>{
    if(err){
        res.json({error : err})
    }else{
        if(result.length === 0){
            res.json({message : "No Catgeory Found !"})
        }else{
            const item_lenght = result.length;
            const items_per_page = 5;
            const number_of_page = item_lenght / items_per_page;
            // number_of_page / it's usefull only for front to create list of numbers of pagination
            
            let page_first_result = (page - 1) * items_per_page;

            const sql = `SELECT * FROM category LIMIT ${items_per_page} OFFSET ${page_first_result}`;
            connection_db.query(sql,(err,result)=>{
                if(err) console.log(err)
                res.json({ paginatedCategory: result })
            })
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
    paginationCatgeory,
    updateCategory,
};
