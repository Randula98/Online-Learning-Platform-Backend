import Student from "../models/student.model.js";
import { createToken } from "../middlewares/User.middleware.js";

export const getAllStudents = async () => {
    return await Student.find().populate("enrolledCourses");
}

export const getStudentById = async (id) => {
    return await Student.findById(id).populate("enrolledCourses");
}

export const createStudent = async (student) => {
    return await Student.create(student);
}

export const updateStudent = async (id, student) => {
    return await Student.findByIdAndUpdate
        (id, student, { new: true });
}

export const deleteStudent = async (id) => {
    return await Student.findByIdAndDelete(id);
}

const login = async (email, password) => {
    const student = await Student.findOne
        ({ email: email });
    if (!student) {
        return ({ user: false, password: false, message: 'User not found' });
    }
    student.comparePassword(password, (error, match) => {
        if (!match) {
            return ({ user: true, password: false, message: 'Wrong Password' })
        }
        const token = createToken(student);
        return ({ user: true, password: true, token: token, student: student })
    });
}

export default {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    login
};