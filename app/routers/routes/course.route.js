/**
 * @swagger
 * tags:
 *   name: Course
 *   description: API endpoints for managing courses
 */

import express from 'express';
import courseController from '../../controllers/course.controller.js';
import { verifyToken } from '../../middlewares/User.middleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - courseName
 *         - displayName
 *         - moduleCode
 *         - academicYear
 *         - academicSemester
 *         - specialization
 *         - courseYear
 *         - courseMonth
 *       properties:
 *         courseName:
 *           type: string
 *           description: Name of the course
 *         displayName:
 *           type: string
 *           description: Display name of the course
 *         moduleCode:
 *           type: string
 *           description: Module code of the course
 *         academicYear:
 *           type: string
 *           description: Academic year of the course
 *         academicSemester:
 *           type: string
 *           description: Academic semester of the course
 *         specialization:
 *           type: string
 *           description: Specialization of the course
 *         courseYear:
 *           type: string
 *           description: Course year
 *         courseMonth:
 *           type: string
 *           description: Course month
 *         notices:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *           description: Notices associated with the course
 *         content:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *           description: Content associated with the course
 *         createdOn:
 *           type: string
 *           format: date-time
 *           description: When the course was created
 *         updatedOn:
 *           type: string
 *           format: date-time
 *           description: When the course was last updated
 */



/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Retrieve a list of courses
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/', verifyToken, courseController.getAllCourses);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Retrieve a single course by ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: A single course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */
router.get('/:id', verifyToken, courseController.getCourseById);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: The created course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */
router.post('/', courseController.createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: The updated course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */
router.put('/:id', verifyToken, courseController.updateCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       204:
 *         description: No content
 */
router.delete('/:id', verifyToken, courseController.deleteCourse);

export default router;