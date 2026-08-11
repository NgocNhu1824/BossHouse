import React from 'react';
import { Check, Star, Video, ShieldCheck, Heart, Eye } from './Icons';

export const RoomCard = ({ room, onBook, user, onEdit, onViewDetail }) => {
  const categoryLabels = {
    cat: 'Mèo cưng 🐱',
    dog: 'Cún cưng 🐶',
    vip: 'Siêu VIP 👑',
    standard: 'Tiêu Chuẩn ⭐️'
  };

  const roomPrice = room.pricePerNight || room.price || 150000;
  const roomAmenities = room.amenities || room.features || ['Điều hòa 24/7', 'Camera Live HD', 'Nệm êm ái'];

  return (
    <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Image container with click to view FULL uncropped detail */}
      <div 
        style={{ 
          position: 'relative', 
          height: '220px',
          background: '#070a13',
          overflow: 'hidden', 
          cursor: 'pointer' 
        }}
        onClick={() => onViewDetail && onViewDetail(room)}
        title="Click để xem Chi Tiết phòng & Ảnh Full"
      >
        <img 
          src={room.image || 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=800'} 
          alt={room.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.4s ease' }}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(6px)',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--color-primary)'
        }}>
          {categoryLabels[room.category] || room.category}
        </div>

        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(15, 23, 42, 0.85)',
          padding: '4px 8px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#fbbf24'
        }}>
          <Star size={14} fill="#fbbf24" /> {room.rating || 5.0}
        </div>

        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(8px)',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          color: '#f59e0b',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          <Eye size={13} /> Xem Chi Tiết
        </div>
      </div>

      {/* Content body */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 
          style={{ fontSize: '1.2rem', marginBottom: '8px', cursor: 'pointer' }}
          onClick={() => onViewDetail && onViewDetail(room)}
        >
          {room.name}
        </h3>
        <p style={{ 
          fontSize: '0.88rem', 
          color: 'var(--color-text-muted)', 
          marginBottom: '16px', 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          height: '2.7em',
          lineHeight: '1.35em'
        }}>
          {room.description}
        </p>

        {/* Room specs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          background: 'rgba(15, 23, 42, 0.5)',
          padding: '10px 12px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '16px',
          fontSize: '0.82rem',
          color: 'var(--color-text-muted)'
        }}>
          <div>Sức chứa: <strong style={{ color: 'white' }}>{room.capacity}</strong></div>
          <div>Diện tích: <strong style={{ color: 'white' }}>{room.size || '2.5m x 2.0m'}</strong></div>
        </div>

        {/* Amenities */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-subtle)', marginBottom: '8px' }}>
            TIỆN NGHI CAO CẤP:
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {roomAmenities.slice(0, 3).map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem' }}>
                <Check size={14} color="#10b981" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Price & Action */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '16px',
          borderTop: '1px solid var(--color-border)',
          gap: '8px'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block' }}>Giá lưu trú</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              {roomPrice.toLocaleString('vi-VN')}đ
              <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>/đêm</span>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              className="btn btn-secondary btn-sm" 
              style={{ padding: '8px' }}
              onClick={() => onViewDetail && onViewDetail(room)}
              title="Xem Chi Tiết & Ảnh Full"
            >
              <Eye size={16} />
            </button>

            {user && user.role === 'admin' ? (
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ color: '#f472b6', borderColor: 'rgba(244,114,182,0.4)', background: 'rgba(244,114,182,0.1)', fontSize: '0.82rem' }}
                onClick={() => onEdit ? onEdit(room) : onBook(room)}
              >
                <ShieldCheck size={15} /> Sửa
              </button>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={() => onBook(room)}>
                Đặt Phòng
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
