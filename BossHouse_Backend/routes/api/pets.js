const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const JsonDB = require('../../config/db');

// GET /api/pets - Get user pets
router.get('/', (req, res) => {
  const { userId } = req.query;
  let pets = JsonDB.getCollection('pets');

  if (userId) {
    pets = pets.filter(p => p.userId === userId);
  }

  res.json({ success: true, count: pets.length, data: pets });
});

// POST /api/pets - Add a new pet
router.post('/', (req, res) => {
  const { userId, name, type, breed, age, weight, notes, avatar } = req.body;

  if (!name || !type) {
    return res.status(400).json({ success: false, message: 'Vui lòng cung cấp tên và loại Boss!' });
  }

  const defaultAvatars = {
    cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80',
    dog: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=300&q=80',
    other: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=300&q=80'
  };

  const newPet = {
    id: 'pet-' + uuidv4().substring(0, 8),
    userId: userId || 'u-customer1',
    name,
    type: type || 'dog',
    breed: breed || 'Chưa xác định',
    age: Number(age) || 1,
    weight: Number(weight) || 3.0,
    notes: notes || '',
    avatar: avatar || defaultAvatars[type] || defaultAvatars.dog,
    createdAt: new Date().toISOString()
  };

  JsonDB.insert('pets', newPet);
  res.status(201).json({ success: true, message: 'Thêm hồ sơ Boss thành công!', data: newPet });
});

// DELETE /api/pets/:id - Delete a pet
router.delete('/:id', (req, res) => {
  const pet = JsonDB.findOne('pets', p => p.id === req.params.id);
  if (!pet) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy thông tin Boss!' });
  }

  JsonDB.delete('pets', req.params.id);
  res.json({ success: true, message: 'Đã xóa hồ sơ Boss!' });
});

module.exports = router;
