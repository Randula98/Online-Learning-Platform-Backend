import Student from "../models/student.model.js";
import { createToken } from "../middlewares/User.middleware.js";

const getAllStudents = async () => {
    return await Student.find().populate("enrolledCourses");
}

const getStudentById = async (id) => {
    return await Student.findById(id).populate("enrolledCourses");
}

const createStudent = async (student) => {
    return await Student.create(student);
}

const updateStudent = async (id, student) => {
    return await Student.findByIdAndUpdate
        (id, student, { new: true });
}

const deleteStudent = async (id) => {
    return await Student.findByIdAndDelete(id);
}

const login = async (email, password) => {
    try {
        const student = await Student.findOne({ email: email });
        if (!student) {
            return { user: false, password: false, message: 'User not found' };
        }

        const isMatch = await new Promise((resolve, reject) => {
            student.comparePassword(password, (error, match) => {
                if (error) return reject(error);
                resolve(match);
            });
        });

        if (!isMatch) {
            return { user: true, password: false, message: 'Wrong Password' };
        }

        const token = createToken(student);
        return { user: true, password: true, token: token, type: 'student' };
    } catch (error) {
        throw new Error('Error during login process');
    }
};

//enroll student to a course
const enrollStudent = async (studentId, courseId) => {
    try {
        const student = await Student.findById(studentId);
        console.log(student);
        student.enrolledCourses.push(courseId);
        await student.save();
        return student;
    } catch (error) {
        throw new Error('Error during enrollment process');
    }
}

//unenroll student from a course
const unenrollStudent = async (studentId, courseId) => {
    console.log(studentId, courseId);
    try {
        const student = await Student.findById(studentId);
        console.log(student);
        student.enrolledCourses.pull(courseId);
        await student.save();
        return student;
    } catch (error) {
        throw new Error('Error during unenrollment process');
    }
}

export default {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    login,
    enrollStudent,
    unenrollStudent
};