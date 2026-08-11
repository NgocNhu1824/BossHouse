import React, { useState } from 'react';
import { X, Dog, Cat, Sparkles } from './Icons';

export const PetModal = ({ isOpen, onClose, onAddPet, userId }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('dog');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('1');
  const [weight, setWeight] = useState('3.5');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await onAddPet({
      userId: userId || 'u-customer1',
      name,
      type,
      breed: breed || (type === 'cat' ? 'Mèo ta' : 'Cún cưng'),
      age: Number(age),
      weight: Number(weight),
      notes
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-container" 
        onClick={e => e.stopPropagation()}
        style={{ 
          maxWidth: '560px',
          background: 'linear-gradient(165deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(245, 158, 11, 0.15)',
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
              color: 'white',
              boxShadow: '0 4px 14px rgba(236, 72, 153, 0.35)'
            }}>
              🐾
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#fff' }}>Khởi Tạo Hồ Sơ Boss Mới</h2>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Đăng ký thông tin thú cưng để phục vụ lưu trú và spa tốt nhất</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '50%', padding: '6px' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>TÊN BOSS *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="VD: Miu Miu, LuLu, Bơ..." 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>LOẠI THÚ CƯNG *</label>
              <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
                <option value="cat">Mèo cưng 🐱</option>
                <option value="dog">Chó cưng 🐶</option>
                <option value="other">Thỏ / Chuột Hamster / Khác 🐰</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>GIỐNG LOÀI (BREED)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="VD: Mèo Anh Lông Ngắn, Poodle, Corgi..." 
              value={breed} 
              onChange={e => setBreed(e.target.value)} 
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>TUỔI (NĂM)</label>
              <input 
                type="number" 
                step="0.5" 
                className="form-input" 
                value={age} 
                onChange={e => setAge(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>CÂN NẶNG (KG)</label>
              <input 
                type="number" 
                step="0.1" 
                className="form-input" 
                value={weight} 
                onChange={e => setWeight(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>GHI CHÚ SỨC KHỎE & SỞ THÍCH</label>
            <textarea 
              className="form-textarea" 
              placeholder="Sở thích ăn uống, thói quen đi vệ sinh, tiền sử dị ứng..." 
              value={notes} 
              onChange={e => setNotes(e.target.value)} 
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy Bỏ</button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff', fontWeight: 700 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang Lưu...' : 'Lưu Hồ Sơ Boss 🐾'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
