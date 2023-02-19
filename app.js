const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
require('./db_config/database')
const authRoute = require('./routes/auth.routes');
const userRoute = require('./routes/user.routes');
const productRoute = require('./routes/product.routes');
const cartRoute = require('./routes/cart.routes');
const orderRoute = require('./routes/order.routes');
const stripeRoute = require('./routes/stripe.routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('./config/swagger.js');

app.use(cors({ origin: "*" }));
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs/swagger-ui.css', express.static('/api-docs/swagger-ui.css'));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/stripes", stripeRoute)

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, HOST, () => {
    console.log(`App Server are running at http://${HOST}:${PORT}`);
})
