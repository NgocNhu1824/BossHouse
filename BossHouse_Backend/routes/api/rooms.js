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

module.exports = router;
