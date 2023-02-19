const Product = require('../models/Product');

class ProductController {

    static createProduct = async (req, res) => {
        try {
            const newProduct = new Product({
                title: req.body.title,
                desc: req.body.desc,
                img: req.body.img,
                categories: req.body.categories,
                size: req.body.size,
                color: req.body.color,
                price: req.body.price
            });
            const createdProduct = await newProduct.save();
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Product has been created successfully", data: createdProduct });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static updateProduct = async (req, res) => {
        try {
            const updateProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                { new: true }
            );
            return res.status(200).json({ isSucess: true, state: "Success", statusCode: 200, "message": "Product has been updated successfully", data: updateProduct });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static deleteProduct = async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "Product Not Found" });
            }
            await Product.findByIdAndDelete(req.params.id);
            return res.status(200).json({ isSucess: true, state: "Success", statusCode: 200, "message": "Product has been deleted successfully" });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getProduct = async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "Product Not Found" });
            }
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Product Details", data: product });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getAllProducts = async (req, res) => {
        try {
            const qNew = req.query.new;
            const qCategory = req.query.category;
            let products;

            if (qNew) {
                products = await Product.find().sort({ createdAt: -1 }).limit(5);
            }
            else if (qCategory) {
                products = await Product.find({
                    categories: {
                        $in: [qCategory]
                    }
                });
            }
            else {
                products = await Product.find()
            }

            if (!products) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "Product Not Found" });
            }
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Products List", data: products });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }


}

module.exports = ProductController;