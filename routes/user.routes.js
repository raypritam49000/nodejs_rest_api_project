const express = require("express");
const route = express.Router();
const UserController = require("../controllers/UserController");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *      tags:
 *          - UserController
 *      summary: "User Update Api"
 *      description: "This api is use to register a user"
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description : User Id Required
 *            schema:
 *              type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          isAdmin:
 *                              type: boolean
 *              example:
 *                  username: "user"
 *                  email: "user@root.com"
 *                  password: "root"
 *                  isAdmin: true
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "User Update Api Response"
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
 *                                      username:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                                      password:
 *                                          type: string
 *                                      isAdmin:
 *                                          type: boolean 
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
route.put("/:id", verifyTokenAndAuthorization, UserController.updateUser);


/**
* @swagger
* /api/users/{id}:
*  delete:
*      summary: Delete User By Id Api
*      tags:
*        - UserController
*      description : This api is used to delete data from mongodb
*      parameters:
*          - in: path
*            name: id
*            required: true
*            description : User Id Required
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
route.delete("/:id", verifyTokenAndAdmin, UserController.deleteUser);

/**
* @swagger
* /api/users/find/{id}:
*  get:
*      summary: Get User By Id Api
*      tags:
*        - UserController
*      description : This api is used to fetch data from mongodb
*      parameters:
*          - in: path
*            name: id
*            required: true
*            description : User Id Required
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
*                                      username:
*                                          type: string
*                                      email:
*                                          type: string
*                                      password:
*                                          type: string
*                                      isAdmin:
*                                          type: boolean 
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
route.get("/find/:id", verifyTokenAndAdmin, UserController.getUser);

/**
 * @swagger
 *  components:
 *      schema:
 *          User: 
 *              type: object
 *              properties:
 *                  username: 
 *                       type: string               
 *                  email:
 *                       type: string
 *                  password:
 *                       type: string
 *                  isAdmin:
 *                       type: boolean
 *    
 */

/**
* @swagger
* /api/users/findAll:
*  get:
*      summary: Get All Users Api
*      tags:
*        - UserController
*      description : this api is used to fetch data from mongodb
*      responses:
*          200:
*              description: this api is used to fetch data from mongodb
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
*                                   $ref: '#/components/schema/User'
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

route.get("/findAll", verifyTokenAndAdmin, UserController.getAllUsers);

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
* /api/users/stats:
*  get:
*      summary: Get User Stats Api
*      tags:
*        - UserController
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
route.get("/stats", verifyTokenAndAdmin, UserController.userStats);


module.exports = route;