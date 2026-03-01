const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
const port = 5000;

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/onlineshop')
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log(err));

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

const Product = mongoose.model('Product', productSchema);

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send("Online Shop API is running");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// DELETE product
app.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});