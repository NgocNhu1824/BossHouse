const express = require('express');
const router = express.Router();
const JsonDB = require('../../config/db');

// GET /api/rooms - Get all rooms
router.get('/', (req, res) => {
  const { category, status } = req.query;
  let rooms = JsonDB.getCollection('rooms');

  if (category && category !== 'all') {
    rooms = rooms.filter(r => r.category === category);
  }
  if (status && status !== 'all') {
    rooms = rooms.filter(r => r.status === status);
  }

  res.json({ success: true, count: rooms.length, data: rooms });
});

// GET /api/rooms/:id - Get room by ID
router.get('/:id', (req, res) => {
  const room = JsonDB.findOne('rooms', r => r.id === req.params.id);
  if (!room) {
    return res.status(404).json({ success: false, message: 'Phòng không tồn tại!' });
  }
  res.json({ success: true, data: room });
});

// POST /api/rooms - Create new room
router.post('/', (req, res) => {
  const { name, category, price, capacity, description, image, features } = req.body;
  if (!name || !price) {
    return res.status(400).json({ success: false, message: 'Tên phòng và Giá là bắt buộc!' });
  }

  const newRoom = {
    id: `r-${Date.now()}`,
    name,
    category: category || 'standard',
    price: Number(price),
    capacity: capacity || '1 Boss (<10kg)',
    description: description || 'Phòng nghỉ tiện nghi cho thú cưng',
    image: image || 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=800',
    features: features || ['Điều hòa', 'Camera 24/7'],
    rating: 5.0,
    status: 'available'
  };

  JsonDB.insert('rooms', newRoom);
  res.status(201).json({ success: true, message: 'Đã thêm phòng mới thành công!', data: newRoom });
});

// PUT /api/rooms/:id - Update room
router.put('/:id', (req, res) => {
  const updated = JsonDB.update('rooms', r => r.id === req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy phòng để cập nhật!' });
  }
  res.json({ success: true, message: 'Đã cập nhật thông tin phòng thành công!', data: updated });
});

// DELETE /api/rooms/:id - Delete room
router.delete('/:id', (req, res) => {
  const deleted = JsonDB.delete('rooms', r => r.id === req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy phòng để xóa!' });
  }
  res.json({ success: true, message: 'Đã xóa phòng thành công!' });
});

module.exports = router;
