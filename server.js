const express = require('express');
const app = express();
const upload = require('express-fileupload');
const path = require('path');

require('dotenv').config();
const port = process.env.PORT;

const cors = require('cors');

// apply cors origin
app.use(cors());

// Application Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(express.json());
app.use(upload());

app.use('/images',express.static(path.join(__dirname, 'uploads')));

app.get('/test',(req,res)=>{
    res.json({msg:"hello"})
})
app.get('/test',(req,res)=> {
    res.send('herkk')
})
// use Router as middelware
app.use('/apicbo/auth',authRoutes);
app.use('/apicbo/category',categoryRoutes);
app.use('/apicbo/product',productRoutes);

app.listen(port,() => console.log(`app is running at : http://loclahost:${port}`))