import React from 'react';
import { Calendar, Clock, MapPin, AlertCircle, XCircle, CheckCircle, Video } from '../components/Icons';

export const MyBookingsPage = ({ bookings = [], onCancelBooking, onOpenBooking, user, onGoToAdmin }) => {
  const statusBadges = {
    pending: <span className="badge badge-warning">Đang Chờ Xác Nhận</span>,
    confirmed: <span className="badge badge-info">Đã Xác Nhận Phòng</span>,
    'checked-in': <span className="badge badge-success">Đang Lưu Trú Tại BossHouse 🐾</span>,
    completed: <span className="badge badge-success">Đã Trả Phòng (Hoàn Thành)</span>,
    cancelled: <span className="badge badge-danger">Đã Hủy</span>
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container">

        {isAdmin && (
          <div className="card-glass" style={{ padding: '20px', marginBottom: '32px', border: '1px solid rgba(236, 72, 153, 0.35)', background: 'rgba(236, 72, 153, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f472b6', flexShrink: 0 }}>
                👑
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Chế độ Quản Trị Viên (Admin)</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Quản lý toàn bộ danh sách đơn đặt lưu trú & dịch vụ của tất cả khách hàng tại Bảng Đơn Đặt trong Admin Portal.</div>
              </div>
            </div>

            {onGoToAdmin && (
              <button className="btn btn-primary btn-sm" onClick={onGoToAdmin} style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff' }}>
                Bảng Đơn Đặt (Admin Portal)
              </button>
            )}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '6px' }}>Lịch Sử Đặt Phòng & Dịch Vụ 📅</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Theo dõi tình trạng lưu trú, dịch vụ đi kèm và chi tiết từng đơn
            </p>
          </div>

          {!isAdmin && (
            <button className="btn btn-primary btn-lg" onClick={onOpenBooking}>
              + Đặt Phòng Mới
            </button>
          )}
        </div>

        {bookings.length === 0 ? (
          <div className="card-glass" style={{ padding: '60px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏨</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Chưa có đơn đặt phòng nào</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
              Hãy chọn cho Boss cưng một căn phòng ấm cúng cho kỳ nghỉ sắp tới!
            </p>
            <button className="btn btn-primary" onClick={onOpenBooking}>
              Đặt Phòng Ngay
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {bookings.map(bk => (
              <div key={bk.id} className="card-glass" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'block' }}>Mã đơn: #{bk.id}</span>
                    <h3 style={{ fontSize: '1.25rem', color: 'white' }}>{bk.roomName}</h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {statusBadges[bk.status] || <span className="badge badge-info">{bk.status}</span>}
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                      {bk.totalAmount.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                <div className="grid-3" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.82rem' }}>Boss nhận phòng:</span>
                    <strong>{bk.petName} ({bk.petType === 'cat' ? 'Mèo' : 'Chó'})</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.82rem' }}>Thời gian lưu trú ({bk.nights} đêm):</span>
                    <strong>{bk.checkIn} ➔ {bk.checkOut}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.82rem' }}>Người đặt (SĐT):</span>
                    <strong>{bk.userName} ({bk.userPhone})</strong>
                  </div>
                </div>

                {/* Selected Services */}
                {bk.selectedServices && bk.selectedServices.length > 0 && (
                  <div style={{
                    background: 'rgba(15,23,42,0.5)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '16px',
                    fontSize: '0.86rem'
                  }}>
                    <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>
                      Dịch Vụ Đi Kèm:
                    </strong>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {bk.selectedServices.map((s, i) => (
                        <span key={i} className="badge badge-info">
                          ✂️ {s.name} (+{s.price.toLocaleString('vi-VN')}đ)
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Live Camera notification for checked-in status */}
                {bk.status === 'checked-in' && (
                  <div style={{
                    background: 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Video size={20} color="#60a5fa" />
                      <span style={{ fontSize: '0.9rem', color: '#60a5fa' }}>
                        Boss đang lưu trú tại phòng. Camera HD trực tiếp đang bật!
                      </span>
                    </div>
                    <button className="btn btn-outline btn-sm">Xem Live Cam 🔴</button>
                  </div>
                )}

                {bk.specialRequests && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '16px', fontStyle: 'italic' }}>
                    Yêu cầu đặc biệt: "{bk.specialRequests}"
                  </p>
                )}

                {/* Actions */}
                {(bk.status === 'pending' || bk.status === 'confirmed') && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      style={{ color: '#ef4444' }}
                      onClick={() => onCancelBooking(bk.id)}
                    >
                      <XCircle size={16} /> Hủy Đơn Đặt Này
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
