# 🐾 BossHouse - Nền Tảng Quản Lý Khách Sạn & Dịch Vụ Thú Cưng (Pet Care Management System)

> **Dự án Full-stack Web Application** được thiết kế và phát triển nhằm tối ưu hóa quy trình đặt lịch lưu trú, chăm sóc thú cưng cho khách hàng và cung cấp bộ công cụ quản trị kinh doanh toàn diện cho doanh nghiệp.

---

## 📌 Tổng Quan Dự Án (Project Overview)

Trong bối cảnh nhu cầu chăm sóc và gửi gắm thú cưng ("Boss") ngày càng tăng cao, **BossHouse** ra đời như một giải pháp công nghệ hiện đại chuyển đổi số cho các trung tâm dịch vụ thú cưng. Nền tảng giúp rút ngắn thời gian đặt dịch vụ, nâng cao trải nghiệm khách hàng và tự động hóa quy trình quản lý vận hành của nhà quản trị.

- **Mục tiêu dự án**: Xây dựng hệ thống đặt lịch tự động, minh bạch thông tin giá phòng/dịch vụ, quản lý hồ sơ thú cưng chuyên sâu và hỗ trợ quản trị viên theo dõi doanh thu/trạng thái phòng theo thời gian thực.
- **Đối tượng sử dụng**:
  - **Khách hàng (Pet Owner)**: Đặt phòng lưu trú, đặt dịch vụ chăm sóc (Grooming/Spa/Kham sức khỏe), quản lý danh sách thú cưng và gửi đánh giá.
  - **Quản trị viên (Admin/Staff)**: Quản lý danh mục phòng & dịch vụ, duyệt/hủy đơn đặt lịch, xem thống kê báo cáo và điều hành hệ thống.

---

## ✨ Tính Năng Nổi Bật (Key Features)

### 🐶 Dành Cho Khách Hàng (Customer Portal)
- **Đăng ký / Đăng nhập an toàn**: Xác thực người dùng qua JWT, bảo mật thông tin tài khoản.
- **Đặt phòng Khách sạn Boss**: Xem danh sách phòng lưu trú (VIP, Standard, Suite), kiểm tra giá, tiện ích và đặt phòng trực tuyến.
- **Đặt lịch Dịch vụ Spa & Grooming**: Lựa chọn gói chăm sóc (Tắm spa, Cắt tỉa lông, Vệ sinh, Khám sức khỏe) theo mốc thời gian linh hoạt.
- **Quản lý Hồ sơ Thú cưng (Boss Profiles)**: Lưu trữ thông tin chi tiết từng thú cưng (Tên, Giống, Cân nặng, Tuổi, Ghi chú sức khỏe/thói quen ăn uống).
- **Lịch sử & Trạng thái Đặt lịch**: Theo dõi trạng thái đơn đặt (`Pending`, `Confirmed`, `Completed`, `Cancelled`) trực quan.
- **Đánh giá & Phản hồi (Reviews & Rating)**: Gửi nhận xét và chấm điểm sao cho từng dịch vụ sau khi trải nghiệm.

### 🛡️ Dành Cho Quản Trị Viên (Admin Dashboard)
- **Tổng quan Thống kê (Analytics Dashboard)**: Báo cáo nhanh tổng số lượng đơn đặt, doanh thu ước tính, tổng số thú cưng và khách hàng trên hệ thống.
- **Quản lý Đơn đặt (Booking Management)**: Xem danh sách đơn, cập nhật trạng thái đơn (Phê duyệt / Từ chối / Hoàn thành) nhanh chóng.
- **Quản lý Phòng & Dịch vụ (Rooms & Services Management)**: Thêm mới, chỉnh sửa giá, mô tả, hình ảnh và cập nhật trạng thái khả dụng của phòng/dịch vụ.
- **Quản lý Người dùng & Thú cưng**: Theo dõi danh sách tài khoản khách hàng và dữ liệu thú cưng đăng ký trên hệ thống.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

### **Frontend**
- **Core**: React 18 (Vite build tool)
- **Routing & State**: React Hooks & Component Architecture
- **Styling**: Modern CSS3, Dynamic UI Themes, Responsive Design (Desktop & Mobile)
- **Icons**: Lucide React Icons

### **Backend**
- **Core Runtime**: Node.js & Express.js Framework
- **Architecture**: RESTful API Architecture
- **Authentication & Security**: JSON Web Token (JWT), Bcrypt password hashing, CORS Middleware
- **Data Layer**: Node-based Data Persistence / Custom JSON Engine (Sẵn sàng tích hợp MongoDB / PostgreSQL)

---

