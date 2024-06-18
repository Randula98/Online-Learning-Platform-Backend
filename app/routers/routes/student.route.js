/**
 * @swagger
 * tags:
 *   name: Student
 *   description: API endpoints for managing student users
 */

import express from 'express';
import studentController from '../../controllers/student.controller.js';
import { verifyToken } from '../../middlewares/User.middleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - fname
 *         - lname
 *         - contactNo
 *         - email
 *         - password
 *       properties:
 *         fname:
 *           type: string
 *           description: First name of the student
 *         lname:
 *           type: string
 *           description: Last name of the student
 *         contactNo:
 *           type: integer
 *           description: Contact number of the student
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the student
 *         password:
 *           type: string
 *           description: Password for the student's account
 *         enrolledCourses:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *             description: IDs of courses the student is enrolled in
 *         createdOn:
 *           type: string
 *           format: date-time
 *           description: When the student was created
 *         updated:
 *           type: string
 *           format: date-time
 *           description: When the student was last updated
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retrieve a list of students
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get('/', verifyToken, studentController.getAllStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Retrieve a single student by ID
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       200:
 *         description: A single student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */
router.get('/:id', verifyToken, studentController.getStudentById);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: The created student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */
router.post('/', studentController.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: The updated student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */
router.put('/:id', verifyToken, studentController.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The student ID
 *     responses:
 *       204:
 *         description: No content
 */
router.delete('/:id', verifyToken, studentController.deleteStudent);

/**
 * @swagger
 * /students/login:
 *   post:
 *     summary: Login a student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The student's email
 *               password:
 *                 type: string
 *                 description: The student's password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', studentController.login);

export default router;