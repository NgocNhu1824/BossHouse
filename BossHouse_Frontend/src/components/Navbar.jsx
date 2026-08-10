import React, { useEffect, useRef, useState } from 'react';
import { Home, Hotel, Scissors, Star, ShieldCheck, LogIn, LogOut, User, PlusCircle, Menu, X, Dog, Calendar } from './Icons';

export const Navbar = ({ activeTab, setActiveTab, user, onOpenAuth, onLogout, onOpenBooking, onOpenProfile }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const openAuthAndCloseMenus = () => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    onOpenAuth();
  };

  const isAdminView = activeTab === 'admin';

  const navButtonStyle = {
    padding: '8px 14px',
    borderRadius: 'var(--radius-full)'
  };

  const drawerButtonStyle = {
    justifyContent: 'flex-start',
    padding: '12px 16px'
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: isAdminView
        ? 'linear-gradient(90deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)'
        : 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: isAdminView ? '2px solid #ec4899' : '1px solid var(--color-border)',
      boxShadow: '0 10px 30px rgba(2, 6, 23, 0.18)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
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
              {isAdminView && <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>ADMIN PORTAL</span>}
            </div>
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '-4px' }}>
              {isAdminView ? 'Hệ Thống Quản Trị & Vận Hành' : 'Premium Pet Hotel & Spa'}
            </span>
          </div>
        </div>

        <nav className="desktop-nav" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className={`btn ${activeTab === 'home' ? 'btn-primary' : 'btn-secondary'}`} style={navButtonStyle} onClick={() => handleNavClick('home')}>
            <Home size={17} /> Trang Chủ
          </button>
          <button className={`btn ${activeTab === 'rooms' ? 'btn-primary' : 'btn-secondary'}`} style={navButtonStyle} onClick={() => handleNavClick('rooms')}>
            <Hotel size={17} /> Phòng Khách Sạn
          </button>
          <button className={`btn ${activeTab === 'services' ? 'btn-primary' : 'btn-secondary'}`} style={navButtonStyle} onClick={() => handleNavClick('services')}>
            <Scissors size={17} /> Dịch Vụ Spa
          </button>
          <button className={`btn ${activeTab === 'reviews' ? 'btn-primary' : 'btn-secondary'}`} style={navButtonStyle} onClick={() => handleNavClick('reviews')}>
            <Star size={17} /> Đánh Giá
          </button>
          {user && user.role === 'admin' && (
            <button
              className={`btn ${activeTab === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ ...navButtonStyle, borderColor: '#ec4899', color: activeTab === 'admin' ? '#0f172a' : '#f472b6' }}
              onClick={() => handleNavClick('admin')}
            >
              <ShieldCheck size={17} /> Quản Trị Admin
            </button>
          )}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="btn btn-primary desktop-only-btn"
            onClick={onOpenBooking}
            style={{ fontSize: '0.88rem', boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)' }}
          >
            <PlusCircle size={17} /> Đặt Phòng Ngay
          </button>

          <div ref={userMenuRef} style={{ position: 'relative' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setIsUserMenuOpen(prev => !prev)}
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-full)',
                background: user ? 'rgba(30, 41, 59, 0.95)' : 'rgba(59, 130, 246, 0.14)',
                borderColor: user ? 'var(--color-border)' : 'rgba(59, 130, 246, 0.35)'
              }}
            >
              <User size={16} color={user ? 'var(--color-primary)' : '#60a5fa'} />
              <span style={{ fontSize: '0.86rem', fontWeight: 700 }}>{user ? user.name : 'Guest'}</span>
              <span className={`badge ${user ? 'badge-warning' : 'badge-info'}`} style={{ fontSize: '0.68rem', padding: '1px 5px' }}>
                {user ? (user.role === 'admin' ? 'Admin' : 'Customer') : 'Đăng nhập'}
              </span>
            </button>

            {isUserMenuOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 10px)',
                width: '260px',
                padding: '12px',
                borderRadius: '20px',
                background: 'linear-gradient(180deg, rgba(15,23,42,0.98), rgba(30,41,59,0.98))',
                border: '1px solid var(--color-border)',
                boxShadow: '0 24px 50px rgba(0,0,0,0.38)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {user ? (
                  <>
                    <div style={{
                      padding: '10px 12px',
                      borderRadius: '16px',
                      background: 'rgba(245, 158, 11, 0.08)',
                      border: '1px solid rgba(245, 158, 11, 0.18)'
                    }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Đang đăng nhập</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>{user.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)', marginTop: '2px' }}>{user.email}</div>
                    </div>

                    <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '10px 12px' }} onClick={() => { onOpenProfile(); setIsUserMenuOpen(false); }}>
                      <User size={16} /> Xem / sửa hồ sơ cá nhân
                    </button>
                    <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '10px 12px' }} onClick={() => handleNavClick('pets')}>
                      <Dog size={16} /> Hồ sơ Boss của tôi
                    </button>
                    <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '10px 12px' }} onClick={() => handleNavClick('bookings')}>
                      <Calendar size={16} /> Lịch sử đặt phòng & dịch vụ
                    </button>
                    {user.role === 'admin' && (
                      <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '10px 12px', color: '#f472b6', borderColor: 'rgba(244,114,182,0.35)' }} onClick={() => handleNavClick('admin')}>
                        <ShieldCheck size={16} /> Quản trị hệ thống
                      </button>
                    )}
                    <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', padding: '10px 12px', color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' }} onClick={() => { onLogout(); setIsUserMenuOpen(false); }}>
                      <LogOut size={16} color="#f87171" /> Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <div style={{
                      padding: '10px 12px',
                      borderRadius: '16px',
                      background: 'rgba(59, 130, 246, 0.08)',
                      border: '1px solid rgba(59, 130, 246, 0.18)'
                    }}>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Tài khoản khách</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>Đăng nhập để dùng đầy đủ tính năng</div>
                    </div>

                    <button className="btn btn-primary" style={{ justifyContent: 'flex-start', padding: '10px 12px' }} onClick={openAuthAndCloseMenus}>
                      <LogIn size={16} /> Đăng nhập / đăng ký
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            className="mobile-menu-trigger"
            onClick={() => {
              setIsMobileMenuOpen(prev => !prev);
              setIsUserMenuOpen(false);
            }}
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
          <button className={`btn ${activeTab === 'home' ? 'btn-primary' : 'btn-secondary'}`} style={drawerButtonStyle} onClick={() => handleNavClick('home')}>
            <Home size={18} /> Trang Chủ
          </button>
          <button className={`btn ${activeTab === 'rooms' ? 'btn-primary' : 'btn-secondary'}`} style={drawerButtonStyle} onClick={() => handleNavClick('rooms')}>
            <Hotel size={18} /> Phòng Khách Sạn
          </button>
          <button className={`btn ${activeTab === 'services' ? 'btn-primary' : 'btn-secondary'}`} style={drawerButtonStyle} onClick={() => handleNavClick('services')}>
            <Scissors size={18} /> Dịch Vụ Spa
          </button>
          <button className={`btn ${activeTab === 'reviews' ? 'btn-primary' : 'btn-secondary'}`} style={drawerButtonStyle} onClick={() => handleNavClick('reviews')}>
            <Star size={18} /> Đánh Giá
          </button>

          <button className="btn btn-primary" onClick={() => { onOpenBooking(); setIsMobileMenuOpen(false); }} style={{ marginTop: '10px', padding: '12px 16px' }}>
            <PlusCircle size={18} /> Đặt Phòng Ngay
          </button>

          {user ? (
            <>
              <button className="btn btn-secondary" style={{ ...drawerButtonStyle, color: 'var(--color-primary)' }} onClick={() => { onOpenProfile(); setIsMobileMenuOpen(false); }}>
                <User size={18} /> Xem / sửa hồ sơ cá nhân
              </button>
              <button className="btn btn-secondary" style={drawerButtonStyle} onClick={() => handleNavClick('pets')}>
                <Dog size={18} /> Hồ sơ Boss của tôi
              </button>
              <button className="btn btn-secondary" style={drawerButtonStyle} onClick={() => handleNavClick('bookings')}>
                <Calendar size={18} /> Lịch sử đặt phòng & dịch vụ
              </button>
              {user.role === 'admin' && (
                <button className="btn btn-secondary" style={{ ...drawerButtonStyle, color: '#f472b6', borderColor: '#ec4899' }} onClick={() => handleNavClick('admin')}>
                  <ShieldCheck size={18} /> Quản Trị Admin Portal
                </button>
              )}
              <button className="btn btn-secondary" style={{ ...drawerButtonStyle, color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' }} onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}>
                <LogOut size={18} color="#f87171" /> Đăng xuất
              </button>
            </>
          ) : (
            <button className="btn btn-secondary" style={drawerButtonStyle} onClick={openAuthAndCloseMenus}>
              <LogIn size={18} /> Đăng nhập / Đăng ký
            </button>
          )}
        </div>
      )}
    </header>
  );
};