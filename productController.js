const Product = require("../models/Product");
const fs = require("fs");

// CREATE
exports.createProduct = async (req, res) => {
try {

const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.file ? req.file.filename : null
});

await product.save();

res.status(201).json(product);

} catch (error) {
res.status(500).json({ message: error.message });
}
};


// GET ALL
exports.getProducts = async (req, res) => {
try {

const products = await Product.find();

res.json(products);

} catch (error) {
res.status(500).json({ message: error.message });
}
};


// GET SINGLE
exports.getProduct = async (req, res) => {
try {

const product = await Product.findById(req.params.id);

if (!product) {
    return res.status(404).json({ message: "Product not found" });
}

res.json(product);

} catch (error) {
res.status(500).json({ message: error.message });
}
};


// UPDATE
exports.updateProduct = async (req, res) => {
try {

const product = await Product.findById(req.params.id);

if (!product) {
    return res.status(404).json({ message: "Product not found" });
}

if (req.file) {

    if (product.image) {
        fs.unlinkSync("uploads/" + product.image);
    }

    product.image = req.file.filename;
}

product.name = req.body.name || product.name;
product.description = req.body.description || product.description;
product.price = req.body.price || product.price;

await product.save();

res.json(product);

} catch (error) {
res.status(500).json({ message: error.message });
}
};


// DELETE
exports.deleteProduct = async (req, res) => {
try {

const product = await Product.findById(req.params.id);

if (!product) {
    return res.status(404).json({ message: "Product not found" });
}

if (product.image) {
    fs.unlinkSync("uploads/" + product.image);
}

await product.deleteOne();

res.json({ message: "Product deleted" });

} catch (error) {
res.status(500).json({ message: error.message });
}
};