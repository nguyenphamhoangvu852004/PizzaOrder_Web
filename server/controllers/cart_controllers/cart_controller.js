import mysqlConnection from "../../config/database_config.js";



const getCartFromID = async (req, res) => {
  const userId = req.user.id;
  try {
    const [response] = await mysqlConnection.query(`SELECT 
            C.CartID, 
            C.DateOfOrder, 
            P.Name, 
            P.Price, 
            CI.Quantity,
            (P.Price * CI.Quantity) AS TotalAmount  -- Tính tổng tiền
        FROM 
            Carts C
        JOIN 
            CartItems CI ON C.CartID = CI.CartID
        JOIN 
            Products P ON CI.ProductID = P.ProductID
        WHERE 
            C.AccountID = ?;`, [userId]); // Sử dụng id từ req.userId

    // Nếu có dữ liệu hơn 0 dòng thì trả về data
    if (response.length > 0) {
      res.status(200).json({
        success: true,
        data: response,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Lỗi khi lấy thông tin giỏ hàng từ ${userId}` });
  }
};

export { getCartFromID }

