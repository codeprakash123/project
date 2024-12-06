const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Example MongoDB connection and model
mongoose.connect('mongodb://localhost:27017/ecommerce');
const Product = mongoose.model('Product', {
    name: String,
    description: String,
    price: Number,
    image: String
});

// Route to render index.ejs with products data
app.get('/', async (req, res) => {
    try {
        const products = await Product.find();  // Fetch products from MongoDB
        res.render('index', { products });     // Render combined index.ejs
    } catch (error) {
        console.error(error);
        res.status(500).send('Error rendering template');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
