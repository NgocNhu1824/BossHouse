const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const JsonDB = require('../../config/db');

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ tên, email và mật khẩu!' });
  }

  const existingUser = JsonDB.findOne('users', u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email này đã được đăng ký tài khoản!' });
  }

  const newUser = {
    id: 'u-' + uuidv4().substring(0, 8),
    name,
    email,
    password: password, // In production, hash with bcrypt
    plainPassword: password,
    role: 'customer',
    phone: phone || '',
    createdAt: new Date().toISOString()
  };

  JsonDB.insert('users', newUser);

  // Return user info without password
  const { password: _, plainPassword: __, ...userProfile } = newUser;
  res.status(201).json({
    success: true,
    message: 'Đăng ký tài khoản thành công!',
    user: userProfile,
    token: `token-${newUser.id}`
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền email và mật khẩu!' });
  }

  const user = JsonDB.findOne('users', u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || (user.password !== password && user.plainPassword !== password)) {
    return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không chính xác!' });
  }

  const { password: _, plainPassword: __, ...userProfile } = user;
  res.json({
    success: true,
    message: 'Đăng nhập thành công!',
    user: userProfile,
    token: `token-${user.id}`
  });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer token-')) {
    return res.status(401).json({ success: false, message: 'Chưa đăng nhập!' });
  }

  const userId = authHeader.replace('Bearer token-', '');
  const user = JsonDB.findOne('users', u => u.id === userId);

  if (!user) {
    return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng!' });
  }

  const { password: _, plainPassword: __, ...userProfile } = user;
  res.json({ success: true, user: userProfile });
});

module.exports = router;
