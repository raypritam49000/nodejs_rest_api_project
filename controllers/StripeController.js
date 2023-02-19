const stripe = require('stripe')(process.env.STRIPE_KEY);

class StripeController {

    static payment = async (req, res) => {
        try {
            const { stripeErr, stripeRes } = await stripe.charges.create({
                source: req.body.tokenId,
                amount: req.body.amount,
                currency: "usd"
            });

            if (stripeErr) {
                return res.status(500).json({ isSuccess: false, state: "Payment Failure", statusCode: 500, "message": stripeErr });
            }
            if (stripeRes) {
                return res.status(200).json({ isSucess: true, state: "Success", statusCode: 200, "message": "User payment has been done", "paymentDate": stripeRes });
            }
        } catch (error) {
            return res.status(500).json({ isSucess: false, state: "Internal Server Error", statusCode: 501, "message": "Server Error" });
        }
    }

}

module.exports = StripeController;