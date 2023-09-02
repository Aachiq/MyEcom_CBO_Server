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
const orderRoutes = require('./routes/orderRoutes')

app.use(express.json());
app.use(upload());

app.use('/images',express.static(path.join(__dirname, 'uploads')));

// use Router as middelware
app.use('/apicbo/auth',authRoutes);
app.use('/apicbo/category',categoryRoutes);
app.use('/apicbo/product',productRoutes);
app.use('/apicbo/order',orderRoutes);

app.listen(port,() => console.log(`app is running at : http://loclahost:${port}`))