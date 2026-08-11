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
      <div 
        className="modal-container" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          maxWidth: '720px',
          background: 'linear-gradient(165deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(245, 158, 11, 0.15)',
          borderRadius: '24px',
          padding: '30px'
        }}
      >
        {/* Modal Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              color: '#0f172a',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)'
            }}>
              ✨
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>Đăng Ký Đặt Phòng & Dịch Vụ VIP</h2>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>Hệ thống lưu trú & Spa chuyên nghiệp hàng đầu cho Mèo & Cún cưng</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '50%', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Choose Pet */}
          <div style={{ marginBottom: '20px', padding: '18px', background: 'rgba(15,23,42,0.6)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '14px', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.04em' }}>
              <Dog size={18} /> 1. THÔNG TIN BOSS CƯNG ĐƯỢC GỬI
            </h4>

            {pets.length > 0 ? (
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>CHỌN TỪ HỒ SƠ BOSS ĐÃ ĐĂNG KÝ:</label>
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
                  <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>TÊN BOSS *</label>
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
                  <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>LOẠI BOSS *</label>
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

          {/* Section 2: Choose Room & Dates with FULL UNCROPPED IMAGE PREVIEW */}
          <div style={{ marginBottom: '20px', padding: '18px', background: 'rgba(15,23,42,0.6)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '14px', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.04em' }}>
              <Hotel size={18} /> 2. CHỌN PHÒNG KHÁCH SẠN & THỜI GIAN LƯU TRÚ
            </h4>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>CHỌN HẠNG PHÒNG KHÁCH SẠN:</label>
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

            {/* Selected Room Preview Card with FULL UNCROPPED IMAGE */}
            {currentRoom && (
              <div style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                background: '#070a13',
                padding: '12px',
                borderRadius: '14px',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                marginBottom: '16px'
              }}>
                <div style={{ width: '130px', height: '90px', background: '#000', borderRadius: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img 
                    src={currentRoom.image || 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=800'} 
                    alt={currentRoom.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>{currentRoom.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '2px 0 4px 0' }}>{currentRoom.description}</div>
                  <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
                    Sức chứa: {currentRoom.capacity} • Camera Live HD 24/7
                  </div>
                </div>
              </div>
            )}

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>NGÀY NHẬN PHÒNG (CHECK-IN) *</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={checkIn} 
                  onChange={e => setCheckIn(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>NGÀY TRẢ PHÒNG (CHECK-OUT) *</label>
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
          <div style={{ marginBottom: '20px', padding: '18px', background: 'rgba(15,23,42,0.6)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '14px', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.04em' }}>
              <Scissors size={18} /> 3. CHỌN DỊCH VỤ SPA & CHĂM SÓC ĐI KÈM
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {services.map(srv => {
                const isSelected = selectedServices.some(s => s.id === srv.id);
                return (
                  <div 
                    key={srv.id} 
                    onClick={() => toggleService(srv)}
                    style={{
                      padding: '12px',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(30, 41, 59, 0.8)',
                      border: `1px solid ${isSelected ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: isSelected ? '#f59e0b' : '#fff' }}>{srv.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 600 }}>+{srv.price.toLocaleString('vi-VN')}đ</div>
                    </div>
                    {isSelected && <Check size={18} color="#f59e0b" />}
                  </div>
                );
              })}
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>GHI CHÚ / YÊU CẦU ĐẶC BIỆT CHO CHĂM SÓC VIÊN:</label>
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
            background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(236,72,153,0.12) 100%)',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: '16px',
            padding: '18px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px', color: '#cbd5e1' }}>
              <span>Tiền phòng: {currentRoom ? currentRoom.name : ''} ({nights} đêm)</span>
              <strong>{roomTotal.toLocaleString('vi-VN')}đ</strong>
            </div>
            {selectedServices.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px', color: '#cbd5e1' }}>
                <span>Dịch vụ đi kèm ({selectedServices.length} gói)</span>
                <strong style={{ color: '#34d399' }}>+{serviceTotal.toLocaleString('vi-VN')}đ</strong>
              </div>
            )}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '12px',
              marginTop: '10px'
            }}>
              <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff' }}>TỔNG THANH TOÁN DỰ KIẾN:</span>
              <span style={{ fontWeight: 800, fontSize: '1.5rem', color: '#f59e0b' }}>
                {grandTotal.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy Bỏ</button>
            <button 
              type="submit" 
              className="btn btn-primary btn-lg" 
              style={{ 
                background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)', 
                color: '#fff',
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.35)'
              }} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang Xử Lý...' : 'Xác Nhận Đặt Phòng Ngay 🐾'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
