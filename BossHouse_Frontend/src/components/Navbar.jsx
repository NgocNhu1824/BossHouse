import React from 'react';
import { Home, Hotel, Scissors, Dog, Calendar, Star, ShieldCheck, LogIn, LogOut, User, PlusCircle } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, user, onOpenAuth, onLogout, onOpenBooking }) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0f172a',
            fontWeight: 'bold',
            fontSize: '1.4rem',
            boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)'
          }}>
            🐾
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              Boss<span className="gradient-text">House</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '-4px' }}>
              Premium Pet Hotel & Spa
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', gap: '6px' }}>
          <button 
            className={`btn ${activeTab === 'home' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)' }}
            onClick={() => setActiveTab('home')}
          >
            <Home size={17} /> Trang Chủ
          </button>

          <button 
            className={`btn ${activeTab === 'rooms' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)' }}
            onClick={() => setActiveTab('rooms')}
          >
            <Hotel size={17} /> Phòng Khách Sạn
          </button>

          <button 
            className={`btn ${activeTab === 'services' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)' }}
            onClick={() => setActiveTab('services')}
          >
            <Scissors size={17} /> Dịch Vụ Spa
          </button>

          <button 
            className={`btn ${activeTab === 'pets' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)' }}
            onClick={() => setActiveTab('pets')}
          >
            <Dog size={17} /> Hồ Sơ Boss
          </button>

          <button 
            className={`btn ${activeTab === 'bookings' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)' }}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={17} /> Đặt Chỗ Của Tôi
          </button>

          <button 
            className={`btn ${activeTab === 'reviews' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)' }}
            onClick={() => setActiveTab('reviews')}
          >
            <Star size={17} /> Đánh Giá
          </button>

          {user && user.role === 'admin' && (
            <button 
              className={`btn ${activeTab === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', borderColor: '#ec4899', color: '#f472b6' }}
              onClick={() => setActiveTab('admin')}
            >
              <ShieldCheck size={17} /> Quản Trị Admin
            </button>
          )}
        </nav>

        {/* User Auth & Quick Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className="btn btn-primary"
            onClick={onOpenBooking}
            style={{ fontSize: '0.9rem', boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)' }}
          >
            <PlusCircle size={18} /> Đặt Phòng Ngay
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: 'rgba(30, 41, 59, 0.8)',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)'
              }}>
                <User size={16} color="var(--color-primary)" />
                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{user.name}</span>
              </div>
              <button 
                onClick={onLogout}
                className="btn btn-secondary btn-sm"
                title="Đăng xuất"
                style={{ padding: '8px' }}
              >
                <LogOut size={16} color="#ef4444" />
              </button>
            </div>
          ) : (
            <button className="btn btn-secondary" onClick={onOpenAuth}>
              <LogIn size={17} /> Đăng Nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
