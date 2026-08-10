const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const JsonDB = require('../../config/db');

function getAuthenticatedUser(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer token-')) {
    return null;
  }

  const userId = authHeader.replace('Bearer token-', '');
  return JsonDB.findOne('users', user => user.id === userId) || null;
}

function buildAvatarUrl(name) {
  const encodedName = encodeURIComponent(name || 'BossHouse');
  return `https://ui-avatars.com/api/?name=${encodedName}&background=f59e0b&color=0f172a&size=150`;
}

// GET /api/reviews - Get all reviews
router.get('/', (req, res) => {
  const reviews = JsonDB.getCollection('reviews');
  reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json({ success: true, count: reviews.length, data: reviews });
});

// POST /api/reviews - Add review
router.post('/', (req, res) => {
  const { petName, rating, comment } = req.body;
  const user = getAuthenticatedUser(req);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Vui lòng đăng nhập để gửi đánh giá!' });
  }

  if (!comment || !rating) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập đánh giá và số sao!' });
  }

  const normalizedRating = Math.max(1, Math.min(5, Number(rating) || 0));
  const displayName = user.name || 'Khách Hàng BossHouse';

  const newReview = {
    id: 'rev-' + uuidv4().substring(0, 8),
    userId: user.id,
    userName: displayName,
    petName: petName || 'Boss cưng',
    rating: normalizedRating,
    comment,
    date: new Date().toISOString().split('T')[0],
    avatar: buildAvatarUrl(displayName)
  };

  JsonDB.insert('reviews', newReview);
  res.status(201).json({ success: true, message: 'Cảm ơn bạn đã gửi đánh giá cho BossHouse!', data: newReview });
});

module.exports = router;
