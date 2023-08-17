const express = require('express');
const app = express();
const upload = require('express-fileupload');

require('dotenv').config();
const port = process.env.PORT;

// Application Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(express.json());
app.use(upload());

// use Router as middelware
app.use('/apicbo/auth',authRoutes);
app.use('/apicbo/category',categoryRoutes);
app.use('/apicbo/product',productRoutes);

app.listen(port,() => console.log(`app is running at : http://loclahost:${port}`))