## 📐 Kiến Trúc Hệ Thống (System Architecture)

```
                       +-------------------------+
                       |      Client Browser     |
                       |  (React 18 + Vite UI)   |
                       +------------+------------+
                                    |
                                    | RESTful API (HTTP/JSON + JWT)
                                    v
                       +-------------------------+
                       |     Express.js API      |
                       |  (Middlewares / CORS)   |
                       +------------+------------+
                                    |
        +---------------------------+---------------------------+
        |                           |                           |
        v                           v                           v
+---------------+           +---------------+           +---------------+
| Auth Module   |           | Booking Engine|           | Admin Module  |
| (JWT/Bcrypt)  |           | & Pet Records |           | & Analytics   |
+---------------+           +---------------+           +---------------+
```

---

## 📁 Cấu Trúc Thư Mục (Folder Structure)

```bash
BossHouse/
├── BossHouse_Frontend/       # Mã nguồn Giao diện Người dùng (React.js)
│   ├── public/               # Tài nguyên tĩnh (Images, Favicon)
│   ├── src/
│   │   ├── components/       # Các UI Component dùng chung (Navbar, Footer, Modal, Card)
│   │   ├── pages/            # Các trang giao diện (HomePage, AdminDashboard, RoomsPage...)
│   │   ├── services/         # Tích hợp API service calls
│   │   ├── App.jsx           # Component chính & Navigation Routing
│   │   └── main.jsx          # Entry point
│   └── package.json
│
└── BossHouse_Backend/        # Mã nguồn Máy chủ & API (Node.js/Express)
    ├── bin/www               # Khởi chạy HTTP Server
    ├── data/                 # Cơ sở dữ liệu & Seed Data
    ├── routes/api/           # RESTful Endpoints (Auth, Rooms, Services, Bookings, Pets, Admin)
    ├── app.js                # Cấu hình Express App & Middlewares
    └── package.json
```

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy (Getting Started)

### Yêu cầu tiên quyết (Prerequisites)
- [Node.js](https://nodejs.org/) (Phiên bản 16.x hoặc mới hơn)
- `npm` hoặc `yarn`

### 1. Cài đặt Backend
```bash
# Di chuyển vào thư mục backend
cd BossHouse_Backend

# Cài đặt các thư viện phụ thuộc
npm install

# Khởi chạy server ở chế độ Development
npm run dev
# Backend Server sẽ chạy tại: http://localhost:3000 (API Endpoint: http://localhost:3000/api)
```

### 2. Cài đặt Frontend
```bash
# Mở một cửa sổ Terminal mới và di chuyển vào thư mục frontend
cd BossHouse_Frontend

# Cài đặt các thư viện phụ thuộc
npm install

# Khởi chạy Frontend với Vite
npm run dev
# Giao diện ứng dụng sẽ chạy tại: http://localhost:5173
```

---

## 🌐 Danh Sách API chính (Core API Endpoints)

| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Đăng ký tài khoản khách hàng mới |
| `POST` | `/api/auth/login` | Đăng nhập & Nhận JWT Token |
| `GET` | `/api/rooms` | Lấy danh sách phòng lưu trú |
| `GET` | `/api/services` | Lấy danh sách dịch vụ chăm sóc |
| `GET` | `/api/pets` | Lấy danh sách thú cưng của người dùng |
| `POST` | `/api/bookings` | Tạo đơn đặt phòng / dịch vụ mới |
| `GET` | `/api/admin/stats` | Thống kê số liệu hệ thống dành cho Admin |

---

## 🎯 Định Hướng Phát Triển (Future Roadmap)

- [ ] Tích hợp cổng thanh toán trực tuyến (**VNPAY**, **MoMo**).
- [ ] Gửi thông báo thời gian thực (**Socket.io** / Email Notification) khi đơn đặt được phê duyệt.
- [ ] Xây dựng ứng dụng di động (**React Native**) đồng bộ dữ liệu với Backend.
- [ ] Chuyển đổi Cơ sở dữ liệu sang **MongoDB Atlas** / **PostgreSQL** hỗ trợ Scale lớn.

---

## 👤 Tác Giả (Author & Contact)

- **Họ và tên**: Cao Huỳnh Ngọc Như
- **Vị trí mong muốn**: Full-stack Developer / Frontend Developer (React.js / Node.js)
- **GitHub**: [github.com/NgocNhu1824](https://github.com/NgocNhu1824)
- **Project Repository**: [BossHouse](https://github.com/NgocNhu1824/BossHouse)

---
*Cảm ơn Quý doanh nghiệp / Nhà tuyển dụng đã dành thời gian xem qua dự án!* 🚀
