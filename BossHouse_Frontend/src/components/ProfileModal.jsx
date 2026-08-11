import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, ShieldCheck, CheckCircle, Settings } from './Icons';

export const ProfileModal = ({ isOpen, onClose, user, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        password: ''
      });
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      userId: user.id,
      name: formData.name,
      phone: formData.phone
    };

    if (formData.password) {
      payload.password = formData.password;
    }

    await onUpdateProfile(payload);
    setIsSubmitting(false);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="badge badge-danger">👑 Quản Trị Viên (Admin)</span>;
      case 'staff':
        return <span className="badge badge-warning">👔 Nhân Viên Hệ Thống (Staff)</span>;
      default:
        return <span className="badge badge-info">⭐️ Khách Hàng Thân Thiết</span>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          maxWidth: '540px',
          background: 'linear-gradient(165deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(245, 158, 11, 0.15)',
          borderRadius: '24px',
          padding: '30px'
        }}
      >
        {/* Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f172a',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)'
            }}>
              <User size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#fff' }}>Hồ Sơ Tài Khoản Cá Nhân</h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>
                Quản lý thông tin xác thực & mật khẩu BossHouse
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '50%', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        {/* User Status Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{user.name}</div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '2px' }}>{user.email}</div>
          </div>
          <div>
            {getRoleBadge(user.role)}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>
              <User size={16} color="#f59e0b" /> HỌ VÀ TÊN KHÁCH HÀNG / ADMIN *
            </label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required 
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>
                <Mail size={16} color="#94a3b8" /> EMAIL (ĐÃ CỐ ĐỊNH)
              </label>
              <input 
                type="email" 
                className="form-input" 
                value={user.email}
                disabled
                style={{ opacity: 0.7, cursor: 'not-allowed', background: 'rgba(0,0,0,0.3)' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>
                <Phone size={16} color="#f59e0b" /> SỐ ĐIỆN THOẠI
              </label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="0912345678"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>
              <Settings size={16} color="#f59e0b" /> ĐỔI MẬT KHẨU MỚI (ĐỂ TRỐNG NẾU KHÔNG ĐỔI)
            </label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Nhập mật khẩu mới..."
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)', color: '#fff', fontWeight: 700 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang Cập Nhật...' : 'Lưu Cập Nhật Hồ Sơ 💾'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
