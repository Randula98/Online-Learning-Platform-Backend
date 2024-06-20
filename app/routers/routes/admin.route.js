/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API endpoints for managing admin users
 */

import express from 'express';
import adminController from '../../controllers/admin.controller.js';
import { verifyToken } from '../../middlewares/User.middleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - fname
 *         - lname
 *         - contactNo
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the admin
 *         fname:
 *           type: string
 *           description: The first name of the admin
 *         lname:
 *           type: string
 *           description: The last name of the admin
 *         contactNo:
 *           type: integer
 *           description: The contact number of the admin
 *         email:
 *           type: string
 *           description: The email of the admin
 *         password:
 *           type: string
 *           description: The password of the admin
 *         createdOn:
 *           type: string
 *           format: date-time
 *           description: The date the admin was created
 *         updated:
 *           type: string
 *           format: date-time
 *           description: The date the admin was last updated
 *       example:
 *         id: d5fE_asz
 *         fname: John
 *         lname: Doe
 *         contactNo: 1234567890
 *         email: john.doe@example.com
 *         password: secret
 *         createdOn: 2023-06-15T00:00:00.000Z
 *         updated: 2023-06-16T00:00:00.000Z
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Get all admins
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, adminController.getAllAdmins);

/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     summary: Get admin by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: Admin data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Admin not found
 */
router.get('/:id', verifyToken, adminController.getAdminById);

/**
 * @swagger
 * /admins:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', adminController.createAdmin);

/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     summary: Update an existing admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Admin not found
 */
router.put('/:id', verifyToken, adminController.updateAdmin);

/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     summary: Delete an admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Admin not found
 */
router.delete('/:id', verifyToken, adminController.deleteAdmin);

/**
 * @swagger
 * /admins/login:
 *  post:
 *      summary: Login an admin
 *      tags: [Admin]
 *  requestBody:
 *      required: true
 *  content:
 *      application/json:
 *  schema:
 *      $ref: '#/components/schemas/Admin'
 *  responses:
 *      200:
 *        description: Admin logged in successfully
 *      content:
 *        application/json:
 *      schema:
 *        $ref: '#/components/schemas/Admin'
 *      400:
 *        description: Bad request
 */
router.post('/login', adminController.login);

export default router