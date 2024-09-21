import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log("Received token:", token);

  if (!token) {
    return res.status(403).json({ message: "Token không được cung cấp" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Lưu toàn bộ thông tin người dùng vào req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};




export { verifyToken };
