import React, { useState } from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { Scissors, Sparkles, PlusCircle, ShieldCheck } from '../components/Icons';

export const ServicesPage = ({ services = [], onBookService, user, onEditService, onOpenAddService, onViewDetail }) => {
  const [category, setCategory] = useState('all');

  const filteredServices = category === 'all'
    ? services
    : services.filter(s => s.category === category);

  const isAdmin = user?.role === 'admin';

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container">

        {/* Admin Control Banner on Services Page */}
        {isAdmin && (
          <div className="card-glass" style={{ padding: '16px 20px', marginBottom: '28px', border: '1px solid rgba(236, 72, 153, 0.35)', background: 'rgba(236, 72, 153, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f472b6', flexShrink: 0 }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Chế độ Quản Trị Viên (Admin View Mode)</div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Bạn đang duyệt giao diện Web. Bạn có thể bấm [Sửa Dịch Vụ] trên từng dịch vụ hoặc Thêm Dịch Vụ Mới trực tiếp.</div>
              </div>
            </div>

            {onOpenAddService && (
              <button className="btn btn-primary btn-sm" onClick={onOpenAddService} style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff' }}>
                <PlusCircle size={16} /> Thêm Dịch Vụ Mới (CRUD)
              </button>
            )}
          </div>
        )}

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
            <ServiceCard key={srv.id} service={srv} onBook={onBookService} user={user} onEdit={onEditService} onViewDetail={onViewDetail} />
          ))}
        </div>
      </div>
    </div>
  );
};
