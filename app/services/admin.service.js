import Admin from "../models/admin.model.js";
import { createToken } from "../middlewares/User.middleware.js";

const getAllAdmins = async () => {
    return await Admin.find();
}

const getAdminById = async (id) => {
    return await Admin.findById(id);
}

const createAdmin = async (admin) => {
    return await Admin.create(admin);
}

const updateAdmin = async (id, admin) => {
    return await Admin.findByIdAndUpdate
        (id, admin, { new: true });
}

const deleteAdmin = async (id) => {
    return await Admin.findByIdAndDelete(id);
}

const login = async (email, password) => {
    const admin = await Admin.findOne
        ({ email: email });
    if (!admin) {
        return ({ user: false, password: false, message: 'User not found' });
    }
    admin.comparePassword(password, (error, match) => {
        if (!match) {
            return ({ user: true, password: false, message: 'Wrong Password' })
        }
        const token = createToken(admin);
        return ({ user: true, password: true, token: token, admin: admin })
    });
}

export default {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    login
};