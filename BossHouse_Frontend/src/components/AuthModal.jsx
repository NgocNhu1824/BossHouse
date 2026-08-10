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
      <div className="modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '460px' }}>
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
            <h2 style={{ fontSize: '1.25rem' }}>
              {isRegistering ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập BossHouse'}
            </h2>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <div className="form-group">
                <label className="form-label">Họ và tên *</label>
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
                <label className="form-label">Số điện thoại</label>
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
            <label className="form-label">Địa chỉ Email *</label>
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
            <label className="form-label">Mật khẩu *</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={isSubmitting}>
            {isRegistering ? <UserPlus size={18} /> : <LogIn size={18} />}
            {isSubmitting ? 'Đang Xử Lý...' : (isRegistering ? 'Đăng Ký Thành Viên' : 'Đăng Nhập')}
          </button>
        </form>

        {/* Quick Demo Login Buttons */}
        {!isRegistering && (
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '10px', textAlign: 'center' }}>
              Đăng nhập nhanh tài khoản thử nghiệm:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button className="btn btn-secondary btn-sm" onClick={fillDemoUser}>
                <User size={14} color="var(--color-primary)" /> Demo Khách Hàng
              </button>
              <button className="btn btn-secondary btn-sm" onClick={fillDemoAdmin}>
                <ShieldCheck size={14} color="#f472b6" /> Demo Admin
              </button>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.88rem' }}>
          {isRegistering ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
          <button 
            type="button" 
            style={{ color: 'var(--color-primary)', fontWeight: 600, border: 'none', background: 'none' }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Đăng nhập ngay' : 'Đăng ký miễn phí'}
          </button>
        </div>
      </div>
    </div>
  );
};
