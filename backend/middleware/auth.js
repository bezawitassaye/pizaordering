import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized Login Again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = token_decode.id;
        next(); // Call next to pass control to the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export default authMiddleware;
