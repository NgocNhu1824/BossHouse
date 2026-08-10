import React from 'react';
import { Check, Star, Video, ShieldCheck, Heart } from 'lucide-react';

export const RoomCard = ({ room, onBook }) => {
  const categoryLabels = {
    cat: 'Mèo cưng 🐱',
    dog: 'Cún cưng 🐶',
    vip: 'Siêu VIP 👑',
    standard: 'Tiêu Chuẩn ⭐️'
  };

  return (
    <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Image container */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <img 
          src={room.image} 
          alt={room.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
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
          <Star size={14} fill="#fbbf24" /> {room.rating}
        </div>
      </div>

      {/* Content body */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{room.name}</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px', flex: 1 }}>
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
          <div>Diện tích: <strong style={{ color: 'white' }}>{room.size}</strong></div>
        </div>

        {/* Amenities */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-subtle)', marginBottom: '8px' }}>
            TIỆN NGHI CAO CẤP:
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {room.amenities.slice(0, 3).map((item, idx) => (
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
          borderTop: '1px solid var(--color-border)'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block' }}>Giá lưu trú</span>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              {room.pricePerNight.toLocaleString('vi-VN')}đ
              <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>/đêm</span>
            </span>
          </div>

          <button className="btn btn-primary" onClick={() => onBook(room)}>
            Đặt Phòng
          </button>
        </div>
      </div>
    </div>
  );
};
