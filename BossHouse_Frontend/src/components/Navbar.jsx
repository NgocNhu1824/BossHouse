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

        <nav className="desktop-nav" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'nowrap' }}>
          <button className={`btn ${activeTab === 'home' ? 'btn-primary' : 'btn-secondary'}`} style={navButtonStyle} onClick={() => handleNavClick('home')}>
            <Home size={17} /> <span>Trang Chủ</span>
          </button>
          <button className={`btn ${activeTab === 'rooms' ? 'btn-primary' : 'btn-secondary'}`} style={navButtonStyle} onClick={() => handleNavClick('rooms')}>
            <Hotel size={17} /> <span>Phòng Khách Sạn</span>
          </button>
          <button className={`btn ${activeTab === 'services' ? 'btn-primary' : 'btn-secondary'}`} style={navButtonStyle} onClick={() => handleNavClick('services')}>
            <Scissors size={17} /> <span>Dịch Vụ Spa</span>
          </button>
          <button className={`btn ${activeTab === 'reviews' ? 'btn-primary' : 'btn-secondary'}`} style={navButtonStyle} onClick={() => handleNavClick('reviews')}>
            <Star size={17} /> <span>Đánh Giá</span>
          </button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {user && user.role === 'admin' ? (
            <button
              className="btn btn-primary desktop-only-btn"
              onClick={() => handleNavClick('admin')}
              style={{ 
                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', 
                color: '#fff', 
                fontSize: '0.88rem', 
                boxShadow: '0 4px 14px rgba(236, 72, 153, 0.4)', 
                whiteSpace: 'nowrap' 
              }}
            >
              <ShieldCheck size={17} /> <span>Quản Trị Admin Portal</span>
            </button>
          ) : (
            <button
              className="btn btn-primary desktop-only-btn"
              onClick={onOpenBooking}
              style={{ fontSize: '0.88rem', boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)', whiteSpace: 'nowrap' }}
            >
              <PlusCircle size={17} /> <span>Đặt Phòng Ngay</span>
            </button>
          )}

          <div ref={userMenuRef} style={{ position: 'relative' }}>
            <button
              className="btn btn-secondary"
              onClick={() => setIsUserMenuOpen(prev => !prev)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                background: user ? (user.role === 'admin' ? 'rgba(236, 72, 153, 0.15)' : 'rgba(30, 41, 59, 0.95)') : 'rgba(59, 130, 246, 0.14)',
                borderColor: user ? (user.role === 'admin' ? 'rgba(236, 72, 153, 0.4)' : 'var(--color-border)') : 'rgba(59, 130, 246, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              <User size={16} color={user ? (user.role === 'admin' ? '#f472b6' : 'var(--color-primary)') : '#60a5fa'} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user ? user.name : 'Guest'}
              </span>
              <span 
                className={`badge ${user ? (user.role === 'admin' ? 'badge-danger' : 'badge-warning') : 'badge-info'}`} 
                style={{ fontSize: '0.68rem', padding: '2px 8px', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                {user ? (user.role === 'admin' ? 'Admin' : 'Customer') : 'Đăng nhập'}
              </span>
            </button>

            {isUserMenuOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 10px)',
                minWidth: '290px',
                width: 'max-content',
                maxWidth: '340px',
                padding: '12px',
                borderRadius: '20px',
                background: 'linear-gradient(180deg, rgba(15,23,42,0.98), rgba(30,41,59,0.98))',
                border: '1px solid var(--color-border)',
                boxShadow: '0 24px 50px rgba(0,0,0,0.38)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                zIndex: 1050
              }}>
                {user ? (
                  <>
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: '16px',
                      background: user.role === 'admin' ? 'rgba(236, 72, 153, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                      border: user.role === 'admin' ? '1px solid rgba(236, 72, 153, 0.2)' : '1px solid rgba(245, 158, 11, 0.18)'
                    }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Đang đăng nhập</div>
                      <div style={{ fontSize: '0.98rem', fontWeight: 800, marginTop: '2px', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
                    </div>

                    {user.role === 'admin' ? (
                      <>
                        <button 
                          className="btn btn-secondary" 
                          style={{ 
                            justifyContent: 'flex-start', 
                            padding: '10px 14px', 
                            width: '100%', 
                            whiteSpace: 'nowrap', 
                            gap: '10px', 
                            fontSize: '0.88rem', 
                            color: '#f472b6', 
                            borderColor: 'rgba(244,114,182,0.35)',
                            background: 'rgba(244,114,182,0.08)'
                          }} 
                          onClick={() => handleNavClick('admin')}
                        >
                          <ShieldCheck size={16} style={{ flexShrink: 0 }} /> <span>Quản trị Admin Portal</span>
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          style={{ justifyContent: 'flex-start', padding: '10px 14px', width: '100%', whiteSpace: 'nowrap', gap: '10px', fontSize: '0.88rem' }} 
                          onClick={() => { onOpenProfile(); setIsUserMenuOpen(false); }}
                        >
                          <User size={16} style={{ flexShrink: 0 }} /> <span>Hồ sơ Quản Trị Viên</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className="btn btn-secondary" 
                          style={{ justifyContent: 'flex-start', padding: '10px 14px', width: '100%', whiteSpace: 'nowrap', gap: '10px', fontSize: '0.88rem' }} 
                          onClick={() => { onOpenProfile(); setIsUserMenuOpen(false); }}
                        >
                          <User size={16} style={{ flexShrink: 0 }} /> <span>Xem / sửa hồ sơ cá nhân</span>
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          style={{ justifyContent: 'flex-start', padding: '10px 14px', width: '100%', whiteSpace: 'nowrap', gap: '10px', fontSize: '0.88rem' }} 
                          onClick={() => handleNavClick('pets')}
                        >
                          <Dog size={16} style={{ flexShrink: 0 }} /> <span>Hồ sơ Boss của tôi</span>
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          style={{ justifyContent: 'flex-start', padding: '10px 14px', width: '100%', whiteSpace: 'nowrap', gap: '10px', fontSize: '0.88rem' }} 
                          onClick={() => handleNavClick('bookings')}
                        >
                          <Calendar size={16} style={{ flexShrink: 0 }} /> <span>Lịch sử đặt phòng & dịch vụ</span>
                        </button>
                      </>
                    )}

                    <button 
                      className="btn btn-secondary" 
                      style={{ 
                        justifyContent: 'flex-start', 
                        padding: '10px 14px', 
                        width: '100%', 
                        whiteSpace: 'nowrap', 
                        gap: '10px', 
                        fontSize: '0.88rem', 
                        color: '#f87171', 
                        borderColor: 'rgba(248,113,113,0.3)',
                        background: 'rgba(248,113,113,0.08)'
                      }} 
                      onClick={() => { onLogout(); setIsUserMenuOpen(false); }}
                    >
                      <LogOut size={16} color="#f87171" style={{ flexShrink: 0 }} /> <span>Đăng xuất</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: '16px',
                      background: 'rgba(59, 130, 246, 0.08)',
                      border: '1px solid rgba(59, 130, 246, 0.18)'
                    }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Tài khoản khách</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, marginTop: '2px', color: '#fff' }}>Vui lòng đăng nhập để sử dụng</div>
                    </div>

                    <button className="btn btn-primary" style={{ justifyContent: 'flex-start', padding: '10px 14px', width: '100%', whiteSpace: 'nowrap', gap: '10px' }} onClick={openAuthAndCloseMenus}>
                      <LogIn size={16} style={{ flexShrink: 0 }} /> <span>Đăng nhập / Đăng ký</span>
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