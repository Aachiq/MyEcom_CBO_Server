const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT;

// Application Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use(express.json())

// use Router as middelware
app.use('/apicbo/auth',authRoutes);
app.use('/apicbo/category',categoryRoutes);

app.listen(port,() => console.log(`app is running at : http://loclahost:${port}`))