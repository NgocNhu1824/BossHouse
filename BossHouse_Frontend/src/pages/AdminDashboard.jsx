import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  DollarSign, Calendar, Users, Hotel, ShieldCheck, CheckCircle, Clock, Video, XCircle, 
  Search, Filter, Layers, BarChart2, Dog, Scissors, PlusCircle, Trash2, Settings
} from '../components/Icons';

export const AdminDashboard = ({ 
  bookings = [], 
  rooms = [], 
  services = [], 
  pets = [], 
  usersList = [],
  onUpdateStatus, 
  onRefreshData,
  onOpenAddRoom,
  onEditRoom,
  onDeleteRoom,
  onOpenAddService,
  onEditService,
  onDeleteService
}) => {
  const [stats, setStats] = useState(null);
  const [activeAdminTab, setActiveAdminTab] = useState('analytics'); // 'analytics' | 'bookings' | 'rooms' | 'services' | 'pets'
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [chartTimeframe, setChartTimeframe] = useState('weekly'); // 'weekly' | 'monthly'

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
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await onUpdateStatus(id, newStatus);
    loadStats();
  };

  // Filtered Bookings
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

  // Chart Data
  const weeklyData = [
    { label: 'Thứ 2', revenue: 1450000 },
    { label: 'Thứ 3', revenue: 2100000 },
    { label: 'Thứ 4', revenue: 1800000 },
    { label: 'Thứ 5', revenue: 2900000 },
    { label: 'Thứ 6', revenue: 3500000 },
    { label: 'Thứ 7', revenue: 4800000 },
    { label: 'Chủ Nhật', revenue: 5200000 }
  ];

  const monthlyData = [
    { label: 'T1', revenue: 28000000 },
    { label: 'T2', revenue: 32000000 },
    { label: 'T3', revenue: 29000000 },
    { label: 'T4', revenue: 41000000 },
    { label: 'T5', revenue: 38000000 },
    { label: 'T6', revenue: 55000000 },
    { label: 'T7', revenue: 62000000 },
    { label: 'T8', revenue: 58000000 },
    { label: 'T9', revenue: 45000000 },
    { label: 'T10', revenue: 49000000 },
    { label: 'T11', revenue: 51000000 },
    { label: 'T12', revenue: 75000000 }
  ];

  const maxRevenue = Math.max(...(chartTimeframe === 'weekly' ? weeklyData : monthlyData).map(d => d.revenue));

  return (
    <div style={{ background: '#090d16', minHeight: 'calc(100vh - 76px)', padding: '0 0 60px 0' }}>
      {/* Top Admin Header Bar */}
      <div style={{
        background: '#0f172a',
        borderBottom: '2px solid #ec4899',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            color: 'white',
            fontWeight: 'bold'
          }}>
            🛡️
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Hệ Thống Quản Trị Trung Tâm BossHouse
            </h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              Bảng quản lý dữ liệu cao cấp (Enterprise Portal Workspace)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary btn-sm" onClick={onRefreshData}>
            🔄 Tải Lại Dữ Liệu
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: 'calc(100vh - 150px)' }}>
        {/* Left Enterprise Sidebar */}
        <aside style={{
          width: '260px',
          background: '#0f172a',
          borderRight: '1px solid var(--color-border)',
          padding: '20px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          flexShrink: 0
        }}>
          <div style={{ padding: '8px 12px', fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-text-subtle)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            DANH MỤC THỐNG KÊ & BẢNG
          </div>

          <button 
            onClick={() => setActiveAdminTab('analytics')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: activeAdminTab === 'analytics' ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : 'transparent',
              color: activeAdminTab === 'analytics' ? 'white' : 'var(--color-text-muted)',
              fontWeight: activeAdminTab === 'analytics' ? 700 : 500,
              fontSize: '0.9rem',
              textAlign: 'left'
            }}
          >
            <BarChart2 size={18} /> Biểu Đồ & Doanh Thu
          </button>

          <button 
            onClick={() => setActiveAdminTab('bookings')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: activeAdminTab === 'bookings' ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : 'transparent',
              color: activeAdminTab === 'bookings' ? 'white' : 'var(--color-text-muted)',
              fontWeight: activeAdminTab === 'bookings' ? 700 : 500,
              fontSize: '0.9rem',
              textAlign: 'left'
            }}
          >
            <Calendar size={18} /> Bảng Đơn Đặt ({bookings.length})
          </button>

          <button 
            onClick={() => setActiveAdminTab('rooms')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: activeAdminTab === 'rooms' ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : 'transparent',
              color: activeAdminTab === 'rooms' ? 'white' : 'var(--color-text-muted)',
              fontWeight: activeAdminTab === 'rooms' ? 700 : 500,
              fontSize: '0.9rem',
              textAlign: 'left'
            }}
          >
            <Hotel size={18} /> Quản Lý Phòng ({rooms.length})
          </button>

          <button 
            onClick={() => setActiveAdminTab('services')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: activeAdminTab === 'services' ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : 'transparent',
              color: activeAdminTab === 'services' ? 'white' : 'var(--color-text-muted)',
              fontWeight: activeAdminTab === 'services' ? 700 : 500,
              fontSize: '0.9rem',
              textAlign: 'left'
            }}
          >
            <Scissors size={18} /> Dịch Vụ Spa ({services.length})
          </button>

          <button 
            onClick={() => setActiveAdminTab('pets')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: activeAdminTab === 'pets' ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : 'transparent',
              color: activeAdminTab === 'pets' ? 'white' : 'var(--color-text-muted)',
              fontWeight: activeAdminTab === 'pets' ? 700 : 500,
              fontSize: '0.9rem',
              textAlign: 'left'
            }}
          >
            <Dog size={18} /> Danh Sách Khách & Boss
          </button>
        </aside>

        {/* Main Content Workspace Panel */}
        <main style={{ flex: 1, padding: '24px', overflowX: 'hidden' }}>
          {/* Section 1: Analytics & Visual Charts */}
          {activeAdminTab === 'analytics' && (
            <div>
              {/* Metric Counters */}
              <div className="grid-4" style={{ marginBottom: '28px' }}>
                <div className="card-glass" style={{ padding: '20px', borderLeft: '4px solid var(--color-primary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>TỔNG DOANH THU</span>
                    <DollarSign size={20} color="var(--color-primary)" />
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    {stats ? stats.totalRevenue.toLocaleString('vi-VN') : '0'}đ
                  </div>
                </div>

                <div className="card-glass" style={{ padding: '20px', borderLeft: '4px solid #ec4899' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>ĐANG Ở PHÒNG</span>
                    <Hotel size={20} color="#ec4899" />
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ec4899' }}>
                    {stats ? stats.activeStays : '0'} phòng
                  </div>
                </div>

                <div className="card-glass" style={{ padding: '20px', borderLeft: '4px solid #fbbf24' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>ĐƠN ĐẶT CHỜ</span>
                    <Clock size={20} color="#fbbf24" />
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24' }}>
                    {stats ? stats.pendingBookings : '0'} đơn
                  </div>
                </div>

                <div className="card-glass" style={{ padding: '20px', borderLeft: '4px solid #10b981' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>TỔNG BOSS ĐÃ KÊ CHAI</span>
                    <Dog size={20} color="#10b981" />
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981' }}>
                    {stats ? stats.totalPets : '0'} bé
                  </div>
                </div>
              </div>

              {/* Bar Chart & Pie Chart Layout Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
                {/* Visual Revenue Bar Chart */}
                <div className="card-glass" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', margin: 0 }}>📊 Biểu Đồ Cột Doanh Thu</h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Thống kê biến động doanh thu kinh doanh</span>
                    </div>

                    <div style={{ display: 'flex', gap: '4px', background: '#0f172a', padding: '4px', borderRadius: 'var(--radius-md)' }}>
                      <button 
                        onClick={() => setChartTimeframe('weekly')}
                        className={`btn btn-sm ${chartTimeframe === 'weekly' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                      >
                        Theo Tuần
                      </button>
                      <button 
                        onClick={() => setChartTimeframe('monthly')}
                        className={`btn btn-sm ${chartTimeframe === 'monthly' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                      >
                        Theo Tháng
                      </button>
                    </div>
                  </div>

                  {/* SVG Bar Chart Graphic */}
                  <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
                    {(chartTimeframe === 'weekly' ? weeklyData : monthlyData).map((item, idx) => {
                      const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
                      return (
                        <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                          <span style={{ fontSize: '0.68rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                            {chartTimeframe === 'weekly' ? `${(item.revenue / 1000000).toFixed(1)}M` : `${Math.round(item.revenue / 1000000)}M`}
                          </span>
                          <div style={{
                            width: '100%',
                            maxWidth: '36px',
                            height: `${heightPercent}%`,
                            background: 'linear-gradient(180deg, #f59e0b 0%, #ec4899 100%)',
                            borderRadius: '6px 6px 0 0',
                            transition: 'height 0.4s ease'
                          }} />
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Service/Room Share Pie/Donut Chart */}
                <div className="card-glass" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>🥧 Tỷ Lệ Đặt Phòng & Dịch Vụ Spa</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '24px' }}>Phân bổ thị phần dịch vụ yêu thích</span>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '20px', flexWrap: 'wrap' }}>
                    {/* SVG Pie Ring Graphic */}
                    <div style={{ position: 'relative', width: '150px', height: '150px' }}>
                      <svg width="150" height="150" viewBox="0 0 42 42">
                        <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#1e293b" strokeWidth="6" />
                        {/* Deluxe Suite Segment */}
                        <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#f59e0b" strokeWidth="6" strokeDasharray="45 55" strokeDashoffset="25" />
                        {/* Standard Room Segment */}
                        <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ec4899" strokeWidth="6" strokeDasharray="30 70" strokeDashoffset="80" />
                        {/* Spa Grooming Segment */}
                        <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#3b82f6" strokeWidth="6" strokeDasharray="25 75" strokeDashoffset="50" />
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>100%</span>
                        <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>Công suất</span>
                      </div>
                    </div>

                    {/* Chart Legends */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f59e0b' }} />
                        <span>Deluxe Suite (45%)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#ec4899' }} />
                        <span>Standard Room (30%)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#3b82f6' }} />
                        <span>Spa & Cắt Tỉa (25%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Bookings Management Data Table */}
          {activeAdminTab === 'bookings' && (
            <div className="card-glass" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>📋 Danh Sách Quản Lý Đơn Đặt Phòng & Dịch Vụ</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Cập nhật trạng thái check-in/check-out thời gian thực</span>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', width: '260px' }}>
                    <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Tìm Tên, SĐT, Mã đơn..." 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{ paddingLeft: '36px', paddingRight: '12px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Status Chips */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {[
                  { key: 'all', label: 'Tất cả đơn' },
                  { key: 'pending', label: '⏳ Chờ xử lý' },
                  { key: 'confirmed', label: '✓ Xác nhận' },
                  { key: 'checked-in', label: '🏨 Đang ở' },
                  { key: 'completed', label: '🎉 Hoàn thành' },
                  { key: 'cancelled', label: '❌ Đã hủy' }
                ].map(st => (
                  <button
                    key={st.key}
                    onClick={() => setStatusFilter(st.key)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      background: statusFilter === st.key ? 'var(--color-primary)' : '#0f172a',
                      color: statusFilter === st.key ? '#0f172a' : 'var(--color-text-muted)',
                      border: '1px solid var(--color-border)',
                      cursor: 'pointer'
                    }}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', background: '#0f172a' }}>
                      <th style={{ padding: '12px' }}>Mã Đơn</th>
                      <th style={{ padding: '12px' }}>Khách Hàng (SĐT)</th>
                      <th style={{ padding: '12px' }}>Boss Cưng</th>
                      <th style={{ padding: '12px' }}>Dịch Vụ / Phòng</th>
                      <th style={{ padding: '12px' }}>Ngày Thực Hiện</th>
                      <th style={{ padding: '12px' }}>Thành Tiền</th>
                      <th style={{ padding: '12px' }}>Trạng Thái</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Thao Tác Quản Trị</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.length === 0 ? (
                      <tr><td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--color-text-muted)' }}>Không có đơn đặt thỏa mãn.</td></tr>
                    ) : (
                      filteredBookings.map(bk => (
                        <tr key={bk.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '12px', fontWeight: 800, color: 'var(--color-primary)' }}>#{bk.id}</td>
                          <td style={{ padding: '12px' }}>
                            <strong>{bk.userName}</strong><br/>
                            <small style={{ color: 'var(--color-text-muted)' }}>📞 {bk.userPhone}</small>
                          </td>
                          <td style={{ padding: '12px' }}>{bk.petName} ({bk.petType})</td>
                          <td style={{ padding: '12px', fontWeight: 600 }}>{bk.roomName}</td>
                          <td style={{ padding: '12px', fontSize: '0.82rem' }}>{bk.checkIn} ➔ {bk.checkOut}</td>
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
                              {bk.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'right' }}>
                            <select 
                              className="form-select" 
                              style={{ padding: '4px 8px', fontSize: '0.8rem', width: 'auto', display: 'inline-block' }}
                              value={bk.status}
                              onChange={e => handleStatusChange(bk.id, e.target.value)}
                            >
                              <option value="pending">pending (Chờ)</option>
                              <option value="confirmed">confirmed (Xác nhận)</option>
                              <option value="checked-in">checked-in (Đang ở)</option>
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

          {/* Section 3: Rooms CRUD Table */}
          {activeAdminTab === 'rooms' && (
            <div className="card-glass" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>🏨 Bảng Quản Lý Danh Mục Phòng Khách Sạn (CRUD)</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Thêm phòng mới, chỉnh sửa giá niêm yết & điều chỉnh trạng thái phòng</span>
                </div>
                <button className="btn btn-primary" onClick={onOpenAddRoom}>
                  <PlusCircle size={18} /> Thêm Phòng Mới
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', background: '#0f172a' }}>
                      <th style={{ padding: '12px' }}>Mã Phòng</th>
                      <th style={{ padding: '12px' }}>Tên Phòng Khách Sạn</th>
                      <th style={{ padding: '12px' }}>Hạng Phòng</th>
                      <th style={{ padding: '12px' }}>Đơn Giá / Đêm</th>
                      <th style={{ padding: '12px' }}>Sức Chứa</th>
                      <th style={{ padding: '12px' }}>Trạng Thái</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Thao Tác CRUD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map(rm => (
                      <tr key={rm.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px', fontWeight: 800, color: 'var(--color-primary)' }}>#{rm.id}</td>
                        <td style={{ padding: '12px', fontWeight: 700 }}>{rm.name}</td>
                        <td style={{ padding: '12px' }}>
                          <span className="badge badge-info">{rm.category}</span>
                        </td>
                        <td style={{ padding: '12px', fontWeight: 800, color: 'var(--color-primary)' }}>
                          {(rm.price || rm.pricePerNight || 0).toLocaleString('vi-VN')}đ
                        </td>
                        <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{rm.capacity}</td>
                        <td style={{ padding: '12px' }}>
                          <span className={`badge ${rm.status === 'available' ? 'badge-success' : 'badge-warning'}`}>
                            {rm.status === 'available' ? 'Sẵn sàng phục vụ' : 'Đang ở / Bảo trì'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button 
                              className="btn btn-secondary btn-sm"
                              onClick={() => onEditRoom(rm)}
                            >
                              ✏️ Sửa
                            </button>
                            <button 
                              className="btn btn-secondary btn-sm"
                              onClick={() => onDeleteRoom(rm.id)}
                              style={{ color: '#ef4444' }}
                            >
                              <Trash2 size={14} /> Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 4: Services CRUD Table */}
          {activeAdminTab === 'services' && (
            <div className="card-glass" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>✂️ Bảng Quản Lý Danh Mục Dịch Vụ Spa (CRUD)</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Cấu hình các gói tắm, cắt tỉa lông & dịch vụ chăm sóc</span>
                </div>
                <button className="btn btn-primary" onClick={onOpenAddService}>
                  <PlusCircle size={18} /> Thêm Dịch Vụ Mới
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', background: '#0f172a' }}>
                      <th style={{ padding: '12px' }}>Mã Dịch Vụ</th>
                      <th style={{ padding: '12px' }}>Tên Dịch Vụ Spa</th>
                      <th style={{ padding: '12px' }}>Phân Loại</th>
                      <th style={{ padding: '12px' }}>Thời Gian</th>
                      <th style={{ padding: '12px' }}>Đơn Giá</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Thao Tác CRUD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(sv => (
                      <tr key={sv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '12px', fontWeight: 800, color: 'var(--color-primary)' }}>#{sv.id}</td>
                        <td style={{ padding: '12px', fontWeight: 700 }}>{sv.name}</td>
                        <td style={{ padding: '12px' }}><span className="badge badge-warning">{sv.category}</span></td>
                        <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{sv.duration}</td>
                        <td style={{ padding: '12px', fontWeight: 800, color: 'var(--color-primary)' }}>
                          {sv.price.toLocaleString('vi-VN')}đ
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button 
                              className="btn btn-secondary btn-sm"
                              onClick={() => onEditService(sv)}
                            >
                              ✏️ Sửa
                            </button>
                            <button 
                              className="btn btn-secondary btn-sm"
                              onClick={() => onDeleteService(sv.id)}
                              style={{ color: '#ef4444' }}
                            >
                              <Trash2 size={14} /> Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 5: Pets & Customers Data Table */}
          {activeAdminTab === 'pets' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Customers Table */}
              <div className="card-glass" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>👤 Danh Sách Khách Hàng & Chủ Nuôi Đăng Ký</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', background: '#0f172a' }}>
                        <th style={{ padding: '12px' }}>Mã KH</th>
                        <th style={{ padding: '12px' }}>Tên Khách Hàng</th>
                        <th style={{ padding: '12px' }}>Email Liên Hệ</th>
                        <th style={{ padding: '12px' }}>Số Điện Thoại</th>
                        <th style={{ padding: '12px' }}>Phân Cấp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)' }}>
                            Đang tải danh sách khách hàng...
                          </td>
                        </tr>
                      ) : (
                        usersList.map(u => (
                          <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '12px', fontWeight: 800, color: 'var(--color-primary)' }}>#{u.id}</td>
                            <td style={{ padding: '12px', fontWeight: 700 }}>{u.name}</td>
                            <td style={{ padding: '12px' }}>{u.email}</td>
                            <td style={{ padding: '12px', color: '#34d399' }}>📞 {u.phone || '0912345678'}</td>
                            <td style={{ padding: '12px' }}>
                              <span className={`badge ${u.role === 'admin' ? 'badge-danger' : 'badge-info'}`}>
                                {u.role === 'admin' ? '👑 Quản Trị Viên' : '⭐️ Khách Hàng Thân Thiết'}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pets Table */}
              <div className="card-glass" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>🐾 Danh Sách Hồ Sơ Boss Thú Cưng</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', background: '#0f172a' }}>
                        <th style={{ padding: '12px' }}>Mã Thú Cưng</th>
                        <th style={{ padding: '12px' }}>Tên Boss</th>
                        <th style={{ padding: '12px' }}>Loài</th>
                        <th style={{ padding: '12px' }}>Giống Thú Cưng</th>
                        <th style={{ padding: '12px' }}>Cân Nặng</th>
                        <th style={{ padding: '12px' }}>Tuổi</th>
                        <th style={{ padding: '12px' }}>Ghi Chú Sức Khỏe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pets.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)' }}>
                            Chưa có dữ liệu Boss thú cưng.
                          </td>
                        </tr>
                      ) : (
                        pets.map(pt => (
                          <tr key={pt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '12px', fontWeight: 800, color: 'var(--color-primary)' }}>#{pt.id}</td>
                            <td style={{ padding: '12px', fontWeight: 700 }}>{pt.name}</td>
                            <td style={{ padding: '12px' }}>{pt.type === 'dog' ? '🐶 Chó cưng' : '🐱 Mèo cưng'}</td>
                            <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{pt.breed || 'Chưa xác định'}</td>
                            <td style={{ padding: '12px' }}>{pt.weight} kg</td>
                            <td style={{ padding: '12px' }}>{pt.age} tuổi</td>
                            <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{pt.notes || 'Bình thường'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
