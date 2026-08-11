import React from 'react';
import { Dog, PlusCircle, Trash2, Heart, Scale, Calendar, AlertCircle } from '../components/Icons';

export const MyPetsPage = ({ pets = [], onOpenAddPet, onDeletePet, user, onGoToAdmin }) => {
  const isAdmin = user?.role === 'admin';

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {isAdmin && (
          <div className="card-glass" style={{ padding: '20px', marginBottom: '32px', border: '1px solid rgba(236, 72, 153, 0.35)', background: 'rgba(236, 72, 153, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f472b6', flexShrink: 0 }}>
                👑
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Chế độ Quản Trị Viên (Admin)</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Danh sách hồ sơ thú cưng của tất cả khách hàng được theo dõi và quản lý trong Cổng Quản Trị Admin.</div>
              </div>
            </div>

            {onGoToAdmin && (
              <button className="btn btn-primary btn-sm" onClick={onGoToAdmin} style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff' }}>
                Quản Trị Boss Thú Cưng (Admin)
              </button>
            )}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '6px' }}>Hồ Sơ Boss Yêu Của Tôi 🐾</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Danh sách các Boss đã đăng ký thông tin chăm sóc tại BossHouse
            </p>
          </div>

          {!isAdmin && (
            <button className="btn btn-primary btn-lg" onClick={onOpenAddPet}>
              <PlusCircle size={20} /> Thêm Boss Mới
            </button>
          )}
        </div>

        {pets.length === 0 ? (
          <div className="card-glass" style={{ padding: '60px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🐱🐶</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Chưa có hồ sơ Boss nào!</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
              Hãy đăng ký thông tin cho Boss cưng của bạn để nhận phòng và đặt lịch Spa nhanh chóng.
            </p>
            <button className="btn btn-primary" onClick={onOpenAddPet}>
              + Thêm Boss Đầu Tiên Ngay
            </button>
          </div>
        ) : (
          <div className="grid-3">
            {pets.map(pet => (
              <div key={pet.id} className="card-glass" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                  <img 
                    src={pet.avatar} 
                    alt={pet.name} 
                    style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} 
                  />
                  <div>
                    <span className="badge badge-warning" style={{ marginBottom: '4px' }}>
                      {pet.type === 'cat' ? 'Mèo cưng 🐱' : 'Chó cưng 🐶'}
                    </span>
                    <h3 style={{ fontSize: '1.3rem' }}>{pet.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{pet.breed}</p>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  background: 'rgba(15,23,42,0.6)',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '16px',
                  fontSize: '0.86rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)' }}>
                    <Calendar size={16} color="var(--color-primary)" /> {pet.age} tuổi
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)' }}>
                    <Scale size={16} color="var(--color-primary)" /> {pet.weight} kg
                  </div>
                </div>

                {pet.notes && (
                  <div style={{
                    fontSize: '0.84rem',
                    color: 'var(--color-text-muted)',
                    background: 'rgba(236,72,153,0.1)',
                    border: '1px solid rgba(236,72,153,0.2)',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '20px',
                    flex: 1
                  }}>
                    <strong style={{ color: '#f472b6' }}>Ghi chú:</strong> {pet.notes}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    style={{ color: '#ef4444' }}
                    onClick={() => onDeletePet(pet.id)}
                  >
                    <Trash2 size={15} /> Xóa Hồ Sơ
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
