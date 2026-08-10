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

module.exports = router;
