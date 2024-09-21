import dotenv from "dotenv";
dotenv.config();
import mysqlConnection from "../../config/database_config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const salt = 10;
// Khi thực hiện login thì trả về client các thông tin như Username, Password, AccountID
const doLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Nếu không có 1 trong 2 thông tin, thì return lỗi
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp tên đăng nhập và mật khẩu",
      });
    }
    //Thực hiện truy vấn tìm row data có username là username đươc gữi từ phía client
    const [results] = await mysqlConnection.query(
      "SELECT Username,Password,AccountID FROM Accounts WHERE Username = ?",
      [username],
    );

    //Nếu database trả về hơn 0 dòng dữ liệu, tức là có dữ liệu
    if (results.length > 0) {
      // Thực hiện mã hóa mật khẩu được gữi từ phía client
      const isMatch = await bcrypt.compare(password, results[0].Password);
      // Kiểm tra 2 mật khẩu
      if (isMatch) {
        // Thực hiện tạo JWT token
        const token = jwt.sign(
          {
            id: results[0].AccountID,
            username: results[0].Username,
            password: results[0].Password,
          },
          process.env.JWT_SECRET,
          { expiresIn: "600s" },
        );

        // Khi kiểm tra password giống với thông tin trong db, trả về client thông tin như id và token(nểu có)
        res.status(200).json({
          success: true,
          message: "Đăng nhập thành công",
          user: {
            id: results[0].AccountID,
          },
          token: token,
        });
        //Nếu không đúng thì return Lỗi
      } else {
        res.status(401).json({
          success: false,
          message: "Mật khẩu không trùng khớp",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Tài khoản không tồn tại trong hệ thống",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Lỗi trong quá trình đăng nhập",
      error: error.message,
    });
  }
};

const doRegister = async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;

    // Kiểm tra xem có đầy đủ thông tin không
    if (!username || !phone || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin tài khoản",
      });
    }

    // Thực hiện Hash Password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Thực hiện query để tạo tài khoản
    const [result] = await mysqlConnection.query(
      "INSERT INTO Accounts (Username, Phone, Email, Password) VALUES (?, ?, ?, ?)",
      [username, phone, email, hashedPassword],
    );

    if (result.affectedRows > 0) {
      res.status(201).json({
        success: true,
        message: "Tạo tài khoản thành công",
        accountId: result.insertId,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Không thể tạo tài khoản",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi trong quá trình tạo tài khoản",
      error: error.message,
    });
  }
};

export { doLogin, doRegister }
