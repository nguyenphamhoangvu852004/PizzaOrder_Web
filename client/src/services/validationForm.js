export const isValidate = (Account) => {
    // Kiểm tra username
    if (Account.username.trim() === "") {
        alert("Username không được để trống");
        return false;
    }

    // Kiểm tra số điện thoại
    const phoneRegex = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    if (!phoneRegex.test(Account.phone)) {
        alert("Số điện thoại không hợp lệ");
        return false;
    }

    // Kiểm tra email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(Account.email)) {
        alert("Email không hợp lệ");
        return false;
    }

    // Kiểm tra mật khẩu
    if (Account.password.length < 8) {
        alert("Mật khẩu phải có ít nhất 8 ký tự");
        return false;
    }

    // Kiểm tra xác nhận mật khẩu
    if (Account.password !== Account.passwordConfirm) {
        alert("Mật khẩu xác nhận không khớp");
        return false;
    }

    return true;
}