import React from 'react';
import { X, Star, Check, ShieldCheck, Calendar, Clock, Video, Heart, Sparkles, Scissors } from './Icons';

export const DetailModal = ({ isOpen, onClose, item, type = 'room', user, onBook, onEdit }) => {
  if (!isOpen || !item) return null;

  const isAdmin = user?.role === 'admin';
  const isRoom = type === 'room';

  const roomPrice = item.pricePerNight || item.price || 150000;
  const roomAmenities = item.amenities || item.features || ['Điều hòa 24/7', 'Camera Live HD 24/7', 'Khử trùng UV', 'Nệm cao cấp'];

  const categoryLabels = {
    cat: 'Mèo cưng 🐱',
    dog: 'Cún cưng 🐶',
    vip: 'Siêu VIP 👑',
    standard: 'Tiêu Chuẩn ⭐️',
    spa: 'Spa & Grooming ✂️',
    care: 'Vận Động 🐕',
    health: 'Thú Y 🩺',
    nutrition: 'Gourmet 🥩'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          maxWidth: '820px',
          width: '94%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'linear-gradient(165deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(245, 158, 11, 0.15)',
          borderRadius: '24px',
          padding: '24px 28px'
        }}
      >
        {/* Modal Top Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '14px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: isRoom 
                ? 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)'
                : 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
              flexShrink: 0
            }}>
              {isRoom ? '🏨' : '✂️'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 800, color: '#fff' }}>{item.name}</h3>
                <span className="badge badge-warning" style={{ fontSize: '0.78rem', padding: '3px 10px' }}>
                  {categoryLabels[item.category] || item.category || 'Cao cấp'}
                </span>
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '50%', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* 2-Column Side-by-Side Body: LEFT Image, RIGHT Information */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '24px',
            alignItems: 'stretch'
          }} 
          className="detail-modal-grid"
        >
          {/* LEFT COLUMN: 🖼️ Image Canvas (Full uncropped photo object-fit contain) */}
          <div style={{
            background: '#070a13',
            borderRadius: '16px',
            padding: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '280px',
            maxHeight: '340px',
            position: 'relative',
            boxShadow: 'inset 0 0 25px rgba(0,0,0,0.8)'
          }}>
            <img 
              src={item.image || (isRoom ? 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=800' : 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800')} 
              alt={item.name} 
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '10px'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: '16px',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              border: '1px solid rgba(251, 191, 36, 0.3)'
            }}>
              <Star size={13} fill="#fbbf24" /> {item.rating || 5.0}
            </div>
          </div>

          {/* RIGHT COLUMN: Information, Description, Specs, Amenities & Action */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Full Description (Full Text in Detail View) */}
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '6px', letterSpacing: '0.04em' }}>
                  MÔ TẢ CHI TIẾT
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                  {item.description || 'Không gian nghỉ dưỡng đạt chuẩn 5 sao với đầy đủ tiện nghi, thông thoáng, được tiệt trùng UV hàng ngày giúp Boss yêu của bạn luôn thoải mái và an toàn nhất.'}
                </p>
              </div>

              {/* Specs Summary for Rooms */}
              {isRoom && (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '8px', 
                  background: 'rgba(15, 23, 42, 0.6)', 
                  padding: '10px 14px', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.82rem',
                  marginBottom: '16px'
                }}>
                  <div>Sức chứa: <strong style={{ color: '#fff' }}>{item.capacity || '1 Boss (<15kg)'}</strong></div>
                  <div>Diện tích: <strong style={{ color: '#fff' }}>{item.size || '2.5m x 2.0m'}</strong></div>
                </div>
              )}

              {/* Amenities & Features */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  {isRoom ? 'TIỆN NGHI CAO CẤP ĐI KÈM:' : 'ĐẶC ĐIỂM GÓI DỊCH VỤ:'}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {(isRoom ? roomAmenities : (item.petTypes ? [`Áp dụng: ${item.petTypes.join(', ').toUpperCase()}`, `Thời lượng: ${item.duration || '45 phút'}`, 'Tiệt trùng VIP 100%', 'Chăm sóc 1-on-1'] : ['Chăm sóc 1-on-1', 'Tiệt trùng UV 100%'])).map((eff, i) => (
                    <span key={i} style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '5px', 
                      fontSize: '0.78rem', 
                      color: '#e2e8f0', 
                      background: 'rgba(15, 23, 42, 0.6)', 
                      padding: '5px 10px', 
                      borderRadius: '8px', 
                      border: '1px solid rgba(255, 255, 255, 0.08)' 
                    }}>
                      <Check size={13} color="#10b981" /> {eff}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Action Modal Footer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              marginTop: 'auto',
              gap: '12px'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>
                  {isRoom ? 'Giá niêm yết' : 'Chi phí dịch vụ'}
                </span>
                <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f59e0b' }}>
                  {(isRoom ? roomPrice : (item.price || 100000)).toLocaleString('vi-VN')}đ
                  <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#94a3b8' }}>
                    {isRoom ? '/đêm' : `/${item.unit || 'lần'}`}
                  </span>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ padding: '8px 14px' }}>
                  Đóng
                </button>

                {isAdmin ? (
                  <button 
                    className="btn btn-primary btn-sm"
                    style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff', fontWeight: 700, padding: '8px 16px' }}
                    onClick={() => { onClose(); if (onEdit) onEdit(item); }}
                  >
                    <ShieldCheck size={16} /> Sửa Dữ Liệu (CRUD)
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary btn-sm"
                    style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)', color: '#fff', fontWeight: 700, padding: '8px 16px' }}
                    onClick={() => { onClose(); if (onBook) onBook(item); }}
                  >
                    {isRoom ? <Calendar size={16} /> : <Scissors size={16} />}
                    {isRoom ? 'Đặt Phòng Ngay' : 'Chọn Dịch Vụ'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
