const express = require('express');
const router = express.Router();
const JsonDB = require('../../config/db');

// GET /api/services - Get all services
router.get('/', (req, res) => {
  const { category, petType } = req.query;
  let services = JsonDB.getCollection('services');

  if (category && category !== 'all') {
    services = services.filter(s => s.category === category);
  }
  if (petType && petType !== 'all') {
    services = services.filter(s => s.petTypes.includes(petType));
  }

  res.json({ success: true, count: services.length, data: services });
});

// GET /api/services/:id - Get service by ID
router.get('/:id', (req, res) => {
  const service = JsonDB.findOne('services', s => s.id === req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, message: 'Dịch vụ không tồn tại!' });
  }
  res.json({ success: true, data: service });
});

// POST /api/services - Create new service
router.post('/', (req, res) => {
  const { name, category, price, duration, description, petTypes } = req.body;
  if (!name || !price) {
    return res.status(400).json({ success: false, message: 'Tên dịch vụ và Giá là bắt buộc!' });
  }

  const newService = {
    id: `s-${Date.now()}`,
    name,
    category: category || 'grooming',
    price: Number(price),
    duration: duration || '60 phút',
    description: description || 'Dịch vụ chăm sóc chuyên nghiệp cho Boss',
    petTypes: petTypes || ['dog', 'cat'],
    rating: 5.0
  };

  JsonDB.insert('services', newService);
  res.status(201).json({ success: true, message: 'Đã thêm dịch vụ mới thành công!', data: newService });
});

// PUT /api/services/:id - Update service
router.put('/:id', (req, res) => {
  const updated = JsonDB.update('services', s => s.id === req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy dịch vụ để cập nhật!' });
  }
  res.json({ success: true, message: 'Đã cập nhật thông tin dịch vụ!', data: updated });
});

// DELETE /api/services/:id - Delete service
router.delete('/:id', (req, res) => {
  const deleted = JsonDB.delete('services', s => s.id === req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy dịch vụ để xóa!' });
  }
  res.json({ success: true, message: 'Đã xóa dịch vụ thành công!' });
});

module.exports = router;
