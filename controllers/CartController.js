const Cart = require('../models/Cart');

class CartController {

    static createCart = async (req, res) => {
        try {
            const newCart = new Cart(req.body);
            const createdCart = await newCart.save();
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Add to cart item has been created successfully", data: createdCart });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static updateCart = async (req, res) => {
        try {
            const updateCart = await Cart.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                { new: true }
            );
            return res.status(200).json({ isSucess: true, state: "Success", statusCode: 200, "message": "Add to cart item has been updated successfully", data: updateCart });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static deleteCart = async (req, res) => {
        try {
            const cart = await Cart.findById(req.params.id);
            if (!cart) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "Item does not add to cart" });
            }
            await Cart.findByIdAndDelete(req.params.id);
            return res.status(200).json({ isSucess: true, state: "Success", statusCode: 200, "message": "Add to cart item has been deleted successfully" });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getCart = async (req, res) => {
        try {
            const cart = await Cart.findOne({ userId: req.params.userId });
            if (!cart && cart.length > 0) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "Add to cart item Not Found" });
            }
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Add to cart item details", data: cart._doc });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getAllCarts = async (req, res) => {
        try {

            const carts = await Cart.find();

            if (!carts || carts.length < 0) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "Add to cart item Not Found" });
            }
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Carts Item List", data: carts });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

}

module.exports = CartController;