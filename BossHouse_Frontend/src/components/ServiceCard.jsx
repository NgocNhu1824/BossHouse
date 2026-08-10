import React from 'react';
import { Clock, Star, Sparkles, Scissors, HeartPulse } from 'lucide-react';

export const ServiceCard = ({ service, onBook }) => {
  return (
    <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img 
          src={service.image} 
          alt={service.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
      </div>

      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>{service.name}</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px', flex: 1 }}>
          {service.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={15} color="var(--color-primary)" /> {service.duration}
          </span>
          <span>•</span>
          <span>Dành cho: <strong>{service.petTypes.join(', ').toUpperCase()}</strong></span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '14px',
          borderTop: '1px solid var(--color-border)'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block' }}>Chi phí</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              {service.price.toLocaleString('vi-VN')}đ
              <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>/{service.unit}</span>
            </span>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={() => onBook(service)}>
            Chọn Dịch Vụ
          </button>
        </div>
      </div>
    </div>
  );
};
