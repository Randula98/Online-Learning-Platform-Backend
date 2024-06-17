/**
 * @swagger
 * tags:
 *   name: Announcement
 *   description: API endpoints for managing announcements
 */

import express from 'express';
import announcementController from '../../controllers/announcement.controller.js';
import { verifyToken } from '../../middlewares/user.middleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Announcement:
 *       type: object
 *       required:
 *         - topic
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the announcement
 *         topic:
 *           type: string
 *           description: The topic of the announcement
 *         description:
 *           type: string
 *           description: The description of the announcement
 *         createdOn:
 *           type: string
 *           format: date-time
 *           description: The date the announcement was created
 *         updatedOn:
 *           type: string
 *           format: date-time
 *           description: The date the announcement was last updated
 *       example:
 *         id: d5fE_asz
 *         topic: New Course Available
 *         description: A new course on advanced Node.js has been released.
 *         createdOn: 2023-06-15T00:00:00.000Z
 *         updatedOn: 2023-06-16T00:00:00.000Z
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /announcements:
 *   get:
 *     summary: Get all announcements
 *     tags: [Announcement]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of announcements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Announcement'
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, announcementController.getAllAnnouncements);

/**
 * @swagger
 * /announcements/{id}:
 *   get:
 *     summary: Get announcement by ID
 *     tags: [Announcement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The announcement ID
 *     responses:
 *       200:
 *         description: Announcement data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Announcement not found
 */
router.get('/:id', verifyToken, announcementController.getAnnouncementById);

/**
 * @swagger
 * /announcements:
 *   post:
 *     summary: Create a new announcement
 *     tags: [Announcement]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Announcement'
 *     responses:
 *       201:
 *         description: Announcement created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyToken, announcementController.createAnnouncement);

/**
 * @swagger
 * /announcements/{id}:
 *   put:
 *     summary: Update an existing announcement
 *     tags: [Announcement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The announcement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Announcement'
 *     responses:
 *       200:
 *         description: Announcement updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Announcement not found
 */
router.put('/:id', verifyToken, announcementController.updateAnnouncement);

/**
 * @swagger
 * /announcements/{id}:
 *   delete:
 *     summary: Delete an announcement
 *     tags: [Announcement]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The announcement ID
 *     responses:
 *       200:
 *         description: Announcement deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Announcement not found
 */
router.delete('/:id', verifyToken, announcementController.deleteAnnouncement);

export default router;
