import adminService from "../services/admin.service.js";

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminService.getAllAdmins();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAdminById = async (req, res) => {
    try {
        const admin = await adminService.getAdminById(req.params.id);
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createAdmin = async (req, res) => {
    try {
        const admin = await adminService.createAdmin(req.body);
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateAdmin = async (req, res) => {
    try {
        const admin = await adminService.updateAdmin(req.params.id, req.body);
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteAdmin = async (req, res) => {
    try {
        const admin = await adminService.deleteAdmin(req.params.id);
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminService.login(email, password);
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export default {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    login
};