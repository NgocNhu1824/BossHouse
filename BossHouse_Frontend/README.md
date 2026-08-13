# BossHouse Frontend

Ung dung React cho trai nghiem nguoi dung cua he thong BossHouse.

README nay giup nha tuyen dung thay ro logic UI, cach to chuc pages/components, va kha nang ket noi API theo flow thuc te.

## 1) Muc Tieu Frontend
- Cung cap giao dien cho Pet Owner va Admin/Staff.
- Xu ly flow auth, booking, pet profile, reviews va admin dashboard.
- To chuc source de de maintain va mo rong.

## 2) Cong Nghe
- React 18
- Vite
- CSS custom
- Lucide React

## 3) Cau Truc Source
```text
BossHouse_Frontend/src/
|-- components/
|   |-- Navbar.jsx
|   |-- Hero.jsx
|   |-- RoomCard.jsx
|   |-- ServiceCard.jsx
|   |-- AuthModal.jsx
|   |-- BookingModal.jsx
|   |-- PetModal.jsx
|   |-- ProfileModal.jsx
|   |-- DetailModal.jsx
|   |-- AdminModals.jsx
|   |-- Chatbox.jsx
|   `-- Toast.jsx
|-- pages/
|   |-- HomePage.jsx
|   |-- RoomsPage.jsx
|   |-- ServicesPage.jsx
|   |-- MyPetsPage.jsx
|   |-- MyBookingsPage.jsx
|   |-- ReviewsPage.jsx
|   `-- AdminDashboard.jsx
`-- services/
    `-- api.js
```

## 4) Chay Local
```bash
cd BossHouse_Frontend
npm install
npm run dev
```

Frontend mac dinh:
- http://localhost:5173

Luu y ket noi API:
- Frontend goi endpoint /api qua file services/api.js.
- Vite proxy /api -> http://localhost:5000 trong vite.config.js.

## 5) Trai Nghiem Chinh Tren UI
- Guest/User:
  - Dang ky, dang nhap.
  - Xem danh sach phong va dich vu.
  - Tao va theo doi booking.
  - Quan ly pet profiles.
  - Gui reviews.
- Admin/Staff:
  - Xem dashboard thong ke.
  - Quan ly users.
  - Quan ly rooms, services va trang thai booking.

## 6) API Integration
Toan bo logic API duoc tap trung tai services/api.js:
- Auth: login, register, getProfile, updateProfile
- Rooms: get/create/update/delete
- Services: get/create/update/delete
- Pets: get/add/delete
- Bookings: get/create/cancel/updateStatus
- Reviews: get/create/delete
- Admin: getStats/getUsers/createUser/deleteUser

Loi ich cua cach to chuc nay:
- Pages/components tap trung vao UI state.
- API layer de mock/doi backend trong tuong lai.

## 7) Muc Do Hoan Thien Hien Tai
Da lam duoc:
- End-to-end flow local voi backend.
- Tach page va component ro rang.
- Co role-based giao dien o muc co ban.

Can nang cap:
- Xu ly loading/error states chi tiet hon.
- Them route guarding chat che.
- Toi uu accessibility (keyboard navigation, aria labels).
- Them test cho UI va API layer.

## 8) Roadmap Frontend
- Refactor state management cho scale lon hon.
- Them pagination/filter/sort cho danh sach.
- Them dashboard charts nang cao cho admin.
- Hoan thien responsive cho cac man hinh nho.
- Them e2e tests cho luong booking va admin.

## 9) Gia Tri Portfolio
Phan frontend the hien:
- Kha nang tao UI/UX theo bai toan nghiep vu cu the.
- Kha nang chia nho source thanh pages/components/services de maintain.
- Kha nang ket noi API da module va xu ly nhieu user flow.

## 10) Lien Ket
- Tong quan du an: [../README.md](../README.md)
- Backend README: [../BossHouse_Backend/README.md](../BossHouse_Backend/README.md)
