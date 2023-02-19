const express = require("express");
const route = express.Router();
const AuthController = require("../controllers/AuthController");

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      tags:
 *          - AuthController
 *      summary: "User Login Api"
 *      description: "This Api is used to user login"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *              example:
 *                  username: "user"
 *                  password: "root"
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Login Response Api"
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
 *                                      accessToken:
 *                                          type: string
 *          409:
 *              description: "User Does Not Register Api Response"
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
route.post("/login", AuthController.login);

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      tags:
 *          - AuthController
 *      summary: "User Register Api"
 *      description: "This api is use to register a user"
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
 *          201:
 *              description: "Register Api Response"
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
 *          409:
 *              description: "User Already Register Api Response"
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
route.post("/register", AuthController.register);


module.exports = route;