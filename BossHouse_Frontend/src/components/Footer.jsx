import React from 'react';
import { Phone, Mail, MapPin, Heart, Shield, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      background: '#090d16',
      borderTop: '1px solid var(--color-border)',
      padding: '50px 0 24px 0',
      color: 'var(--color-text-muted)',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div className="grid-4" style={{ marginBottom: '40px' }}>
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f172a',
                fontWeight: 'bold'
              }}>
                🐾
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white' }}>
                Boss<span className="gradient-text">House</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              Hệ thống Khách sạn & Dịch vụ Chăm sóc Thú cưng chuẩn 5 sao. Nơi Boss cưng được yêu thương, nghỉ dưỡng và spa đẳng cấp nhất.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '16px', fontSize: '1.05rem' }}>Dịch Vụ Nổi Bật</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li>🐾 Phòng VIP Cat Suite 5-Sao</li>
              <li>🐶 Biệt Thự Dog Villa Deluxe</li>
              <li>✂️ Spa Cắt Tỉa Lông Hàn Quốc</li>
              <li>🛁 Tắm Dưỡng Thảo Mộc Khử Mùi</li>
              <li>🩺 Khám Sức Khỏe & Tiêm Phòng</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '16px', fontSize: '1.05rem' }}>Cam Kết Chất Lượng</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={16} color="#f59e0b" /> Camera HD Live 24/7
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="#f59e0b" /> Phục vụ 365 ngày/năm
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={16} color="#ec4899" /> Chăm sóc viên 1-on-1 tận tâm
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '16px', fontSize: '1.05rem' }}>Liên Hệ Trực Tiếp</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} color="#f59e0b" /> 182 Boss House Street, Q. 1, TP. Hồ Chí Minh
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="#10b981" /> 0988.888.888 / 0912.345.678
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="#3b82f6" /> contact@bosshouse.vn
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '20px',
          textAlign: 'center',
          fontSize: '0.85rem'
        }}>
          © 2026 BossHouse Platform. Built with ❤️ for Pets & Sen. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
