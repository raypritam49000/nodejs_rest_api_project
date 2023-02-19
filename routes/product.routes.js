const express = require("express");
const route = express.Router();
const ProductController = require("../controllers/ProductController");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

/**
 * @swagger
 * /api/products/:
 *  post:
 *      tags:
 *          - ProductController
 *      summary: "Product Create Api"
 *      description: "This api is use to create product"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                             type: string
 *                          desc:
 *                             type: string
 *                          img:
 *                             type: string
 *                          categories:
 *                              type: array
 *                              items:
 *                                type: string
 *                          size:
 *                             type: string 
 *                          color:
 *                             type: string
 *                          price:
 *                             type: number
 *      produces:
 *          - application/json
 *      responses:
 *          201:
 *              description: "Product Created Api Response"
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
 *                                      title:
 *                                          type: string
 *                                      desc:
 *                                          type: string
 *                                      img:
 *                                          type: string
 *                                      categories:
 *                                          type: array
 *                                          items:
 *                                            type: string
 *                                      size:
 *                                          type: string 
 *                                      color:
 *                                          type: string
 *                                      price:
 *                                          type: number
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
route.post("/", verifyTokenAndAdmin, ProductController.createProduct);

/**
 * @swagger
 * /api/products/:
 *  put:
 *      tags:
 *          - ProductController
 *      summary: "Product Update Api"
 *      description: "This api is use to update product"
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description : Product Id Required
 *            schema:
 *              type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                             type: string
 *                          desc:
 *                             type: string
 *                          img:
 *                             type: string
 *                          categories:
 *                              type: array
 *                              items:
 *                                type: string
 *                          size:
 *                             type: string 
 *                          color:
 *                             type: string
 *                          price:
 *                             type: number
 *      produces:
 *          - application/json
 *      responses:
 *          201:
 *              description: "Product Updated Api Response"
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
 *                                      title:
 *                                          type: string
 *                                      desc:
 *                                          type: string
 *                                      img:
 *                                          type: string
 *                                      categories:
 *                                          type: array
 *                                          items:
 *                                            type: string
 *                                      size:
 *                                          type: string 
 *                                      color:
 *                                          type: string
 *                                      price:
 *                                          type: number
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
route.put("/:id", verifyTokenAndAdmin, ProductController.updateProduct);

/**
* @swagger
* /api/products/{id}:
*  delete:
*      summary: Delete Product By Id Api
*      tags:
*        - ProductController
*      description : This api is used to delete data from mongodb
*      parameters:
*          - in: path
*            name: id
*            required: true
*            description : Product Id Required
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
route.delete("/:id", verifyTokenAndAdmin, ProductController.deleteProduct);

/**
* @swagger
* /api/products/find/{id}:
*  get:
*      summary: Get Product By Id Api
*      tags:
*        - ProductController
*      description : This api is used to fetch data from mongodb
*      parameters:
*          - in: path
*            name: id
*            required: true
*            description : Product Id Required
*            schema:
*              type: string
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
*                                  type: object
*                                  properties:
*                                      title:
*                                          type: string
*                                      desc:
*                                          type: string
*                                      img:
*                                          type: string
*                                      categories:
*                                          type: string
*                                      size:
*                                          type: number 
*                                      color:
*                                          type: string
*                                      price:
*                                          type: number
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
route.get("/find/:id", verifyTokenAndAdmin, ProductController.getProduct);

/**
 * @swagger
 *  components:
 *      schema:
 *          Product: 
 *              type: object
 *              properties:
 *                  title:
 *                     type: string
 *                  desc:
 *                     type: string
 *                  img:
 *                     type: string
 *                  categories:
 *                     type: string
 *                  size:
 *                     type: number 
 *                  color:
 *                     type: string
 *                  price:
 *                     type: number 
 *    
 */

/**
* @swagger
* /api/products/findAll:
*  get:
*      summary: Get All Product Api
*      tags:
*        - ProductController
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
*                                   $ref: '#/components/schema/Product'
*          401,403,404:
*              description: "Not Found or UnAuthorized or Forbidden User Api Response"
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
route.get("/findAll", verifyTokenAndAdmin, ProductController.getAllProducts);



module.exports = route;