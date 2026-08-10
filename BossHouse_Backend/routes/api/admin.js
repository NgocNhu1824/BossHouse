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

module.exports = router;
