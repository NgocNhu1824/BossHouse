import React, { useState } from 'react';
import { Home, Hotel, Scissors, Dog, Calendar, Star, ShieldCheck, LogIn, LogOut, User, PlusCircle, Menu, X } from './Icons';

export const Navbar = ({ activeTab, setActiveTab, user, onOpenAuth, onLogout, onOpenBooking, onOpenProfile }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  const isAdminView = activeTab === 'admin';
  const isGuest = !user;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: isAdminView 
        ? 'linear-gradient(90deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)' 
        : 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: isAdminView ? '2px solid #ec4899' : '1px solid var(--color-border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: isAdminView 
              ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' 
              : 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                Boss<span className="gradient-text">House</span>
              </span>
              {isAdminView && (
                <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>
                  ADMIN PORTAL
                </span>
              )}
            </div>
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '-4px' }}>
              {isAdminView ? 'Hệ Thống Quản Trị & Vận Hành' : 'Premium Pet Hotel & Spa'}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '6px' }}>
          <button 
            className={`btn ${activeTab === 'home' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)' }}
            onClick={() => handleNavClick('home')}
          >
            <Home size={17} /> Trang Chủ
          </button>

          <button 
            className={`btn ${activeTab === 'rooms' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)' }}
            onClick={() => handleNavClick('rooms')}
          >
            <Hotel size={17} /> Phòng Khách Sạn
          </button>

          <button 
            className={`btn ${activeTab === 'services' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)' }}
            onClick={() => handleNavClick('services')}
          >
            <Scissors size={17} /> Dịch Vụ Spa
          </button>

          <button 
            className={`btn ${activeTab === 'pets' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', opacity: isGuest ? 0.8 : 1 }}
            onClick={() => handleNavClick('pets')}
          >
            <Dog size={17} /> {isGuest ? '🔒 Boss Cưng' : 'Hồ Sơ Boss'}
          </button>

          <button 
            className={`btn ${activeTab === 'bookings' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', opacity: isGuest ? 0.8 : 1 }}
            onClick={() => handleNavClick('bookings')}
          >
            <Calendar size={17} /> {isGuest ? '🔒 Đặt Chỗ' : 'Đặt Chỗ Của Tôi'}
          </button>

          <button 
            className={`btn ${activeTab === 'reviews' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)' }}
            onClick={() => handleNavClick('reviews')}
          >
            <Star size={17} /> Đánh Giá
          </button>

          {user && user.role === 'admin' && (
            <button 
              className={`btn ${activeTab === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', borderColor: '#ec4899', color: activeTab === 'admin' ? '#0f172a' : '#f472b6' }}
              onClick={() => handleNavClick('admin')}
            >
              <ShieldCheck size={17} /> Quản Trị Admin
            </button>
          )}
        </nav>

        {/* User Auth & Quick Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="btn btn-primary desktop-only-btn"
            onClick={onOpenBooking}
            style={{ fontSize: '0.88rem', boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)' }}
          >
            <PlusCircle size={17} /> Đặt Phòng Ngay
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div 
                onClick={onOpenProfile}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  background: 'rgba(30, 41, 59, 0.8)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                title="Xem & Cập nhật Hồ sơ cá nhân"
              >
                <User size={15} color="var(--color-primary)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name}</span>
                <span className="badge badge-warning" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>
                  {user.role === 'admin' ? '👑 Admin' : '⭐️ Customer'}
                </span>
              </div>
              <button 
                onClick={onLogout}
                className="btn btn-secondary btn-sm"
                title="Đăng xuất khỏi hệ thống"
                style={{ padding: '8px' }}
              >
                <LogOut size={16} color="#ef4444" />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge badge-info" style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                👤 Guest
              </span>
              <button className="btn btn-secondary btn-sm" onClick={onOpenAuth}>
                <LogIn size={16} /> Đăng Nhập / Đăng Ký
              </button>
            </div>
          )}

          {/* Mobile Hamburger Menu Button */}
          <button 
            className="mobile-menu-trigger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-main)'
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer" style={{
          position: 'absolute',
          top: '76px',
          left: 0,
          right: 0,
          background: '#0f172a',
          borderBottom: '2px solid var(--color-primary)',
          padding: '20px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 99
        }}>
          <button 
            className={`btn ${activeTab === 'home' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start', padding: '12px 16px' }}
            onClick={() => handleNavClick('home')}
          >
            <Home size={18} /> Trang Chủ
          </button>
          
          <button 
            className={`btn ${activeTab === 'rooms' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start', padding: '12px 16px' }}
            onClick={() => handleNavClick('rooms')}
          >
            <Hotel size={18} /> Phòng Khách Sạn
          </button>

          <button 
            className={`btn ${activeTab === 'services' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start', padding: '12px 16px' }}
            onClick={() => handleNavClick('services')}
          >
            <Scissors size={18} /> Dịch Vụ Spa
          </button>

          <button 
            className={`btn ${activeTab === 'pets' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start', padding: '12px 16px' }}
            onClick={() => handleNavClick('pets')}
          >
            <Dog size={18} /> {isGuest ? '🔒 Hồ Sơ Boss (Cần đăng nhập)' : 'Hồ Sơ Boss'}
          </button>

          <button 
            className={`btn ${activeTab === 'bookings' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start', padding: '12px 16px' }}
            onClick={() => handleNavClick('bookings')}
          >
            <Calendar size={18} /> {isGuest ? '🔒 Đặt Chỗ Của Tôi (Cần đăng nhập)' : 'Đặt Chỗ Của Tôi'}
          </button>

          <button 
            className={`btn ${activeTab === 'reviews' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ justifyContent: 'flex-start', padding: '12px 16px' }}
            onClick={() => handleNavClick('reviews')}
          >
            <Star size={18} /> Đánh Giá
          </button>

          {user && (
            <button 
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', padding: '12px 16px', color: 'var(--color-primary)' }}
              onClick={() => { onOpenProfile(); setIsMobileMenuOpen(false); }}
            >
              <User size={18} /> Xem & Edit Profile Cá Nhân
            </button>
          )}

          {user && user.role === 'admin' && (
            <button 
              className={`btn ${activeTab === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ justifyContent: 'flex-start', padding: '12px 16px', color: '#f472b6', borderColor: '#ec4899' }}
              onClick={() => handleNavClick('admin')}
            >
              <ShieldCheck size={18} /> Quản Trị Admin Portal
            </button>
          )}

          <button 
            className="btn btn-primary"
            onClick={() => { onOpenBooking(); setIsMobileMenuOpen(false); }}
            style={{ marginTop: '10px', padding: '12px 16px' }}
          >
            <PlusCircle size={18} /> Đặt Phòng Ngay
          </button>
        </div>
      )}
    </header>
  );
};
