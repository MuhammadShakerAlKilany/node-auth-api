const user = require("../module/user");
const bcrypt = require('bcrypt');
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 1
 *                 maxLength: 255
 *                 example: pass12345
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login Success
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60c72b2f5f1b2c001c8e4c1a
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *       400:
 *         description: Login failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Login Failed
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 1
 *                 maxLength: 255
 *                 example: pass12345
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 255
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Register Success
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60c72b2f5f1b2c001c8e4c1a
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *       400:
 *         description: Registration failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Register Failed
 *       406:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Email Already Exist
 */
module.exports = {
  login: (req, res) => {
    user
      .findOne({ email: req.body.email })
      .then(async (user) => {
        if (user) {
         const isMatch = await bcrypt.compare(req.body.password, user.password)
          if (isMatch) {
            res.send({
              success: true,
              message: "Login Success",
              user,
            });
          } else {
            res.send({
              success: false,
              message: "Login Failed",
            },400);
          }
        } else {
          res.send({
            success: false,
            message: "Login Failed",
          },400);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  },
  register: async (req, res) => {
    try { 
    const saltRounds = 10;
    const userFind = await user.findOne({ email: req.body.email });
    if (userFind) {
      res.send({
        success: false,
        message: "Email Already Exist",
      },406);
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash
    user
      .create(req.body)
      .then((user) => {
        if (!user) {
          res.send({
            success: false,
            message: "Register Failed",
          },400);
        }
        user = user.toObject();
        user.password = undefined;
        res.send({
          success: true,
          message: "Register Success",
          user,
        },201);
      })
      .catch((err) => {
        console.log("error", err);
        res.send(err,500);
      });
    } catch (error) {
      res.send(error,500);
    }
  },
};
