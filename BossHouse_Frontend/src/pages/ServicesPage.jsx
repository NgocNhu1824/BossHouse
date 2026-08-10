import React, { useState } from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { Scissors, Sparkles } from 'lucide-react';

export const ServicesPage = ({ services = [], onBookService }) => {
  const [category, setCategory] = useState('all');

  const filteredServices = category === 'all'
    ? services
    : services.filter(s => s.category === category);

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="section-title">Dịch Vụ Spa & Chăm Sóc Sức Khỏe</h1>
          <p className="section-subtitle">
            Cắt tỉa lông nghệ thuật, tắm dưỡng thảo mộc, dạo chơi công viên & dinh dưỡng tươi nấu trong ngày
          </p>

          <div style={{ display: 'inline-flex', gap: '8px', background: '#1e293b', padding: '6px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', flexWrap: 'wrap' }}>
            <button 
              className={`btn btn-sm ${category === 'all' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ borderRadius: 'var(--radius-full)' }}
              onClick={() => setCategory('all')}
            >
              Tất Cả ({services.length})
            </button>
            <button 
              className={`btn btn-sm ${category === 'spa' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ borderRadius: 'var(--radius-full)' }}
              onClick={() => setCategory('spa')}
            >
              ✂️ Spa & Grooming
            </button>
            <button 
              className={`btn btn-sm ${category === 'care' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ borderRadius: 'var(--radius-full)' }}
              onClick={() => setCategory('care')}
            >
              🐕 Vận Động Đi Dạo
            </button>
            <button 
              className={`btn btn-sm ${category === 'health' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ borderRadius: 'var(--radius-full)' }}
              onClick={() => setCategory('health')}
            >
              🩺 Thú Y & Tiêm Phòng
            </button>
            <button 
              className={`btn btn-sm ${category === 'nutrition' ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ borderRadius: 'var(--radius-full)' }}
              onClick={() => setCategory('nutrition')}
            >
              🥩 Thực Đơn Gourmet
            </button>
          </div>
        </div>

        <div className="grid-3">
          {filteredServices.map(srv => (
            <ServiceCard key={srv.id} service={srv} onBook={onBookService} />
          ))}
        </div>
      </div>
    </div>
  );
};
