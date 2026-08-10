import React from 'react';
import { Calendar, Shield, Sparkles, Award, Video, Heart } from './Icons';

export const Hero = ({ onOpenBooking, onExploreRooms }) => {
  return (
    <section style={{
      position: 'relative',
      padding: '70px 0 80px 0',
      overflow: 'hidden',
      background: 'radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.12) 0%, rgba(15, 23, 42, 0) 70%)'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
        {/* Left text column */}
        <div>
          <div className="badge badge-warning" style={{ marginBottom: '20px', padding: '6px 14px', fontSize: '0.85rem' }}>
            <Sparkles size={16} /> Dịch Vụ Khách Sạn & Spa Thú Cưng Hàng Đầu
          </div>
          
          <h1 style={{ fontSize: '3.2rem', marginBottom: '20px', lineHeight: 1.15 }}>
            Ngôi Nhà Thứ Hai <br />
            Dành Riêng Cho <span className="gradient-text">Boss Yêu</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '32px', maxWidth: '540px' }}>
            Yên tâm đi công tác hay du lịch với hệ thống phòng khách sạn sang trọng, điều hòa 24/7, camera trực tiếp HD và chế độ chăm sóc 1-on-1 từ chuyên gia.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button className="btn btn-primary btn-lg" onClick={onOpenBooking}>
              <Calendar size={22} /> Đặt Phòng Ngay
            </button>
            <button className="btn btn-secondary btn-lg" onClick={onExploreRooms}>
              Xem Danh Sách Phòng
            </button>
          </div>

          {/* Quick Stats Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>5,000+</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Boss Đã Phục Vụ</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ec4899' }}>99.8%</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Đánh Giá 5-Sao</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981' }}>24/7</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Camera Live HD</div>
            </div>
          </div>
        </div>

        {/* Right Feature Card Visual */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: '-20px',
            background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(30px)',
            zIndex: 0
          }} />
          
          <div className="card-glass" style={{ position: 'relative', zIndex: 1, padding: '24px' }}>
            <img 
              src="https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=800&q=80" 
              alt="VIP Cat Suite" 
              style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}
            />
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge-success" style={{ marginBottom: '6px' }}>Đang Có Sẵn</span>
                <h3 style={{ fontSize: '1.3rem' }}>Phòng VIP Cat & Dog Suites</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>Gỗ cao cấp • Khử trùng UV • Đệm êm</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Chỉ từ</span>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary)' }}>150k<span style={{ fontSize: '0.85rem' }}>/đêm</span></div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid var(--color-border)',
              fontSize: '0.85rem'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#60a5fa' }}><Video size={16} /> Live Cam</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b' }}><Award size={16} /> Chăm sóc VIP</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ec4899' }}><Heart size={16} /> Yêu thương 100%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
