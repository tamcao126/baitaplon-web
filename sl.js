const container = document.querySelector('.container');
const signupBtn = document.querySelector('.signup-btn');
const loginBtn = document.querySelector('.login-btn');

signupBtn.addEventListener('click', () => {
    container.classList.add('active');
})
loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "GOOGLE_CLIENT_ID",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("googleLoginBtn_login"),
        { theme: "outline", size: "large", width: "250" }
    );

    google.accounts.id.renderButton(
        document.getElementById("googleLoginBtn_signup"),
        { theme: "filled_blue", size: "large", width: "250" }
    );
}
// login -> token
// -> thêm
// -> sửa
// -> xóa(1.Kiểm tra có token không? 2. Gửi yêu cầu xóa token lên server)
// dùng middleware để kiểm tra token ở các trang cần xác thực-> lấy dữ liệu từ người dùng( ghi log người dùng đăng nhập, thời gian đăng nhập...)
// có thể thay đổi request đầu vào
// khi gửi id-> tách token ra khỏi request-> lấy thông tin 
const container = document.querySelector(".sl-container");

switch (location.hash) {
    case "#login":
        container.classList.remove("active");
        break;
    case "#signup":
        container.classList.add("active");
        break;
    default:
        container.classList.remove("active"); // default = login
}
