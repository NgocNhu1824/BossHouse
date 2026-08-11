import React, { useState, useEffect } from 'react';
import { X } from './Icons';

// Modal to Add / Edit Room
export const RoomModal = ({ isOpen, onClose, room, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'standard',
    price: 150000,
    capacity: '1 Boss (<10kg)',
    description: '',
    image: '',
    status: 'available'
  });

  useEffect(() => {
    if (room) {
      setFormData({
        name: room.name || '',
        category: room.category || 'standard',
        price: room.price || 150000,
        capacity: room.capacity || '1 Boss (<10kg)',
        description: room.description || '',
        image: room.image || '',
        status: room.status || 'available'
      });
    } else {
      setFormData({
        name: '',
        category: 'standard',
        price: 150000,
        capacity: '1 Boss (<10kg)',
        description: '',
        image: '',
        status: 'available'
      });
    }
  }, [room, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          maxWidth: '600px',
          background: 'linear-gradient(165deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
          border: '1px solid rgba(236, 72, 153, 0.35)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(236, 72, 153, 0.15)',
          borderRadius: '24px',
          padding: '30px'
        }}
      >
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(236, 72, 153, 0.4)'
            }}>
              🏨
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                {room ? '✏️ Cập Nhật Phòng Khách Sạn (CRUD)' : '➕ Thêm Phòng Khách Sạn Mới (CRUD)'}
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Cổng quản trị dữ liệu lưu trú BossHouse Enterprise</span>
            </div>
          </div>
          <button onClick={onClose} className="close-btn" style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '50%', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>TÊN PHÒNG KHÁCH SẠN *</label>
            <input 
              type="text"
              className="form-input"
              placeholder="VD: Deluxe VIP Suite #01"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>HẠNG PHÒNG</label>
              <select 
                className="form-select"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="standard">Standard (Tiêu chuẩn)</option>
                <option value="deluxe">Deluxe (Cao cấp VIP)</option>
                <option value="cat">Cat Villa (Dành riêng cho Mèo)</option>
                <option value="dog">Dog Villa (Dành riêng cho Cún)</option>
                <option value="vip">Super VIP Suite 👑</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>ĐƠN GIÁ / ĐÊM (VNĐ) *</label>
              <input 
                type="number"
                className="form-input"
                step="10000"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>SỨC CHỨA THÚ CƯNG</label>
            <input 
              type="text"
              className="form-input"
              placeholder="VD: 1-2 Boss cưng (<15kg)"
              value={formData.capacity}
              onChange={e => setFormData({ ...formData, capacity: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>LINK HÌNH ẢNH PHÒNG (URL)</label>
            <input 
              type="text"
              className="form-input"
              placeholder="https://..."
              value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          {/* Full Uncropped Image Preview Canvas */}
          {formData.image && (
            <div style={{
              background: '#070a13',
              borderRadius: '12px',
              padding: '10px',
              marginBottom: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxHeight: '160px',
              overflow: 'hidden'
            }}>
              <img 
                src={formData.image} 
                alt="Preview" 
                style={{ maxWidth: '100%', maxHeight: '140px', objectFit: 'contain', borderRadius: '8px' }} 
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>MÔ TẢ CHI TIẾT PHÒNG</label>
            <textarea 
              className="form-textarea"
              placeholder="Nhập tiện ích phòng (Điều hòa 24/7, Camera HD, Đệm êm...)"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy Bỏ</button>
            <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff', fontWeight: 700 }}>
              {room ? 'Lưu Cập Nhật (CRUD)' : 'Tạo Phòng Mới (CRUD)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal to Add / Edit Spa Service
export const ServiceModal = ({ isOpen, onClose, service, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'grooming',
    price: 150000,
    duration: '60 phút',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || '',
        category: service.category || 'grooming',
        price: service.price || 150000,
        duration: service.duration || '60 phút',
        description: service.description || '',
        image: service.image || ''
      });
    } else {
      setFormData({
        name: '',
        category: 'grooming',
        price: 150000,
        duration: '60 phút',
        description: '',
        image: ''
      });
    }
  }, [service, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          maxWidth: '600px',
          background: 'linear-gradient(165deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
          border: '1px solid rgba(236, 72, 153, 0.35)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(236, 72, 153, 0.15)',
          borderRadius: '24px',
          padding: '30px'
        }}
      >
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(236, 72, 153, 0.4)'
            }}>
              ✂️
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                {service ? '✏️ Cập Nhật Dịch Vụ Spa (CRUD)' : '✂️ Thêm Dịch Vụ Spa Mới (CRUD)'}
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Quản trị bảng giá và nội dung gói làm đẹp thú cưng</span>
            </div>
          </div>
          <button onClick={onClose} className="close-btn" style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '50%', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>TÊN DỊCH VỤ SPA *</label>
            <input 
              type="text"
              className="form-input"
              placeholder="VD: Cắt Tỉa Lông Nghệ Thuật"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>PHÂN LOẠI DỊCH VỤ</label>
              <select 
                className="form-select"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="grooming">Cắt tỉa & Tạo kiểu (Grooming)</option>
                <option value="spa">Spa Thảo Dược & Massage</option>
                <option value="care">Vận Động Đi Dạo Công Viên</option>
                <option value="health">Thú Y & Tiêm Phòng</option>
                <option value="nutrition">Thực Đơn Gourmet</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>ĐƠN GIÁ DỊCH VỤ (VNĐ) *</label>
              <input 
                type="number"
                className="form-input"
                step="10000"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>THỜI GIAN THỰC HIỆN</label>
            <input 
              type="text"
              className="form-input"
              placeholder="VD: 45 - 60 phút"
              value={formData.duration}
              onChange={e => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>LINK HÌNH ẢNH DỊCH VỤ (URL)</label>
            <input 
              type="text"
              className="form-input"
              placeholder="https://..."
              value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          {/* Full Uncropped Image Preview Canvas */}
          {formData.image && (
            <div style={{
              background: '#070a13',
              borderRadius: '12px',
              padding: '10px',
              marginBottom: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxHeight: '160px',
              overflow: 'hidden'
            }}>
              <img 
                src={formData.image} 
                alt="Preview" 
                style={{ maxWidth: '100%', maxHeight: '140px', objectFit: 'contain', borderRadius: '8px' }} 
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>MÔ TẢ QUY TRÌNH DỊCH VỤ</label>
            <textarea 
              className="form-textarea"
              placeholder="Mô tả quy trình thực hiện dịch vụ..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy Bỏ</button>
            <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff', fontWeight: 700 }}>
              {service ? 'Lưu Cập Nhật (CRUD)' : 'Tạo Dịch Vụ (CRUD)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal to Add New User or Staff Account
export const UserModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'staff',
    password: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'staff',
        password: ''
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          maxWidth: '560px',
          background: 'linear-gradient(165deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
          border: '1px solid rgba(236, 72, 153, 0.35)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(236, 72, 153, 0.15)',
          borderRadius: '24px',
          padding: '30px'
        }}
      >
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              color: '#fff',
              boxShadow: '0 4px 14px rgba(236, 72, 153, 0.4)'
            }}>
              👥
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                ➕ Khởi Tạo Tài Khoản / Nhân Viên Mới
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Phân quyền truy cập hệ thống BossHouse Enterprise</span>
            </div>
          </div>
          <button onClick={onClose} className="close-btn" style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '50%', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>HỌ VÀ TÊN THÀNH VIÊN *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="VD: Trần Minh Đức (KTV Spa)..." 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required 
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>EMAIL ĐĂNG NHẬP *</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="duc.tran@bosshouse.com" 
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>SỐ ĐIỆN THOẠI</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="0987111222" 
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>PHÂN CẤP / VAI TRÒ *</label>
              <select 
                className="form-select"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="staff">👔 Nhân Viên (Staff)</option>
                <option value="admin">👑 Quản Trị Viên (Admin)</option>
                <option value="customer">⭐️ Khách Hàng Thân Thiết</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>MẬT KHẨU KHỞI TẠO *</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="Mật khẩu ban đầu" 
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy Bỏ</button>
            <button type="submit" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff', fontWeight: 700 }}>
              Tạo Tài Khoản Mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
