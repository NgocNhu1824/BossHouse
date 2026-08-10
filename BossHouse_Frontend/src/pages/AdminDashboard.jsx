import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { DollarSign, Calendar, Users, Hotel, ShieldCheck, CheckCircle, Clock, Video, XCircle } from 'lucide-react';

export const AdminDashboard = ({ bookings = [], onUpdateStatus, onRefreshData }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <span className="badge badge-warning" style={{ marginBottom: '6px' }}>
              <ShieldCheck size={14} /> KÊNH BÁO CÁO QUẢN TRỊ VIÊN
            </span>
            <h1 style={{ fontSize: '2rem' }}>Bảng Điều Khiển Quản Lý BossHouse</h1>
          </div>
          <button className="btn btn-secondary" onClick={onRefreshData}>
            🔄 Làm Mới Dữ Liệu
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid-4" style={{ marginBottom: '40px' }}>
          <div className="card-glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Tổng Doanh Thu</span>
              <DollarSign size={20} color="var(--color-primary)" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              {stats ? stats.totalRevenue.toLocaleString('vi-VN') : '0'}đ
            </div>
          </div>

          <div className="card-glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Boss Đang Lưu Trú</span>
              <Hotel size={20} color="#ec4899" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ec4899' }}>
              {stats ? stats.activeStays : '0'}
            </div>
          </div>

          <div className="card-glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Đơn Đặt Chờ Xử Lý</span>
              <Clock size={20} color="#fbbf24" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24' }}>
              {stats ? stats.pendingBookings : '0'}
            </div>
          </div>

          <div className="card-glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Tổng Khách Hàng / Boss</span>
              <Users size={20} color="#10b981" />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981' }}>
              {stats ? stats.totalCustomers : '0'} / {stats ? stats.totalPets : '0'}
            </div>
          </div>
        </div>

        {/* Bookings Management Table */}
        <div className="card-glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Quản Lý Đơn Đặt Phòng & Trạng Thái Lưu Trú</h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '12px' }}>Mã Đơn</th>
                  <th style={{ padding: '12px' }}>Khách Hàng (SĐT)</th>
                  <th style={{ padding: '12px' }}>Boss</th>
                  <th style={{ padding: '12px' }}>Phòng</th>
                  <th style={{ padding: '12px' }}>Check-in / Out</th>
                  <th style={{ padding: '12px' }}>Tổng Tiền</th>
                  <th style={{ padding: '12px' }}>Trạng Thái</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Thao Tác Admin</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(bk => (
                  <tr key={bk.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 700 }}>#{bk.id}</td>
                    <td style={{ padding: '12px' }}>{bk.userName}<br/><small style={{ color: 'var(--color-text-muted)' }}>{bk.userPhone}</small></td>
                    <td style={{ padding: '12px' }}>{bk.petName} ({bk.petType})</td>
                    <td style={{ padding: '12px' }}>{bk.roomName}</td>
                    <td style={{ padding: '12px' }}>{bk.checkIn} ➔ {bk.checkOut}</td>
                    <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>
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
                        style={{ padding: '4px 8px', fontSize: '0.82rem', width: 'auto', display: 'inline-block' }}
                        value={bk.status}
                        onChange={e => handleStatusChange(bk.id, e.target.value)}
                      >
                        <option value="pending">pending (Chờ)</option>
                        <option value="confirmed">confirmed (Xác nhận)</option>
                        <option value="checked-in">checked-in (Nhận phòng)</option>
                        <option value="completed">completed (Hoàn thành)</option>
                        <option value="cancelled">cancelled (Hủy)</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
