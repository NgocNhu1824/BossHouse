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
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              🐾
            </div>
            <h2 style={{ fontSize: '1.25rem' }}>Thêm Hồ Sơ Boss Mới</h2>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Tên Boss *</label>
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
              <label className="form-label">Loại thú cưng *</label>
              <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
                <option value="cat">Mèo cưng 🐱</option>
                <option value="dog">Chó cưng 🐶</option>
                <option value="other">Thỏ / Chuột Hamster / Khác 🐰</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Giống loài (Breed)</label>
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
              <label className="form-label">Tuổi (Năm)</label>
              <input 
                type="number" 
                step="0.5" 
                className="form-input" 
                value={age} 
                onChange={e => setAge(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cân nặng (kg)</label>
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
            <label className="form-label">Ghi chú sức khỏe & sở thích</label>
            <textarea 
              className="form-textarea" 
              placeholder="Sở thích ăn uống, thói quen đi vệ sinh, tiền sử dị ứng..." 
              value={notes} 
              onChange={e => setNotes(e.target.value)} 
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy Bỏ</button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Đang Lưu...' : 'Lưu Hồ Sơ Boss'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
