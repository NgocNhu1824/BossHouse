import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { DollarSign, Calendar, Users, Hotel, ShieldCheck, CheckCircle, Clock, Video, XCircle, Search, Filter, Layers, BarChart2, Dog } from '../components/Icons';

export const AdminDashboard = ({ bookings = [], onUpdateStatus, onRefreshData }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminSubTab, setAdminSubTab] = useState('bookings'); // 'bookings' | 'rooms' | 'pets'
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadStats();
  }, [bookings]);

  const loadStats = async () => {
    try {
      const res = await api.getAdminStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await onUpdateStatus(id, newStatus);
    loadStats();
  };

  // Filter bookings based on status and search query
  const filteredBookings = bookings.filter(bk => {
    const matchesStatus = statusFilter === 'all' || bk.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      bk.id.toString().toLowerCase().includes(q) ||
      (bk.userName && bk.userName.toLowerCase().includes(q)) ||
      (bk.userPhone && bk.userPhone.includes(q)) ||
      (bk.petName && bk.petName.toLowerCase().includes(q)) ||
      (bk.roomName && bk.roomName.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  return (
    <div style={{ padding: '30px 0 80px 0' }}>
      <div className="container">
        {/* Header Title Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
          padding: '24px',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid #ec4899'
        }}>
          <div>
            <span className="badge badge-danger" style={{ marginBottom: '8px' }}>
              <ShieldCheck size={14} /> PORTAL QUẢN TRỊ VIÊN CẤP CAO
            </span>
            <h1 style={{ fontSize: '1.8rem', letterSpacing: '-0.5px', margin: 0 }}>
              Hệ Thống Quản Lý Vận Hành BossHouse
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', margin: '4px 0 0 0' }}>
              Báo cáo doanh thu thời gian thực, quản lý tình trạng phòng lưu trú & theo dõi đơn đặt dịch vụ
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={onRefreshData} style={{ fontSize: '0.88rem' }}>
              🔄 Tải Lại Dữ Liệu
            </button>
          </div>
        </div>

        {/* Top Metric Analytical Cards */}
        <div className="grid-4" style={{ marginBottom: '32px' }}>
          <div className="card-glass" style={{ padding: '20px', borderLeft: '4px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TỔNG DOANH THU</span>
              <DollarSign size={22} color="var(--color-primary)" />
            </div>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              {stats ? stats.totalRevenue.toLocaleString('vi-VN') : '0'}đ
            </div>
            <span style={{ fontSize: '0.75rem', color: '#34d399' }}>↑ Cập nhật tự động</span>
          </div>

          <div className="card-glass" style={{ padding: '20px', borderLeft: '4px solid #ec4899' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>BOSS ĐANG LƯU TRÚ</span>
              <Hotel size={22} color="#ec4899" />
            </div>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#ec4899' }}>
              {stats ? stats.activeStays : '0'} <small style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>phòng</small>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Đang hoạt động</span>
          </div>

          <div className="card-glass" style={{ padding: '20px', borderLeft: '4px solid #fbbf24' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>ĐƠN CHỜ XÁC NHẬN</span>
              <Clock size={22} color="#fbbf24" />
            </div>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#fbbf24' }}>
              {stats ? stats.pendingBookings : '0'} <small style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>đơn</small>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#fbbf24' }}>Cần xử lý ngay</span>
          </div>

          <div className="card-glass" style={{ padding: '20px', borderLeft: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TỔNG KHÁCH / BOSS</span>
              <Users size={22} color="#10b981" />
            </div>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#10b981' }}>
              {stats ? stats.totalCustomers : '0'} / {stats ? stats.totalPets : '0'}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#34d399' }}>Khách hàng thân thiết</span>
          </div>
        </div>

        {/* Tabbed Navigation Bar for Admin Views */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '12px'
        }}>
          <button 
            className={`btn ${adminSubTab === 'bookings' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setAdminSubTab('bookings')}
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            📋 Quản Lý Đơn Đặt ({bookings.length})
          </button>
          <button 
            className={`btn ${adminSubTab === 'rooms' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setAdminSubTab('rooms')}
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            🏨 Tải Trọng Phòng Khách Sạn
          </button>
        </div>

        {/* Sub-Tab 1: Bookings Management Table View */}
        {adminSubTab === 'bookings' && (
          <div className="card-glass" style={{ padding: '24px' }}>
            {/* Filter and Search Bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--color-border)'
            }}>
              {/* Search Box */}
              <div style={{ position: 'relative', width: '300px', maxWidth: '100%' }}>
                <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Tìm theo Tên, SĐT, Mã đơn..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: '36px', paddingRight: '12px', fontSize: '0.85rem' }}
                />
              </div>

              {/* Status Filter Chips */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginRight: '4px' }}>Trạng thái:</span>
                {[
                  { key: 'all', label: 'Tất cả' },
                  { key: 'pending', label: 'Chờ xử lý' },
                  { key: 'confirmed', label: 'Xác nhận' },
                  { key: 'checked-in', label: 'Đang ở' },
                  { key: 'completed', label: 'Hoàn thành' },
                  { key: 'cancelled', label: 'Đã hủy' }
                ].map(st => (
                  <button
                    key={st.key}
                    onClick={() => setStatusFilter(st.key)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      background: statusFilter === st.key ? 'var(--color-primary)' : 'rgba(30, 41, 59, 0.8)',
                      color: statusFilter === st.key ? '#0f172a' : 'var(--color-text-muted)',
                      border: '1px solid var(--color-border)',
                      cursor: 'pointer'
                    }}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* High-density Enterprise Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', background: 'rgba(15, 23, 42, 0.5)' }}>
                    <th style={{ padding: '12px' }}>Mã Đơn</th>
                    <th style={{ padding: '12px' }}>Khách Hàng (SĐT)</th>
                    <th style={{ padding: '12px' }}>Boss Cưng</th>
                    <th style={{ padding: '12px' }}>Phòng Đặt</th>
                    <th style={{ padding: '12px' }}>Check-in / Out</th>
                    <th style={{ padding: '12px' }}>Thành Tiền</th>
                    <th style={{ padding: '12px' }}>Trạng Thái Hiện Tại</th>
                    <th style={{ padding: '12px', textAlign: 'right' }}>Thao Tác Admin</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
                        Không tìm thấy đơn đặt thỏa mãn điều kiện lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map(bk => (
                      <tr 
                        key={bk.id} 
                        style={{ 
                          borderBottom: '1px solid rgba(255,255,255,0.05)',
                          background: bk.status === 'pending' ? 'rgba(245, 158, 11, 0.05)' : 'transparent'
                        }}
                      >
                        <td style={{ padding: '12px', fontWeight: 800, color: 'var(--color-primary)' }}>#{bk.id}</td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontWeight: 700 }}>{bk.userName}</div>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>📞 {bk.userPhone}</span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ fontWeight: 600 }}>{bk.petName}</span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'block' }}>Species: {bk.petType}</span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontWeight: 600 }}>{bk.roomName}</div>
                        </td>
                        <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: '0.82rem' }}>{bk.checkIn}</span>
                          <span style={{ color: 'var(--color-primary)', margin: '0 4px' }}>➔</span>
                          <span style={{ fontSize: '0.82rem' }}>{bk.checkOut}</span>
                        </td>
                        <td style={{ padding: '12px', fontWeight: 800, color: 'var(--color-primary)' }}>
                          {bk.totalAmount.toLocaleString('vi-VN')}đ
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span className={`badge ${
                            bk.status === 'confirmed' ? 'badge-info' :
                            bk.status === 'checked-in' ? 'badge-success' :
                            bk.status === 'completed' ? 'badge-success' :
                            bk.status === 'pending' ? 'badge-warning' : 'badge-danger'
                          }`}>
                            {bk.status === 'pending' ? '⏳ Chờ xử lý' :
                             bk.status === 'confirmed' ? '✓ Đã xác nhận' :
                             bk.status === 'checked-in' ? '🏨 Đang ở' :
                             bk.status === 'completed' ? '🎉 Hoàn thành' : '❌ Đã hủy'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <select 
                            className="form-select" 
                            style={{ 
                              padding: '6px 10px', 
                              fontSize: '0.8rem', 
                              width: 'auto', 
                              display: 'inline-block',
                              borderColor: bk.status === 'pending' ? '#fbbf24' : 'var(--color-border)'
                            }}
                            value={bk.status}
                            onChange={e => handleStatusChange(bk.id, e.target.value)}
                          >
                            <option value="pending">pending (Chờ)</option>
                            <option value="confirmed">confirmed (Xác nhận)</option>
                            <option value="checked-in">checked-in (Nhận phòng)</option>
                            <option value="completed">completed (Hoàn thành)</option>
                            <option value="cancelled">cancelled (Hủy đơn)</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sub-Tab 2: Rooms Status View */}
        {adminSubTab === 'rooms' && (
          <div className="card-glass" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Tình Trạng Tải Trọng Phòng Khách Sạn</h3>
            <div className="grid-3">
              {[
                { name: 'Deluxe Suite', total: 5, occupied: 3, price: '250.000đ/đêm', status: 'Đang phục vụ tốt' },
                { name: 'Standard Room', total: 10, occupied: 6, price: '150.000đ/đêm', status: 'Đang phục vụ tốt' },
                { name: 'Cat Villa VIP', total: 4, occupied: 2, price: '180.000đ/đêm', status: 'Còn phòng trống' }
              ].map((rm, idx) => (
                <div key={idx} style={{ padding: '20px', background: '#0f172a', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ margin: 0 }}>{rm.name}</h4>
                    <span className="badge badge-success">{rm.status}</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                    Đang ở: <strong style={{ color: 'var(--color-primary)' }}>{rm.occupied} / {rm.total}</strong> phòng
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                    Đơn giá niêm yết: <strong>{rm.price}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
