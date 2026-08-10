import React, { useState, useEffect } from 'react';
import { X, Calendar, Dog, Hotel, Scissors, Check, AlertCircle } from './Icons';

export const BookingModal = ({ isOpen, onClose, rooms = [], services = [], pets = [], user, preselectedRoom, onSubmitBooking }) => {
  const [selectedPetId, setSelectedPetId] = useState('');
  const [customPetName, setCustomPetName] = useState('');
  const [customPetType, setCustomPetType] = useState('dog');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set default dates: check-in today/tomorrow, check-out +2 days
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 3);

    setCheckIn(tomorrow.toISOString().split('T')[0]);
    setCheckOut(dayAfter.toISOString().split('T')[0]);
  }, [isOpen]);

  useEffect(() => {
    if (preselectedRoom) {
      setSelectedRoomId(preselectedRoom.id);
    } else if (rooms.length > 0 && !selectedRoomId) {
      setSelectedRoomId(rooms[0].id);
    }
  }, [preselectedRoom, rooms]);

  useEffect(() => {
    if (pets.length > 0) {
      setSelectedPetId(pets[0].id);
    }
  }, [pets]);

  if (!isOpen) return null;

  const currentRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.max(d2 - d1, 86400000);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const roomPrice = currentRoom ? (currentRoom.pricePerNight || currentRoom.price || 150000) : 0;
  const roomTotal = roomPrice * nights;
  const serviceTotal = selectedServices.reduce((sum, s) => sum + (s.price || 0), 0);
  const grandTotal = roomTotal + serviceTotal;

  const toggleService = (srv) => {
    if (selectedServices.find(s => s.id === srv.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== srv.id));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let petName = customPetName;
    let petType = customPetType;

    if (selectedPetId !== 'custom') {
      const p = pets.find(item => item.id === selectedPetId);
      if (p) {
        petName = p.name;
        petType = p.type;
      }
    }

    const bookingPayload = {
      userId: user ? user.id : 'u-customer1',
      userName: user ? user.name : 'Khách Hàng',
      userPhone: user ? user.phone : '0987654321',
      petId: selectedPetId === 'custom' ? '' : selectedPetId,
      petName: petName || 'Boss cưng',
      petType: petType || 'dog',
      roomId: currentRoom ? currentRoom.id : '',
      checkIn,
      checkOut,
      selectedServices,
      specialRequests
    };

    await onSubmitBooking(bookingPayload);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f172a'
            }}>
              🐾
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem' }}>Đặt Phòng Lưu Trú Cho Boss</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Khách sạn & Dịch vụ Chăm sóc Thú cưng 5-Sao</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Choose Pet */}
          <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(15,23,42,0.6)', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Dog size={18} /> 1. CHỌN BOSS ĐƯỢC GỬI
            </h4>

            {pets.length > 0 ? (
              <div className="form-group">
                <label className="form-label">Chọn từ hồ sơ Boss của bạn:</label>
                <select 
                  className="form-select" 
                  value={selectedPetId} 
                  onChange={e => setSelectedPetId(e.target.value)}
                >
                  {pets.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.type === 'cat' ? 'Mèo' : 'Chó'} - {p.breed})
                    </option>
                  ))}
                  <option value="custom">+ Nhập thông tin Boss mới</option>
                </select>
              </div>
            ) : null}

            {(pets.length === 0 || selectedPetId === 'custom') && (
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Tên Boss *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="VD: Miu Miu, LuLu..." 
                    value={customPetName} 
                    onChange={e => setCustomPetName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Loại Boss *</label>
                  <select 
                    className="form-select" 
                    value={customPetType} 
                    onChange={e => setCustomPetType(e.target.value)}
                  >
                    <option value="cat">Mèo cưng 🐱</option>
                    <option value="dog">Chó cưng 🐶</option>
                    <option value="other">Thú cưng khác 🐰</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Choose Room & Dates */}
          <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(15,23,42,0.6)', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Hotel size={18} /> 2. PHÒNG KHÁCH SẠN & THỜI GIAN LƯU TRÚ
            </h4>

            <div className="form-group">
              <label className="form-label">Loại phòng khách sạn</label>
              <select 
                className="form-select" 
                value={selectedRoomId} 
                onChange={e => setSelectedRoomId(e.target.value)}
              >
                {rooms.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name} - {(r.pricePerNight || r.price || 150000).toLocaleString('vi-VN')}đ/đêm ({r.capacity})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Ngày nhận phòng (Check-in)</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={checkIn} 
                  onChange={e => setCheckIn(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Ngày trả phòng (Check-out)</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={checkOut} 
                  onChange={e => setCheckOut(e.target.value)} 
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 3: Add-on Services */}
          <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(15,23,42,0.6)', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scissors size={18} /> 3. CHỌN DỊCH VỤ SPA & ĐẶC BIỆT ĐI KÈM
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {services.map(srv => {
                const isSelected = selectedServices.some(s => s.id === srv.id);
                return (
                  <div 
                    key={srv.id} 
                    onClick={() => toggleService(srv)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(30, 41, 59, 0.8)',
                      border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{srv.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)' }}>+{srv.price.toLocaleString('vi-VN')}đ</div>
                    </div>
                    {isSelected && <Check size={18} color="var(--color-primary)" />}
                  </div>
                );
              })}
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="form-label">Yêu cầu đặc biệt cho Chăm sóc viên:</label>
              <textarea 
                className="form-textarea" 
                placeholder="VD: Nhờ gửi clip Zalo lúc 8h tối, Boss dị ứng hải sản..."
                value={specialRequests}
                onChange={e => setSpecialRequests(e.target.value)}
              />
            </div>
          </div>

          {/* Pricing Breakdown Summary */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(236,72,153,0.1) 100%)',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
              <span>Phòng: {currentRoom ? currentRoom.name : ''} ({nights} đêm)</span>
              <span>{roomTotal.toLocaleString('vi-VN')}đ</span>
            </div>
            {selectedServices.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
                <span>Dịch vụ đi kèm ({selectedServices.length} món)</span>
                <span>+{serviceTotal.toLocaleString('vi-VN')}đ</span>
              </div>
            )}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '10px',
              marginTop: '8px'
            }}>
              <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>TỔNG CỘNG THANH TOÁN:</span>
              <span style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--color-primary)' }}>
                {grandTotal.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy Bỏ</button>
            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
              {isSubmitting ? 'Đang Xử Lý...' : 'Xác Nhận Đặt Phòng Ngay 🐾'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
