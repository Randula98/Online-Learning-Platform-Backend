import studentService from "../services/student.service.js";

const getAllStudents = async (req, res) => {
    try {
        const students = (await studentService.getAllStudents()).reverse();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getStudentById = async (req, res) => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createStudent = async (req, res) => {
    try {
        const student = await studentService.createStudent(req.body);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateStudent = async (req, res) => {
    try {
        const student = await studentService.updateStudent(req.params.id, req.body);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteStudent = async (req, res) => {
    try {
        const student = await studentService.deleteStudent(req.params.id);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await studentService.login(email, password);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    login
};