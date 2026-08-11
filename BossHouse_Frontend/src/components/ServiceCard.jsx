import React from 'react';
import { Clock, Star, Sparkles, Scissors, HeartPulse, Eye } from './Icons';

export const ServiceCard = ({ service, onBook, user, onEdit, onViewDetail }) => {
  return (
    <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div 
        style={{ 
          position: 'relative', 
          height: '220px',
          background: '#070a13',
          overflow: 'hidden', 
          cursor: 'pointer' 
        }}
        onClick={() => onViewDetail && onViewDetail(service)}
        title="Click để xem Chi Tiết dịch vụ & Ảnh Full"
      >
        <img 
          src={service.image} 
          alt={service.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {service.featured && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Sparkles size={12} /> HOT & RECOMENDED
          </div>
        )}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'rgba(15, 23, 42, 0.85)',
          padding: '4px 8px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#fbbf24'
        }}>
          <Star size={14} fill="#fbbf24" /> {service.rating}
        </div>

        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
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

      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 
          style={{ fontSize: '1.15rem', marginBottom: '8px', cursor: 'pointer' }}
          onClick={() => onViewDetail && onViewDetail(service)}
        >
          {service.name}
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
          {service.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={15} color="var(--color-primary)" /> {service.duration}
          </span>
          <span>•</span>
          <span>Dành cho: <strong>{service.petTypes ? service.petTypes.join(', ').toUpperCase() : 'MÈO & CHÓ'}</strong></span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '14px',
          borderTop: '1px solid var(--color-border)',
          gap: '8px'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block' }}>Chi phí</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              {service.price.toLocaleString('vi-VN')}đ
              <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>/{service.unit}</span>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              className="btn btn-secondary btn-sm" 
              style={{ padding: '8px' }}
              onClick={() => onViewDetail && onViewDetail(service)}
              title="Xem Chi Tiết & Ảnh Full"
            >
              <Eye size={16} />
            </button>

            {user && user.role === 'admin' ? (
              <button 
                className="btn btn-secondary btn-sm" 
                style={{ color: '#f472b6', borderColor: 'rgba(244,114,182,0.4)', background: 'rgba(244,114,182,0.1)', fontSize: '0.82rem' }}
                onClick={() => onEdit ? onEdit(service) : onBook(service)}
              >
                <Scissors size={14} /> Sửa
              </button>
            ) : (
              <button className="btn btn-secondary btn-sm" onClick={() => onBook(service)}>
                Chọn
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
