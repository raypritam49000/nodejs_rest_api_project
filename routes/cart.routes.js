const express = require("express");
const route = express.Router();
const CartController = require("../controllers/CartController");
const { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("../middleware/verifyToken");


/**
 * @swagger
 *  components:
 *      schema:
 *           Products: 
 *              type: object
 *              properties:
 *                  productId:
 *                     type: string
 *                  quantity:
 *                     type: number    
 */

/**
 * @swagger
 * /api/carts/:
 *  post:
 *      tags:
 *          - CartController
 *      summary: "Cart Create Api"
 *      description: "This api is use to create cart"
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
 *                              $ref: '#/components/schema/Products'
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
 *                                          $ref: '#/components/schema/Products'
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
route.post("/", verifyToken, CartController.createCart);

/**
 * @swagger
 * /api/carts/{id}:
 *  put:
 *      tags:
 *          - CartController
 *      summary: "Cart Update Api"
 *      description: "This api is use to update cart"
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description : Cart Id Required
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
 *                              $ref: '#/components/schema/Products'
 *      responses:
 *          200:
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
 *                                          $ref: '#/components/schema/Products'
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
route.put("/:id", verifyTokenAndAuthorization, CartController.updateCart);

/**
* @swagger
* /api/carts/{id}:
*  delete:
*      summary: Delete Cart By Id Api
*      tags:
*        - CartController
*      description : This api is used to delete data from mongodb
*      parameters:
*          - in: path
*            name: id
*            required: true
*            description : Cart Id Required
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
route.delete("/:id", verifyTokenAndAuthorization, CartController.deleteCart);

/**
 * @swagger
 *  components:
 *      schema:
 *           Products: 
 *              type: object
 *              properties:
 *                  productId:
 *                     type: string
 *                  quantity:
 *                     type: number    
 */


/**
 * @swagger
 *  components:
 *      schema:
 *           CartData: 
 *               type: object
 *               properties:
 *                   userId:
 *                      type: string
 *                   products:
 *                       type: array
 *                       items:
 *                        $ref: '#/components/schema/Products'
 */

/**
 * @swagger
 * /api/carts/find/{userId}:
 *  get:
 *      tags:
 *          - CartController
 *      summary: "Get Cart By User Id Api"
 *      description: "This api is use to get cart by id"
 *      parameters:
 *          - in: path
 *            name: userId
 *            required: true
 *            description : User Id Required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: "Get Cart By Id Api Response"
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
 *                                    $ref: '#/components/schema/CartData'
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
route.get("/find/:userId", verifyTokenAndAuthorization, CartController.getCart);

/**
 * @swagger
 * /api/carts/:
 *  get:
 *      tags:
 *          - CartController
 *      summary: "Get Cart By Users Api"
 *      description: "This api is use to get carts"
 *      responses:
 *          200:
 *              description: "Get Carts Api Response"
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
 *                                    $ref: '#/components/schema/CartData'
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
route.get("/", verifyTokenAndAdmin, CartController.getAllCarts);

module.exports = route;