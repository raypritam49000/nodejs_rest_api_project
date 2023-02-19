const Order = require('../models/Order');

class OrderController {

    static createOrder = async (req, res) => {
        try {
            const newOrder = new Order(req.body);
            const createdOrder = await newOrder.save();
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Order has been created successfully", data: createdOrder });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static updateOrder = async (req, res) => {
        try {
            const updateOrder = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                { new: true }
            );
            return res.status(200).json({ isSucess: true, state: "Success", statusCode: 200, "message": "Order has been updated successfully", data: Order });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static deleteOrder = async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "Order Not Found" });
            }
            await Order.findByIdAndDelete(req.params.id);
            return res.status(200).json({ isSucess: true, state: "Success", statusCode: 200, "message": "Order has been deleted successfully" });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getOrder = async (req, res) => {
        try {
            const order = await Order.find({ userId: req.params.userId });
            if (!order) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "Order Not Found" });
            }
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Order Details", data: order });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

    static getAllOrders = async (req, res) => {
        try {
            const orders = await Order.find();

            if (!orders || orders.length < 0) {
                return res.status(404).json({ isSuccess: false, state: "Not Found", statusCode: 404, "message": "Orders Not Found" });
            }
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Orders List", data: orders });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }


    static getMonthlyIncome = async (req, res) => {

        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
        try {

            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: previousMonth } } },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        sales: "$amount"
                    }
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: "$sales" }
                    }
                }

            ])
            return res.status(200).json({ isSuccess: true, state: "Success", statusCode: 200, "message": "Get User Monthly Income", data: income });
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

}

module.exports = OrderController;