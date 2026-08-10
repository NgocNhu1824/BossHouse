const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const JsonDB = require('../../config/db');

// GET /api/reviews - Get all reviews
router.get('/', (req, res) => {
  const reviews = JsonDB.getCollection('reviews');
  reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json({ success: true, count: reviews.length, data: reviews });
});

// POST /api/reviews - Add review
router.post('/', (req, res) => {
  const { userId, userName, petName, rating, comment, avatar } = req.body;

  if (!comment || !rating) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập đánh giá và số sao!' });
  }

  const newReview = {
    id: 'rev-' + uuidv4().substring(0, 8),
    userId: userId || 'u-customer1',
    userName: userName || 'Khách Hàng BossHouse',
    petName: petName || 'Boss cưng',
    rating: Number(rating) || 5,
    comment,
    date: new Date().toISOString().split('T')[0],
    avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  };

  JsonDB.insert('reviews', newReview);
  res.status(201).json({ success: true, message: 'Cảm ơn bạn đã gửi đánh giá cho BossHouse!', data: newReview });
});

module.exports = router;
