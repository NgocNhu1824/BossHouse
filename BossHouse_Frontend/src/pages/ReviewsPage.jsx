import React, { useState } from 'react';
import { Star, MessageSquarePlus, Heart, LogIn, ShieldCheck } from '../components/Icons';

export const ReviewsPage = ({ reviews = [], onSubmitReview, user, onOpenAuth }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [petName, setPetName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const canWriteReview = Boolean(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canWriteReview) {
      onOpenAuth?.();
      return;
    }

    setIsSubmitting(true);

    await onSubmitReview({
      petName: petName || 'Boss cưng',
      rating,
      comment
    });

    setIsSubmitting(false);
    setComment('');
    setPetName('');
    setShowForm(false);
  };

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '6px' }}>Đánh Giá Từ Phụ Huynh 🌟</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Cảm nhận chân thực từ các gia đình gửi gắm Boss tại BossHouse
            </p>
          </div>

          {canWriteReview ? (
            <button className="btn btn-primary btn-lg" onClick={() => setShowForm(!showForm)}>
              <MessageSquarePlus size={20} /> {showForm ? 'Ẩn Form' : 'Viết Đánh Giá Mới'}
            </button>
          ) : (
            <button className="btn btn-secondary btn-lg" onClick={() => onOpenAuth?.()}>
              <LogIn size={20} /> Đăng nhập để viết đánh giá
            </button>
          )}
        </div>

        {!canWriteReview && (
          <div className="card-glass" style={{ padding: '20px 22px', marginBottom: '32px', border: '1px solid rgba(59, 130, 246, 0.25)', background: 'rgba(15, 23, 42, 0.65)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', flexShrink: 0 }}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>Đánh giá chỉ dành cho khách đã đăng nhập</div>
                <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                  Điều này giúp BossHouse xác thực phản hồi, gắn với hồ sơ đặt phòng và ngăn đánh giá ẩn danh không đúng nghiệp vụ.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Review Submit Form */}
        {showForm && canWriteReview && (
          <div className="card-glass" style={{ padding: '24px', marginBottom: '40px', border: '1px solid var(--color-primary)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Chia Sẻ Trải Nghiệm Của Bạn Với BossHouse</h3>
            <div style={{ marginBottom: '16px', padding: '12px 14px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.18)', color: 'var(--color-text-muted)' }}>
              Đang viết dưới tài khoản: <strong style={{ color: 'white' }}>{user.name}</strong>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Tên Boss của bạn</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="VD: Bé Miu Miu & LuLu..." 
                    value={petName} 
                    onChange={e => setPetName(e.target.value)} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Đánh giá số sao (1-5)</label>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star} 
                        type="button" 
                        onClick={() => setRating(star)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                      >
                        <Star 
                          size={26} 
                          fill={star <= rating ? "#fbbf24" : "none"} 
                          color={star <= rating ? "#fbbf24" : "#64748b"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nội dung đánh giá & cảm nhận *</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Nhận xét về thái độ chăm sóc viên, cơ sở vật chất phòng ở, dịch vụ cắt tỉa spa..." 
                  value={comment} 
                  onChange={e => setComment(e.target.value)} 
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Đang Gửi...' : 'Gửi Đánh Giá 🐾'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid-3">
          {reviews.map(rev => (
            <div key={rev.id} className="card-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)' }}>{rev.date}</span>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '20px', flex: 1, lineHeight: '1.6' }}>
                "{rev.comment}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                <img src={rev.avatar} alt={rev.userName} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{rev.userName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>Phụ huynh {rev.petName}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
