import jsonwebtoken from 'jsonwebtoken';

export const createToken = (user) => {
    return jsonwebtoken.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: 86400 * 30 // 24 hours * 30 days
    });
}

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    return next();
};

export default {
    createToken,
    verifyToken
};