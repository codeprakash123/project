const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Home Page
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
});

// Add a Product (optional for development)
router.post('/add-product', async (req, res) => {
    const { name, price, description, image } = req.body;
    const product = new Product({ name, price, description, image });
    await product.save();
    res.redirect('/');
});

// Single Product Page
// router.get('/product/:id', async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         res.render('product', { product });
//     } catch (err) {
//         console.error(err);
//         res.status(404).send('Product not found');
//     }
// });
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch products from MongoDB
        res.render('index', { products }); // Pass products to EJS
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading products');
    }
});
// console.log(products);



module.exports = router;
