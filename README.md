# BossHouse

Nen tang quan ly khach san va dich vu cham soc thu cung theo mo hinh full-stack web application.

Portfolio nay duoc thiet ke de the hien kha nang xay dung san pham tu UI den API, voi mot bai toan kinh doanh cu the: giup co so pet care van hanh dat lich, phong, dich vu, thu cung va danh gia tren cung mot he thong.

## 1) Elevator Pitch
BossHouse la du an full-stack huong den 2 nhom nguoi dung:
- Pet Owner: dang ky, dang nhap, dat phong, dat dich vu, quan ly thu cung, theo doi booking, gui review.
- Admin/Staff: quan ly phong, dich vu, nguoi dung, booking, theo doi thong ke he thong.

Muc tieu portfolio:
- Cho thay kha nang phan tich nghiep vu va modeling du lieu.
- Cho thay kha nang xay dung UI co nhieu role va luong thao tac.
- Cho thay kha nang tach Frontend/Backend ro rang va san sang nang cap.

## 2) Diem An Tuong Danh Cho Nha Tuyen Dung
- Full-stack hoan chinh voi kien truc Frontend/Backend tach biet.
- Co luong nghiep vu ro (booking lifecycle, pet profile, review, admin dashboard).
- Co REST API rieng cho tung module: auth, rooms, services, pets, bookings, reviews, admin.
- Co du lieu mau de chay ngay, khong can setup DB phuc tap.
- Co roadmap nang cap len production-grade (bao mat, CSDL, thanh toan, thong bao realtime).

## 3) Tech Stack (Current)
### Frontend
- React 18
- Vite
- CSS custom
- Lucide React

### Backend
- Node.js
- Express.js
- CORS, Morgan, Cookie Parser
- JSON file persistence thong qua JsonDB helper
- uuid de tao id

## 4) Tinh Trang Thuc Te Hien Tai (Honest Project Status)
Du an hien o muc MVP va da chay end-to-end local.

Da co:
- Dang ky / dang nhap co token don gian.
- CRUD room, service, pet, user (admin).
- Tao booking, huy booking, cap nhat trang thai booking.
- Gui va xoa review.
- Dashboard thong ke tong quan cho admin.

Chua production-ready:
- Chua dung JWT signing/verification thuc su.
- Chua hash password voi bcrypt (hien dang luu plain text trong du lieu local).
- Chua co test tu dong (unit/integration/e2e).
- Chua co CI/CD va chua deploy cloud.

Luu y: Viec minh bach tinh trang du an giup nha tuyen dung danh gia dung nang luc va thay ro tu duy ky thuat cua ung vien.

## 5) Kien Truc Tong Quan
```text
Browser (React + Vite)
        |
        | HTTP JSON (/api)
        v
Express API Server (Node.js)
        |
        v
JsonDB (data/db.json + seedData.json)
```

## 6) Cau Truc Thu Muc
```text
BossHouse/
|-- BossHouse_Frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   `-- services/api.js
|   `-- vite.config.js
|
`-- BossHouse_Backend/
    |-- app.js
    |-- bin/www
    |-- config/db.js
    |-- data/
    `-- routes/api/
```

## 7) Quick Start (5 phut)
Yeu cau:
- Node.js 16+ (khuyen nghi 18+)
- npm

Buoc 1 - Chay Backend
```bash
cd BossHouse_Backend
npm install
npm run dev
```
Backend mac dinh chay o:
- http://localhost:5000
- health check nhanh: http://localhost:5000/api

Buoc 2 - Chay Frontend
```bash
cd BossHouse_Frontend
npm install
npm run dev
```
Frontend mac dinh:
- http://localhost:5173

Ghi chu ket noi:
- Frontend da proxy /api sang backend http://localhost:5000 trong vite config.

## 8) Core API Summary
| Method | Endpoint | Mo ta |
| --- | --- | --- |
| POST | /api/auth/register | Dang ky tai khoan |
| POST | /api/auth/login | Dang nhap |
| GET | /api/auth/me | Lay thong tin user hien tai |
| PUT | /api/auth/profile | Cap nhat profile |
| GET | /api/rooms | Danh sach phong |
| POST | /api/bookings | Tao booking |
| PUT | /api/bookings/:id/cancel | Huy booking |
| PUT | /api/bookings/:id/status | Admin cap nhat trang thai |
| GET | /api/admin/stats | Thong ke dashboard |

## 9) Cach Danh Gia Nhanh Du An (Recruiter Checklist)
Neu ban la recruiter/tech interviewer, co the kiem tra nhanh:
1. Kha nang tao luong nghiep vu tu UI den API (tao pet -> tao booking -> cap nhat status).
2. Kha nang thiet ke route va tach module backend.
3. Kha nang to chuc component/pages trong frontend.
4. Kha nang nhan dien han che hien tai va lap ke hoach nang cap.

## 10) Roadmap Nang Cap (Portfolio -> Production)
### Phase 1 - Security Baseline
- Chuyen token don gian sang JWT thuc su.
- Hash password voi bcrypt.
- Tach middleware auth/role cho admin routes.

### Phase 2 - Data & Reliability
- Chuyen JsonDB sang PostgreSQL hoac MongoDB.
- Them schema validation cho request.
- Them pagination/filter/sort cho API list.

### Phase 3 - Product Experience
- Tich hop thanh toan online (VNPAY/MoMo).
- Thong bao realtime/email cho booking status.
- Dashboard bao cao chi tiet theo ngay/thang.

### Phase 4 - Engineering Quality
- Unit test + integration test.
- CI pipeline lint + test.
- Docker hoa va deploy cloud.

## 11) Gia Tri Hoc Tap Tu Du An
- Hieu cach bien yeu cau nghiep vu thanh API va UI flow ro rang.
- Hieu trade-off giua toc do phat trien MVP va yeu cau production.
- Hieu cach trinh bay du an minh bach, trung thuc, co dinh huong phat trien.

## 12) Author
- Ho va ten: Cao Huynh Ngoc Nhu
- Dinh huong: Frontend Developer / Full-stack Developer
- GitHub: https://github.com/NgocNhu1824
- Repository: https://github.com/NgocNhu1824/BossHouse

## 13) Readme Theo Tung Layer
- Frontend details: [BossHouse_Frontend/README.md](BossHouse_Frontend/README.md)
- Backend details: [BossHouse_Backend/README.md](BossHouse_Backend/README.md)
