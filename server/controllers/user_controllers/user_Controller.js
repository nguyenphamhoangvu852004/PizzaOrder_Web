
import mysqlConnection from "../../config/database_config.js";

// Khi thực hiện login thì trả về client các thông tin như Username, Password, AccountID

const getUser = async (req, res) => {
	const userId = req.user.id; // Truy cập userId từ req.user
	try {
		// truy vấn tìm ra thông tin tài khoản theo mã ID 
		const [response] = await mysqlConnection.query(
			"Select Username,Phone,Email,Address from Accounts WHERE AccountID = ?",
			[userId],
		);
		// Nếu có dữ liệu hơn 0 dòng thì trả về data
		if (response.length > 0) {
			res.status(200).json({
				success: true,
				data: response,
			});
		} else {

			//Còn không thì trả về sai
			res.status(400).json({
				success: false,
			});
		}
	} catch (error) {
		res.status(400).json({ success: false });
	}
}

const doUpdateUser = async (req, res) => {
	const userId = req.user.id;
	const { username, email, phone } = req.body;

	try {
		// Sử dụng await cho truy vấn trả về promise
		const [response] = await mysqlConnection.query(
			`UPDATE Accounts SET Username = ?, Email = ?, Phone = ? WHERE AccountID = ?`,
			[username, email, phone, userId]
		);

		// Kiểm tra nếu affectedRows là 0 (không có thay đổi hoặc không tìm thấy tài khoản)
		if (response.affectedRows === 0) {
			return res.status(404).json({
				success: false,
				message: 'Không tìm thấy tài khoản với ID này hoặc không có thay đổi nào được thực hiện'
			});
		}

		// Trả về kết quả thành công nếu cập nhật thành công
		res.status(200).json({
			success: true,
			message: 'Cập nhật thông tin tài khoản thành công'
		});
	} catch (error) {
		// Bắt và xử lý lỗi
		console.error(error); // Log lỗi ra console để dễ dàng kiểm tra
		res.status(500).json({
			success: false,
			message: 'Lỗi khi cập nhật thông tin người dùng',
		});
	}
}

const doUpdateAddress = async (req, res) => {
	const userId = req.user.id;
	const { address } = req.body;

	try {
		// Thực hiện truy vấn cập nhật

		const [result] = await mysqlConnection.query(`UPDATE Accounts SET Address = ? WHERE AccountID = ?`, [address, userId]);


		if (result.affectedRows === 0) {
			return res.status(404).json({
				success: false,
				message: 'Không tìm thấy tài khoản với ID này hoặc không có thay đổi nào được thực hiện'
			});
		}

		res.status(200).json({
			success: true,
			message: 'Cập nhật địa chỉ tài khoản thành công'
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Lỗi khi cập nhật địa chỉ người dùng',
		});
	}
};


const doDeleteAddress = async (req, res) => {
	const userId = req.user.id;
	try {
		const [response] = await mysqlConnection.query(`UPDATE Accounts SET Address = ? WHERE AccountID = ?`, ['', userId])
		if (response.affectedRows === 0) {
			return res.status(404).json({
				success: false,
				message: 'Không tìm thấy tài khoản với ID này hoặc không có thay đổi nào được thực hiện'
			});
		}

		res.status(200).json({
			success: true,
			message: 'Xóa địa chỉ tài khoản thành công'
		});

	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Lỗi khi xóa địa chỉ người dùng',
		});

	}
}


export { getUser, doUpdateUser, doUpdateAddress, doDeleteAddress };
