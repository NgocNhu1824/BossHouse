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
    <div className="modal-overlay">
      <div className="modal-container" style={{ maxWidth: '560px' }}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
            {room ? '✏️ Cập Nhật Thông Tin Phòng' : '➕ Thêm Phòng Khách Sạn Mới'}
          </h3>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Tên Phòng Khách Sạn *</label>
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
              <label className="form-label">Hạng Phòng</label>
              <select 
                className="form-select"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="standard">Standard (Tiêu chuẩn)</option>
                <option value="deluxe">Deluxe (Cao cấp VIP)</option>
                <option value="cat">Cat Villa (Dành riêng cho Mèo)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Đơn Giá / Đêm (VNĐ) *</label>
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
            <label className="form-label">Sức Chứa Thú Cưng</label>
            <input 
              type="text"
              className="form-input"
              placeholder="VD: 1-2 Boss cưng (<15kg)"
              value={formData.capacity}
              onChange={e => setFormData({ ...formData, capacity: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Link Hình Ảnh (URL)</label>
            <input 
              type="text"
              className="form-input"
              placeholder="https://..."
              value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mô Tả Chi Tiết Phòng</label>
            <textarea 
              className="form-textarea"
              placeholder="Nhập tiện ích phòng (Điều hòa 24/7, Camera HD, Đệm êm...)"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy Bỏ</button>
            <button type="submit" className="btn btn-primary">
              {room ? 'Lưu Cập Nhật' : 'Tạo Phòng Mới'}
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
    description: ''
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || '',
        category: service.category || 'grooming',
        price: service.price || 150000,
        duration: service.duration || '60 phút',
        description: service.description || ''
      });
    } else {
      setFormData({
        name: '',
        category: 'grooming',
        price: 150000,
        duration: '60 phút',
        description: ''
      });
    }
  }, [service, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ maxWidth: '560px' }}>
        <div className="modal-header">
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
            {service ? '✏️ Cập Nhật Dịch Vụ Spa' : '✂️ Thêm Dịch Vụ Spa Mới'}
          </h3>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Tên Dịch Vụ Spa *</label>
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
              <label className="form-label">Phân Loại Dịch Vụ</label>
              <select 
                className="form-select"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="grooming">Cắt tỉa & Tạo kiểu</option>
                <option value="bathing">Tắm & Vệ sinh tai móng</option>
                <option value="spa">Spa Thảo Dược & Massage</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Đơn Giá Dịch Vụ (VNĐ) *</label>
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
            <label className="form-label">Thời Gian Thực Hiện</label>
            <input 
              type="text"
              className="form-input"
              placeholder="VD: 45 - 60 phút"
              value={formData.duration}
              onChange={e => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mô Tả Dịch Vụ</label>
            <textarea 
              className="form-textarea"
              placeholder="Mô tả quy trình thực hiện dịch vụ..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy Bỏ</button>
            <button type="submit" className="btn btn-primary">
              {service ? 'Lưu Cập Nhật' : 'Tạo Dịch Vụ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
