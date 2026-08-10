import React, { useState } from 'react';
import { RoomCard } from '../components/RoomCard';
import { Hotel, Filter } from '../components/Icons';

export const RoomsPage = ({ rooms = [], onBookRoom }) => {
  const [filter, setFilter] = useState('all');

  const filteredRooms = filter === 'all' 
    ? rooms 
    : rooms.filter(r => r.category === filter);

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="section-title">Danh Sách Phòng Khách Sạn BossHouse</h1>
          <p className="section-subtitle">
            Hệ thống không gian nghỉ dưỡng cao cấp thiết kế riêng cho Mèo & Cún cưng
          </p>

          {/* Filter Bar */}
          <div style={{ display: 'inline-flex', gap: '8px', background: '#1e293b', padding: '6px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)' }}>
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
            <RoomCard key={room.id} room={room} onBook={onBookRoom} />
          ))}
        </div>
      </div>
    </div>
  );
};
