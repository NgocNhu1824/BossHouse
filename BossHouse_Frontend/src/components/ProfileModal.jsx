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
      <div className="modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f172a'
            }}>
              <User size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Hồ Sơ Cá Nhân</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Quản lý và cập nhật thông tin tài khoản BossHouse
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        {/* User Status Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{user.name}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{user.email}</div>
          </div>
          <div>
            {getRoleBadge(user.role)}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={16} color="var(--color-primary)" /> Họ Và Tên *
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
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={16} color="var(--color-text-muted)" /> Email (Đã cố định)
              </label>
              <input 
                type="email" 
                className="form-input" 
                value={user.email}
                disabled
                style={{ opacity: 0.7, cursor: 'not-allowed', background: 'rgba(0,0,0,0.2)' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={16} color="var(--color-primary)" /> Số Điện Thoại
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
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Settings size={16} color="var(--color-primary)" /> Đổi Mật Khẩu Mới (Để trống nếu không đổi)
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
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Đang Cập Nhật...' : 'Lưu Cập Nhật Hồ Sơ 💾'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
