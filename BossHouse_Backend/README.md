# ⚙️ BossHouse - Backend API Service

> **Dịch vụ máy chủ RESTful API** cho hệ thống Quản lý Khách sạn & Dịch vụ Thú cưng BossHouse.

---

## 📌 Vai Trò Trong Dự Án
Thư mục `BossHouse_Backend` đóng vai trò là hạt nhân xử lý nghiệp vụ, quản lý xác thực người dùng, lưu trữ và phản hồi dữ liệu cho ứng dụng Frontend.

---

## 🛠️ Công Nghệ & Thư Viện Sử Dụng

- **Node.js & Express.js**: Framework dựng web server mạnh mẽ và tối ưu.
- **JSON Web Token (`jsonwebtoken`)**: Mã hóa và xác thực phiên đăng nhập an toàn.
- **Bcrypt (`bcryptjs`)**: Mã hóa mật khẩu người dùng trước khi lưu trữ.
- **CORS (`cors`)**: Cho phép chia sẻ tài nguyên an toàn giữa các domain Frontend & Backend.
- **Morgan & Cookie-parser**: Hỗ trợ log request HTTP và xử lý cookie.

---

## 🚀 Khởi Chạy Nhanh

```bash
# 1. Di chuyển vào thư mục
cd BossHouse_Backend

# 2. Cài đặt thư viện
npm install

# 3. Chạy server ở chế độ dev
npm run dev
```

Server sẽ lắng nghe tại: `http://localhost:3000`

---

## 🔗 Cấu Trúc Endpoints (`/api`)

- `/api/auth` - Đăng ký, Đăng nhập, Kiểm tra phiên
- `/api/services` - Quản lý danh mục dịch vụ Spa / Grooming
- `/api/rooms` - Quản lý phòng lưu trú thú cưng
- `/api/pets` - Quản lý danh sách thú cưng của từng khách hàng
- `/api/bookings` - Xử lý đặt phòng, đặt lịch dịch vụ
- `/api/reviews` - Đánh giá và phản hồi dịch vụ
- `/api/admin` - API dành riêng cho Quản trị viên (Thống kê, Báo cáo)

---
📌 *Xem thông tin chi tiết toàn bộ dự án tại [Root README.md](../README.md)*
