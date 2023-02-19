const express = require("express");
const route = express.Router();
const OrderController = require("../controllers/OrderController");
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("../middleware/verifyToken");


/**
 * @swagger
 *  components:
 *      schema:
 *           Order: 
 *              type: object
 *              properties:
 *                  productId:
 *                     type: string
 *                  quantity:
 *                     type: number    
 */

/**
 * @swagger
 * /api/orders/:
 *  post:
 *      tags:
 *          - OrderController
 *      summary: "Order Create Api"
 *      description: "This api is use to create order"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                             type: string
 *                          products:
 *                             type: array
 *                             items:
 *                              $ref: '#/components/schema/Order'
 *                          amount:
 *                             type: number
 *                          address:
 *                              type: object
 *                          status:
 *                             type: string 
 *      produces:
 *          - application/json
 *      responses:
 *          201:
 *              description: "Order Created Api Response"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              isSuccess:
 *                                  type: boolean
 *                              status:
 *                                  type: string
 *                              statusCode:
 *                                  type: number
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      userId:
 *                                         type: string
 *                                      products:
 *                                         type: array
 *                                         items:
 *                                          $ref: '#/components/schema/Order'
 *                                      amount:
 *                                         type: number
 *                                      address:
 *                                         type: object
 *                                      status:
 *                                         type: string 
 *          403,501:
 *              description: "Forbidden Error or Internal Server Error"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              isSuccess:
 *                                  type: boolean
 *                              status:
 *                                  type: string
 *                              statusCode:
 *                                  type: number
 *                              message:
 *                                  type: string
 */
route.post("/", verifyToken, OrderController.createOrder);

/**
 * @swagger
 * /api/orders/:
 *  put:
 *      tags:
 *          - OrderController
 *      summary: "Update Order Api"
 *      description: "This api is use to update order"
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description : Order Id Required
 *            schema:
 *              type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                             type: string
 *                          products:
 *                             type: array
 *                             items:
 *                              $ref: '#/components/schema/Order'
 *                          amount:
 *                             type: number
 *                          address:
 *                              type: object
 *                          status:
 *                             type: string 
 *      produces:
 *          - application/json
 *      responses:
 *          201:
 *              description: "Order Updated Api Response"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              isSuccess:
 *                                  type: boolean
 *                              status:
 *                                  type: string
 *                              statusCode:
 *                                  type: number
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      userId:
 *                                         type: string
 *                                      products:
 *                                         type: array
 *                                         items:
 *                                          $ref: '#/components/schema/Order'
 *                                      amount:
 *                                         type: number
 *                                      address:
 *                                         type: object
 *                                      status:
 *                                         type: string 
 *          403,501:
 *              description: "Forbidden Error or Internal Server Error"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              isSuccess:
 *                                  type: boolean
 *                              status:
 *                                  type: string
 *                              statusCode:
 *                                  type: number
 *                              message:
 *                                  type: string
 */
route.put("/:id", verifyTokenAndAdmin, OrderController.updateOrder);

/**
* @swagger
* /api/orders/{id}:
*  delete:
*      summary: Delete Order By Id Api
*      tags:
*        - OrderController
*      description : This api is used to delete data from mongodb
*      parameters:
*          - in: path
*            name: id
*            required: true
*            description : Order Id Required
*            schema:
*              type: string
*      responses:
*          200:
*              description: This api is used to delete data from mongodb
*              content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              isSuccess:
*                                  type: boolean
*                              status:
*                                  type: string
*                              statusCode:
*                                  type: number
*                              message:
*                                  type: string
*          401,403,404,501:
*              description: "Not Found or UnAuthorized or Forbidden User Api Response or Internal Server Error"
*              content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              isSuccess:
*                                  type: boolean
*                              status:
*                                  type: string
*                              statusCode:
*                                  type: number
*                              message:
*                                  type: string
*      
*/
route.delete("/:id", verifyTokenAndAdmin, OrderController.deleteOrder);

/**
 * @swagger
 * /api/orders/find/{userId}:
 *  get:
 *      tags:
 *          - OrderController
 *      summary: "Get Order By UserId By Id"
 *      description: "This api is use to get order by user id"
 *      parameters:
 *          - in: path
 *            name: userId
 *            required: true
 *            description : User Id Required
 *            schema:
 *              type: string
 *      responses:
 *          201:
 *              description: "Get Order By UserId Api Response"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              isSuccess:
 *                                  type: boolean
 *                              status:
 *                                  type: string
 *                              statusCode:
 *                                  type: number
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: array
 *                                  items:
 *                                    $ref: '#/components/schema/Data'
 *          403,501:
 *              description: "Forbidden Error or Internal Server Error"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              isSuccess:
 *                                  type: boolean
 *                              status:
 *                                  type: string
 *                              statusCode:
 *                                  type: number
 *                              message:
 *                                  type: string
 */
route.get("/find/:userId", verifyTokenAndAuthorization, OrderController.getOrder);

/**
 * @swagger
 *  components:
 *      schema:
 *           Data: 
 *              type: object
 *              properties:
 *                  userId:
 *                     type: string
 *                  products:
 *                     type: array
 *                     items:
 *                      $ref: '#/components/schema/Order'
 *                  amount:
 *                     type: number
 *                  address:
 *                     type: object
 *                  status:
 *                     type: string  
 */

/**
 * @swagger
 * /api/orders/:
 *  get:
 *      tags:
 *          - OrderController
 *      summary: "Get All Order Api"
 *      description: "This api is use to get all orders"
 *      responses:
 *          201:
 *              description: "Get All Orders Api Response"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              isSuccess:
 *                                  type: boolean
 *                              status:
 *                                  type: string
 *                              statusCode:
 *                                  type: number
 *                              message:
 *                                  type: string
 *                              data:                             
 *                                  type: array
 *                                  items:
 *                                   $ref: '#/components/schema/Data'
 *          403,501:
 *              description: "Forbidden Error or Internal Server Error"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              isSuccess:
 *                                  type: boolean
 *                              status:
 *                                  type: string
 *                              statusCode:
 *                                  type: number
 *                              message:
 *                                  type: string
 */
route.get("/", verifyTokenAndAdmin, OrderController.getAllOrders);

/**
 * @swagger
 *  components:
 *      schema:
 *          Stats: 
 *              type: object
 *              properties:
 *                  _id: 
 *                       type: string               
 *                  total:
 *                       type: number  
 */

/**
* @swagger
* /api/orders/income:
*  get:
*      summary: Get User Income Api
*      tags:
*        - OrderController
*      description : This api is used to fetch data from mongodb
*      responses:
*          200:
*              description: This api is used to fetch data from mongodb
*              content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              isSuccess:
*                                  type: boolean
*                              status:
*                                  type: string
*                              statusCode:
*                                  type: number
*                              message:
*                                  type: string
*                              data:
*                                  type: array
*                                  items:
*                                   $ref: '#/components/schema/Stats'
*                                 
*          401,403,404:
*              description: "User Not Found or UnAuthorized or Forbidden User Api Response"
*              content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              isSuccess:
*                                  type: boolean
*                              status:
*                                  type: string
*                              statusCode:
*                                  type: number
*                              message:
*                                  type: string
*          501:
*              description: "Internal Server Error"
*              content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              isSuccess:
*                                  type: boolean
*                              status:
*                                  type: string
*                              statusCode:
*                                  type: number
*                              message:
*                                  type: string
*/
route.get('/income',verifyTokenAndAdmin,OrderController.getMonthlyIncome);

module.exports = route;