const express = require('express');
const router = express.Router();
const JsonDB = require('../../config/db');

// GET /api/admin/stats - Admin Dashboard Statistics
router.get('/stats', (req, res) => {
  const bookings = JsonDB.getCollection('bookings');
  const pets = JsonDB.getCollection('pets');
  const rooms = JsonDB.getCollection('rooms');
  const users = JsonDB.getCollection('users');
  const services = JsonDB.getCollection('services');

  const totalBookings = bookings.length;
  const activeStays = bookings.filter(b => b.status === 'confirmed' || b.status === 'checked-in').length;
  
  const totalRevenue = bookings.reduce((sum, b) => {
    return b.status !== 'cancelled' ? sum + Number(b.totalAmount || 0) : sum;
  }, 0);

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;

  res.json({
    success: true,
    data: {
      totalBookings,
      activeStays,
      totalRevenue,
      pendingBookings,
      completedBookings,
      totalPets: pets.length,
      totalRooms: rooms.length,
      totalCustomers: users.filter(u => u.role === 'customer').length,
      totalServices: services.length
    }
  });
});

// GET /api/admin/users - Get all registered users/staff/customers
router.get('/users', (req, res) => {
  const users = JsonDB.getCollection('users');
  const safeUsers = users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone || '0912345678',
    role: u.role || 'customer',
    createdAt: u.createdAt || new Date().toISOString()
  }));
  res.json({ success: true, count: safeUsers.length, data: safeUsers });
});

// POST /api/admin/users - Create new User or Staff
router.post('/users', (req, res) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Tên và Email là bắt buộc!' });
  }

  const existing = JsonDB.findOne('users', u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'Email đã tồn tại trong hệ thống!' });
  }

  const newUser = {
    id: `u-${role || 'staff'}-${Date.now().toString().slice(-4)}`,
    name,
    email,
    phone: phone || '0987654321',
    role: role || 'staff',
    plainPassword: password || '123456',
    createdAt: new Date().toISOString()
  };

  JsonDB.insert('users', newUser);
  res.status(201).json({ success: true, message: 'Đã thêm tài khoản mới thành công!', data: newUser });
});

// DELETE /api/admin/users/:id - Delete a User or Staff account
router.delete('/users/:id', (req, res) => {
  const deleted = JsonDB.delete('users', req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản để xóa!' });
  }
  res.json({ success: true, message: 'Đã xóa tài khoản thành công!' });
});

module.exports = router;
