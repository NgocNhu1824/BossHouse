import React, { useState } from 'react';
import { RoomCard } from '../components/RoomCard';
import { Hotel, Filter, PlusCircle, ShieldCheck } from '../components/Icons';

export const RoomsPage = ({ rooms = [], onBookRoom, user, onEditRoom, onOpenAddRoom, onViewDetail }) => {
  const [filter, setFilter] = useState('all');

  const filteredRooms = filter === 'all' 
    ? rooms 
    : rooms.filter(r => r.category === filter);

  const isAdmin = user?.role === 'admin';

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container">

        {/* Admin Control Banner on Rooms Page */}
        {isAdmin && (
          <div className="card-glass" style={{ padding: '16px 20px', marginBottom: '28px', border: '1px solid rgba(236, 72, 153, 0.35)', background: 'rgba(236, 72, 153, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f472b6', flexShrink: 0 }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Chế độ Quản Trị Viên (Admin View Mode)</div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Bạn đang duyệt giao diện Web. Bạn có thể bấm [Sửa Phòng] trên từng phòng hoặc Thêm Phòng Mới trực tiếp.</div>
              </div>
            </div>

            {onOpenAddRoom && (
              <button className="btn btn-primary btn-sm" onClick={onOpenAddRoom} style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff' }}>
                <PlusCircle size={16} /> Thêm Phòng Mới (CRUD)
              </button>
            )}
          </div>
        )}

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="section-title">Danh Sách Phòng Khách Sạn BossHouse</h1>
          <p className="section-subtitle">
            Hệ thống không gian nghỉ dưỡng cao cấp thiết kế riêng cho Mèo & Cún cưng
          </p>

          {/* Filter Bar */}
          <div style={{ display: 'inline-flex', gap: '8px', background: '#1e293b', padding: '6px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
            <button 
              className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ borderRadius: 'var(--radius-full)' }}
              onClick={() => setFilter('all')}
            >
              Tất Cả Hạng Phòng ({rooms.length})
            </button>
            <button 
              className={`btn btn-sm ${filter === 'cat' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ borderRadius: 'var(--radius-full)' }}
              onClick={() => setFilter('cat')}
            >
              Phòng Mèo Cưng 🐱
            </button>
            <button 
              className={`btn btn-sm ${filter === 'dog' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ borderRadius: 'var(--radius-full)' }}
              onClick={() => setFilter('dog')}
            >
              Biệt Thự Cún 🐶
            </button>
            <button 
              className={`btn btn-sm ${filter === 'vip' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ borderRadius: 'var(--radius-full)' }}
              onClick={() => setFilter('vip')}
            >
              Căn Hộ Super VIP 👑
            </button>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid-3">
          {filteredRooms.map(room => (
            <RoomCard key={room.id} room={room} onBook={onBookRoom} user={user} onEdit={onEditRoom} onViewDetail={onViewDetail} />
          ))}
        </div>
      </div>
    </div>
  );
};
