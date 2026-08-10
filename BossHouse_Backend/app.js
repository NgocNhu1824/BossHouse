var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var authRouter = require('./routes/api/auth');
var servicesRouter = require('./routes/api/services');
var roomsRouter = require('./routes/api/rooms');
var bookingsRouter = require('./routes/api/bookings');
var petsRouter = require('./routes/api/pets');
var reviewsRouter = require('./routes/api/reviews');
var adminRouter = require('./routes/api/admin');

var app = express();

// Enable CORS for frontend requests
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Root route welcome API
app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    message: 'Welcome to BossHouse Pet Hotel & Spa API',
    endpoints: [
      '/api/auth',
      '/api/services',
      '/api/rooms',
      '/api/bookings',
      '/api/pets',
      '/api/reviews',
      '/api/admin/stats'
    ]
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/services', servicesRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/pets', petsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Lỗi hệ thống máy chủ',
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
