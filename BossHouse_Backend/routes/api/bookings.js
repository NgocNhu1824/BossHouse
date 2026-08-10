const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const JsonDB = require('../../config/db');

// Helper: Calculate nights between two date strings (YYYY-MM-DD)
function calculateNights(checkInStr, checkOutStr) {
  const inDate = new Date(checkInStr);
  const outDate = new Date(checkOutStr);
  const diffTime = Math.max(outDate - inDate, 86400000);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// GET /api/bookings - Get bookings (filterable by userId)
router.get('/', (req, res) => {
  const { userId } = req.query;
  let bookings = JsonDB.getCollection('bookings');

  if (userId) {
    bookings = bookings.filter(b => b.userId === userId);
  }

  // Sort descending by creation date
  bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({ success: true, count: bookings.length, data: bookings });
});

// POST /api/bookings - Create new booking
router.post('/', (req, res) => {
  const {
    userId,
    userName,
    userPhone,
    petId,
    petName,
    petType,
    roomId,
    checkIn,
    checkOut,
    selectedServices,
    specialRequests
  } = req.body;

  if (!roomId || !checkIn || !checkOut) {
    return res.status(400).json({ success: false, message: 'Vui lòng chọn phòng và ngày lưu trú!' });
  }

  const room = JsonDB.findOne('rooms', r => r.id === roomId);
  if (!room) {
    return res.status(404).json({ success: false, message: 'Phòng đã chọn không tồn tại!' });
  }

  const nights = calculateNights(checkIn, checkOut);
  const price = room.pricePerNight || room.price || 150000;
  const roomCost = price * nights;

  let serviceCost = 0;
  const servicesList = selectedServices || [];
  servicesList.forEach(s => {
    serviceCost += Number(s.price || 0);
  });

  const totalAmount = roomCost + serviceCost;

  const newBooking = {
    id: 'bk-' + Math.floor(1000 + Math.random() * 9000),
    userId: userId || 'u-customer1',
    userName: userName || 'Khách Hàng BossHouse',
    userPhone: userPhone || '0987654321',
    petId: petId || '',
    petName: petName || 'Boss cưng',
    petType: petType || 'dog',
    roomId: room.id,
    roomName: room.name,
    checkIn,
    checkOut,
    nights,
    selectedServices: servicesList,
    specialRequests: specialRequests || '',
    totalAmount,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  JsonDB.insert('bookings', newBooking);
  res.status(201).json({
    success: true,
    message: 'Đặt phòng thành công! BossHouse sẽ liên hệ xác nhận trong giây lát.',
    data: newBooking
  });
});

// PUT /api/bookings/:id/cancel - Cancel booking
router.put('/:id/cancel', (req, res) => {
  const booking = JsonDB.findOne('bookings', b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đơn đặt chỗ!' });
  }

  if (booking.status === 'completed' || booking.status === 'cancelled') {
    return res.status(400).json({ success: false, message: `Không thể hủy đơn đặt ở trạng thái: ${booking.status}` });
  }

  const updated = JsonDB.update('bookings', req.params.id, { status: 'cancelled' });
  res.json({ success: true, message: 'Đã hủy đơn đặt chỗ thành công!', data: updated });
});

// PUT /api/bookings/:id/status - Update status (Admin)
router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'confirmed', 'checked-in', 'completed', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Trạng thái không hợp lệ!' });
  }

  const updated = JsonDB.update('bookings', req.params.id, { status });
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy đơn đặt!' });
  }

  res.json({ success: true, message: `Đã cập nhật trạng thái đơn thành: ${status}`, data: updated });
});

module.exports = router;
