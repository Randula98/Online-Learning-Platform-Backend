/**
 * @swagger
 * tags:
 *   name: Content
 *   description: API endpoints for managing course contents
 */

import express from 'express';
import contentController from '../../controllers/content.controller.js';
import { verifyToken } from '../../middlewares/User.middleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       required:
 *         - week
 *         - topic
 *         - fileUrl
 *       properties:
 *         week:
 *           type: string
 *           description: The week of the content
 *         topic:
 *           type: string
 *           description: The topic of the content
 *         fileUrl:
 *           type: string
 *           description: The URL of the file
 *         course:
 *           type: string
 *           description: The course ID
 *         createdOn:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *         updatedOn:
 *           type: string
 *           format: date-time
 *           description: The update timestamp
 */

/**
 * @swagger
 * /content:
 *   get:
 *     summary: Retrieve a list of contents
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of contents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 */
router.get('/', verifyToken, contentController.getAllContents);

/**
 * @swagger
 * /content/{id}:
 *   get:
 *     summary: Get a content by ID
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The content ID
 *     responses:
 *       200:
 *         description: The content description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: Content not found
 */
router.get('/:id', verifyToken, contentController.getContentById);

/**
 * @swagger
 * /content:
 *   post:
 *     summary: Create a new content
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       201:
 *         description: Content created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Bad request
 */
router.post('/', verifyToken, contentController.createContent);

/**
 * @swagger
 * /content/{id}:
 *   put:
 *     summary: Update an existing content
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'
 *     responses:
 *       200:
 *         description: Content updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Content not found
 */
router.put('/:id', verifyToken, contentController.updateContent);

/**
 * @swagger
 * /content/{id}:
 *   delete:
 *     summary: Delete a content by ID
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The content ID
 *     responses:
 *       200:
 *         description: Content deleted successfully
 *       404:
 *         description: Content not found
 */
router.delete('/:id', verifyToken, contentController.deleteContent);

/**
 * @swagger
 * /content/course/{courseId}:
 *   get:
 *     summary: Retrieve contents by course ID
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: A list of contents for the specified course
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Content'
 */
router.get('/course/:courseId', verifyToken, contentController.getContentsByCourseId);

export default router;
