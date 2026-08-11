import React, { useState } from 'react';
import { X, LogIn, UserPlus, ShieldCheck, User } from './Icons';

export const AuthModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isRegistering) {
      await onRegister({ name, email, password, phone });
    } else {
      await onLogin(email, password);
    }

    setIsSubmitting(false);
  };

  const fillDemoUser = () => {
    setEmail('thao.nguyen@gmail.com');
    setPassword('user123');
  };

  const fillDemoAdmin = () => {
    setEmail('admin@bosshouse.com');
    setPassword('admin123');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          maxWidth: '480px',
          background: 'linear-gradient(165deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(245, 158, 11, 0.15)',
          borderRadius: '24px',
          padding: '32px'
        }}
      >
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              color: '#0f172a',
              boxShadow: '0 6px 18px rgba(245, 158, 11, 0.35)'
            }}>
              🐾
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
                {isRegistering ? 'Đăng Ký Thành Viên VIP' : 'Cổng Đăng Nhập Hệ Thống'}
              </h2>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                {isRegistering ? 'Tạo tài khoản để trải nghiệm dịch vụ 5-sao cho Boss' : 'Nhập thông tin xác thực truy cập BossHouse'}
              </span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '50%', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>HỌ VÀ TÊN KHÁCH HÀNG *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="VD: Nguyễn Văn A" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>SỐ ĐIỆN THOẠI</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="VD: 0912345678" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>ĐỊA CHỈ EMAIL XÁC THỰC *</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="email@example.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.05em' }}>MẬT KHẨU *</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ 
              width: '100%', 
              marginTop: '12px',
              padding: '14px',
              fontSize: '1rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
              boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)'
            }} 
            disabled={isSubmitting}
          >
            {isRegistering ? <UserPlus size={20} /> : <LogIn size={20} />}
            {isSubmitting ? 'Đang Xử Lý Xác Thực...' : (isRegistering ? 'Đăng Ký Miễn Phí Ngay' : 'Đăng Nhập Hệ Thống')}
          </button>
        </form>

        {/* Quick Demo Login Buttons */}
        {!isRegistering && (
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'block', marginBottom: '12px', textAlign: 'center', fontWeight: 600 }}>
              ⚡ ĐĂNG NHẬP NHANH TÀI KHOẢN MẪU:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button 
                type="button"
                className="btn btn-secondary btn-sm" 
                onClick={fillDemoUser}
                style={{ padding: '10px', fontSize: '0.84rem', background: 'rgba(59, 130, 246, 0.12)', borderColor: 'rgba(59, 130, 246, 0.3)', color: '#60a5fa' }}
              >
                <User size={15} /> Demo Khách Hàng
              </button>
              <button 
                type="button"
                className="btn btn-secondary btn-sm" 
                onClick={fillDemoAdmin}
                style={{ padding: '10px', fontSize: '0.84rem', background: 'rgba(236, 72, 153, 0.12)', borderColor: 'rgba(236, 72, 153, 0.3)', color: '#f472b6' }}
              >
                <ShieldCheck size={15} /> Demo Admin (Quản Trị)
              </button>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#94a3b8' }}>
          {isRegistering ? 'Đã có tài khoản hệ thống? ' : 'Chưa có tài khoản? '}
          <button 
            type="button" 
            style={{ color: '#f59e0b', fontWeight: 700, border: 'none', background: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Đăng nhập ngay' : 'Tạo tài khoản mới'}
          </button>
        </div>
      </div>
    </div>
  );
};
