import React from 'react';
import { Hero } from '../components/Hero';
import { RoomCard } from '../components/RoomCard';
import { ServiceCard } from '../components/ServiceCard';
import { ShieldCheck, Video, Heart, Clock, Award, Star, ArrowRight } from '../components/Icons';

export const HomePage = ({ rooms = [], services = [], reviews = [], onBookRoom, onSelectTab, user, onEditRoom, onEditService, onViewDetail }) => {
  return (
    <div>
      {/* Hero Section */}
      <Hero 
        onOpenBooking={() => onBookRoom(rooms[0])} 
        onExploreRooms={() => onSelectTab('rooms')} 
        user={user}
      />

      {/* Why Choose BossHouse Section */}
      <section style={{ padding: '60px 0', background: 'rgba(15, 23, 42, 0.4)' }}>
        <div className="container">
          <h2 className="section-title">Tại Sao Nên Chọn <span className="gradient-text">BossHouse</span>?</h2>
          <p className="section-subtitle">
            Hệ thống dịch vụ đạt chuẩn 5-sao hàng đầu, nơi các Boss được yêu thương và chăm sóc tỉ mỉ như thành viên trong gia đình.
          </p>

          <div className="grid-3">
            <div className="card-glass" style={{ padding: '28px', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(236, 72, 153, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: 'var(--color-primary)'
              }}>
                <Video size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Camera Live HD 24/7</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Theo dõi trực tiếp mọi khoảnh khắc hoạt động và giấc ngủ của Boss qua App di động bất cứ lúc nào.
              </p>
            </div>

            <div className="card-glass" style={{ padding: '28px', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: '#f59e0b'
              }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Điều Hòa & Khử Khuẩn HEPA</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Nhiệt độ phòng luôn giữ ở 24-26°C. Lọc không khí công nghệ Nano Bạc khử mùi 99.9% vi khuẩn.
              </p>
            </div>

            <div className="card-glass" style={{ padding: '28px', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: '#10b981'
              }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Bác Sĩ Thú Y Túc Trực</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Đội ngũ kỹ thuật viên và bác sĩ thú y giàu kinh nghiệm kiểm tra sức khỏe và chế độ dinh dưỡng hàng ngày.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Showcase */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '4px' }}>Hạng Phòng Khách Sạn Nổi Bật</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Đa dạng không gian từ tiêu chuẩn đến biệt thự VIP cho Mèo & Cún</p>
            </div>
            <button className="btn btn-secondary" onClick={() => onSelectTab('rooms')}>
              Xem Tất Cả Phòng <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid-3">
            {rooms.slice(0, 3).map(room => (
              <RoomCard key={room.id} room={room} onBook={onBookRoom} user={user} onEdit={onEditRoom} onViewDetail={(rm) => onViewDetail && onViewDetail(rm, 'room')} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Showcase */}
      <section style={{ padding: '70px 0', background: 'rgba(15, 23, 42, 0.5)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '4px' }}>Dịch Vụ Spa & Chăm Sóc Đẳng Cấp</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Tắm dưỡng thảo mộc, cắt tỉa lông thời trang và thực đơn Gourmet</p>
            </div>
            <button className="btn btn-secondary" onClick={() => onSelectTab('services')}>
              Xem Tất Cả Dịch Vụ <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid-3">
            {services.slice(0, 3).map(srv => (
              <ServiceCard key={srv.id} service={srv} onBook={() => onBookRoom(rooms[0])} user={user} onEdit={onEditService} onViewDetail={(sv) => onViewDetail && onViewDetail(sv, 'service')} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Highlights */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 className="section-title">Khách Hàng Nói Gì Về <span className="gradient-text">BossHouse</span>?</h2>
          <p className="section-subtitle">Hàng ngàn phản hồi 5-sao từ khách hàng yêu quý</p>

          <div className="grid-3">
            {reviews.slice(0, 3).map(rev => (
              <div key={rev.id} className="card-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '20px', flex: 1, fontStyle: 'italic' }}>
                  "{rev.comment}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={rev.avatar} alt={rev.userName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>{rev.userName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)' }}>Khách hàng (Chủ bé {rev.petName})</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
