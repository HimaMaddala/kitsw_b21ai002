import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import AmzProduct from './models/AMZ.js';
import MynProduct from './models/MYN.js';
import AzoProduct from './models/AZO.js';
import FlpProduct from './models/FLP.js';
import SnpProduct from './models/SNP.js';


const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/dbxs');

app.get('/test/companies/:companyname/categories/:category/products', async (req, res) => {
    const { companyname, category } = req.params;
    const { top = 10, minprice = 0, maxprice = Infinity } = req.query;
    let data;

    try {
        const limit = parseInt(top, 10);
        const minPrice = parseFloat(minprice);
        const maxPrice = parseFloat(maxprice);

        if (isNaN(limit) || isNaN(minPrice) || isNaN(maxPrice)) {
            return res.status(400).json({ error: 'Invalid query parameters' });
        }

        const query = {
            category: category,
            price: { $gte: minPrice, $lte: maxPrice }
        };

        switch (companyname.toUpperCase()) {
            case 'AMZ':
                data = await AmzProduct.find(query).limit(limit);
                break;
            case 'MYN':
                data = await MynProduct.find(query).limit(limit);
                break;
            case 'AZO':
                data = await AzoProduct.find(query).limit(limit);
                break;
            case 'FLP':
                data = await FlpProduct.find(query).limit(limit);
                break;
            case 'SNP':
                data = await SnpProduct.find(query).limit(limit);
                break;
            default:
                return res.status(400).json({ error: 'Invalid company name' });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});

//to fetch specific product
app.get('/test/companies/:companyname/categories/:category/products/:productId', async (req, res) => {
    const { companyname, category, productId } = req.params;
    
    try {
        // Check if productId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: 'Invalid productId' });
        }

        // Convert productId to ObjectId
        const objectId = new mongoose.Types.ObjectId(productId);

        let product;
        switch (companyname.toUpperCase()) {
            case 'AMZ':
                product = await AmzProduct.findOne({ _id: objectId, category: category });
                break;
            case 'MYN':
                product = await MynProduct.findOne({ _id: objectId, category: category });
                break;
            case 'AZO':
                product = await AzoProduct.findOne({ _id: objectId, category: category });
                break;
            case 'FLP':
                product = await FlpProduct.findOne({ _id: objectId, category: category });
                break;
            case 'SNP':
                product = await SnpProduct.findOne({ _id: objectId, category: category });
                break;
            default:
                return res.status(400).json({ error: 'Invalid company name' });
        }

        if (!product) {
            return res.status(404).json({ Message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
});


app.listen(3001, () => {
    console.log("Server is Running on port 3001");
});
