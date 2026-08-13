# BossHouse Backend

REST API service cho he thong BossHouse.

Tai lieu nay tap trung vao implementation hien tai, giup recruiter va developer hieu ro backend dang lam duoc gi, gioi han o dau, va huong nang cap tiep theo.

## 1) Muc Tieu Backend
- Cung cap API cho auth, rooms, services, pets, bookings, reviews, admin.
- To chuc route theo module de de mo rong.
- Dung JsonDB de dat toc do phat trien MVP nhanh.

## 2) Cong Nghe
- Node.js + Express.js
- cors
- morgan
- cookie-parser
- uuid
- dotenv (co trong dependency, co the dung cho env config)

## 3) Kien Truc Thu Muc
```text
BossHouse_Backend/
|-- app.js
|-- bin/www
|-- config/db.js
|-- data/
|   |-- db.json
|   `-- seedData.json
`-- routes/
    `-- api/
        |-- auth.js
        |-- rooms.js
        |-- services.js
        |-- pets.js
        |-- bookings.js
        |-- reviews.js
        `-- admin.js
```

## 4) Chay Local
```bash
cd BossHouse_Backend
npm install
npm run dev
```

Server mac dinh:
- http://localhost:5000

Quick check:
- GET http://localhost:5000/api

## 5) API Modules
- /api/auth
  - POST /register
  - POST /login
  - GET /me
  - PUT /profile
- /api/rooms
  - GET /
  - GET /:id
  - POST /
  - PUT /:id
  - DELETE /:id
- /api/services
  - GET /
  - GET /:id
  - POST /
  - PUT /:id
  - DELETE /:id
- /api/pets
  - GET /
  - POST /
  - DELETE /:id
- /api/bookings
  - GET /
  - POST /
  - PUT /:id/cancel
  - PUT /:id/status
- /api/reviews
  - GET /
  - POST /
  - DELETE /:id
- /api/admin
  - GET /stats
  - GET /users
  - POST /users
  - DELETE /users/:id

## 6) Data Layer Hien Tai
Backend luu du lieu vao JSON file:
- data/db.json
- neu db.json chua ton tai, he thong tao tu seedData.json

Uu diem:
- Setup nhanh, de demo, khong phu thuoc DB server.

Han che:
- Khong phu hop production.
- Khong co transaction.
- Khong co concurrency control chat che.

## 7) Bao Mat (Trang Thai Hien Tai)
Hien tai backend dang o muc MVP:
- Token dang su dung dang token don gian de demo flow.
- Password chua hash (plain text) trong du lieu local.

Ke hoach nang cap uu tien cao:
1. JWT sign/verify thuc su.
2. bcrypt hash password + migration du lieu.
3. middleware phan quyen role cho admin endpoints.
4. request validation middleware.

## 8) Cac Cai Nha Tuyen Dung Co The Danh Gia
- Kha nang tach module API theo domain.
- Kha nang xu ly CRUD va business flow booking.
- Kha nang to chuc code de san sang chuyen sang SQL/NoSQL.
- Kha nang nhan dien dung maturity level va de xuat huong cai tien dung trong tam.

## 9) Roadmap Backend
- Security hardening (JWT, bcrypt, auth middleware).
- Chuyen qua PostgreSQL/MongoDB.
- Them testing (Jest + Supertest).
- Logging va error handling co cau truc hon.
- CI pipeline cho lint + test.

## 10) Lien Ket
- Tong quan du an: [../README.md](../README.md)
- Frontend README: [../BossHouse_Frontend/README.md](../BossHouse_Frontend/README.md)
