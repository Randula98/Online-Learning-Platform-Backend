/**
 * @swagger
 * tags:
 *   name: Notice
 *   description: API endpoints for managing course notices
 */

import express from 'express';
import noticeController from '../../controllers/notice.controller.js';
import { verifyToken } from '../../middlewares/User.middleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Notice:
 *       type: object
 *       required:
 *         - topic
 *         - description
 *       properties:
 *         topic:
 *           type: string
 *           description: The topic of the notice
 *         description:
 *           type: string
 *           description: The description of the notice
 *         course:
 *           type: string
 *           format: uuid
 *           description: The ID of the course this notice belongs to
 *         createdOn:
 *           type: string
 *           format: date-time
 *           description: When the notice was created
 *         updatedOn:
 *           type: string
 *           format: date-time
 *           description: When the notice was last updated
 */

/**
 * @swagger
 * /notices:
 *   get:
 *     summary: Retrieve a list of notices
 *     tags: [Notice]
 *     responses:
 *       200:
 *         description: A list of notices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notice'
 */
router.get('/', verifyToken, noticeController.getAllNotices);

/**
 * @swagger
 * /notices/{id}:
 *   get:
 *     summary: Retrieve a single notice by ID
 *     tags: [Notice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The notice ID
 *     responses:
 *       200:
 *         description: A single notice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notice'
 */
router.get('/:id', verifyToken, noticeController.getNoticeById);

/**
 * @swagger
 * /notices:
 *   post:
 *     summary: Create a new notice
 *     tags: [Notice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notice'
 *     responses:
 *       201:
 *         description: The created notice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notice'
 */
router.post('/', verifyToken, noticeController.createNotice);

/**
 * @swagger
 * /notices/{id}:
 *   put:
 *     summary: Update a notice by ID
 *     tags: [Notice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The notice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notice'
 *     responses:
 *       200:
 *         description: The updated notice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notice'
 */
router.put('/:id', verifyToken, noticeController.updateNotice);

/**
 * @swagger
 * /notices/{id}:
 *   delete:
 *     summary: Delete a notice by ID
 *     tags: [Notice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The notice ID
 *     responses:
 *       204:
 *         description: No content
 */
router.delete('/:id', verifyToken, noticeController.deleteNotice);

/**
 * @swagger
 * /notices/course/{courseId}:
 *   get:
 *     summary: Retrieve notices by course ID
 *     tags: [Notice]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: A list of notices for the specified course
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notice'
 */
router.get('/course/:courseId', verifyToken, noticeController.getNoticesByCourseId);

export default router;