import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { BookingModal } from './components/BookingModal';
import { PetModal } from './components/PetModal';
import { AuthModal } from './components/AuthModal';
import { RoomModal, ServiceModal, UserModal } from './components/AdminModals';
import { ProfileModal } from './components/ProfileModal';
import { DetailModal } from './components/DetailModal';
import { Chatbox } from './components/Chatbox';

import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { ServicesPage } from './pages/ServicesPage';
import { MyPetsPage } from './pages/MyPetsPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AdminDashboard } from './pages/AdminDashboard';

import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  const [rooms, setRooms] = useState([]);
  const [services, setServices] = useState([]);
  const [pets, setPets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Customer Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Detail Modal (Full uncropped photo view)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [detailType, setDetailType] = useState('room');

  // Admin CRUD Modals
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [selectedRoomForEdit, setSelectedRoomForEdit] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedServiceForEdit, setSelectedServiceForEdit] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Initial Data Fetching
  useEffect(() => {
    fetchInitialData();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const savedUser = localStorage.getItem('bosshouse_user');
    if (savedUser) {
      try {
        const currentUser = JSON.parse(savedUser);
        setUser(currentUser);
        if (currentUser.role === 'admin') {
          setActiveTab('admin');
        }
      } catch (e) {
        localStorage.removeItem('bosshouse_user');
      }
    }
  };

  const fetchInitialData = async () => {
    try {
      const [roomsRes, servicesRes, reviewsRes] = await Promise.all([
        api.getRooms(),
        api.getServices(),
        api.getReviews()
      ]);

      if (roomsRes.success) setRooms(roomsRes.data);
      if (servicesRes.success) setServices(servicesRes.data);
      if (reviewsRes.success) setReviews(reviewsRes.data);

      fetchUserData();
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const [usersList, setUsersList] = useState([]);

  const fetchUserData = async () => {
    try {
      const savedUser = localStorage.getItem('bosshouse_user');
      const currentUser = savedUser ? JSON.parse(savedUser) : null;
      const isAdmin = currentUser?.role === 'admin';
      const userId = currentUser ? currentUser.id : 'u-customer1';

      const [petsRes, bookingsRes] = await Promise.all([
        api.getPets(isAdmin ? '' : userId),
        api.getBookings(isAdmin ? '' : userId)
      ]);

      if (petsRes.success) setPets(petsRes.data);
      if (bookingsRes.success) setBookings(bookingsRes.data);

      if (isAdmin) {
        const usersRes = await api.getUsers();
        if (usersRes.success) setUsersList(usersRes.data);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  // Auth Handlers
  const handleLogin = async (email, password) => {
    try {
      const res = await api.login(email, password);
      if (res.success) {
        setUser(res.user);
        localStorage.setItem('bosshouse_user', JSON.stringify(res.user));
        localStorage.setItem('bosshouse_token', res.token);
        showToast(`Xin chào mừng ${res.user.name} trở lại!`, 'success');
        setIsAuthModalOpen(false);
        fetchUserData();
        
        // Mặc định: Customer -> 'home', Admin -> 'admin'
        if (res.user.role === 'admin') {
          setActiveTab('admin');
        } else {
          setActiveTab('home');
        }
      } else {
        showToast(res.message || 'Đăng nhập thất bại', 'error');
      }
    } catch (err) {
      showToast('Có lỗi xảy ra khi kết nối máy chủ', 'error');
    }
  };

  const handleRegister = async (userData) => {
    try {
      const res = await api.register(userData);
      if (res.success) {
        setUser(res.user);
        localStorage.setItem('bosshouse_user', JSON.stringify(res.user));
        localStorage.setItem('bosshouse_token', res.token);
        showToast('Đăng ký tài khoản thành công!', 'success');
        setIsAuthModalOpen(false);
        fetchUserData();

        if (res.user.role === 'admin') {
          setActiveTab('admin');
        } else {
          setActiveTab('home');
        }
      } else {
        showToast(res.message || 'Đăng ký thất bại', 'error');
      }
    } catch (err) {
      showToast('Có lỗi xảy ra khi kết nối máy chủ', 'error');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bosshouse_user');
    localStorage.removeItem('bosshouse_token');
    showToast('Đã đăng xuất tài khoản', 'info');
    setActiveTab('home');
  };

  const requireAuth = (actionCallback) => {
    if (!user) {
      showToast('🔒 Vui lòng đăng nhập để thực hiện tính năng này!', 'warning');
      setIsAuthModalOpen(true);
      return false;
    }
    if (actionCallback) actionCallback();
    return true;
  };

  const handleSelectTab = (tab) => {
    if ((tab === 'pets' || tab === 'bookings') && !user) {
      showToast('🔒 Vui lòng đăng nhập để sử dụng tính năng cá nhân!', 'warning');
      setIsAuthModalOpen(true);
      return;
    }
    setActiveTab(tab);
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      const res = await api.updateProfile(profileData);
      if (res.success) {
        showToast(res.message, 'success');
        setUser(res.user);
        localStorage.setItem('bosshouse_user', JSON.stringify(res.user));
        setIsProfileModalOpen(false);
        fetchUserData();
      } else {
        showToast(res.message || 'Cập nhật thất bại', 'error');
      }
    } catch (err) {
      showToast('Lỗi cập nhật hồ sơ cá nhân', 'error');
    }
  };

  // Booking Handler
  const handleBookRoom = (room) => {
    if (user?.role === 'admin') {
      showToast('👑 Quyền Quản Trị Viên (Admin): Đơn đặt phòng & dịch vụ được quản lý trong Admin Portal.', 'info');
      setActiveTab('admin');
      return;
    }
    if (!requireAuth()) return;
    setSelectedRoomForBooking(room);
    setIsBookingModalOpen(true);
  };

  const handleSubmitBooking = async (bookingPayload) => {
    if (!requireAuth()) return;
    try {
      const res = await api.createBooking(bookingPayload);
      if (res.success) {
        showToast(res.message, 'success');
        fetchUserData();
        setActiveTab('bookings');
      } else {
        showToast(res.message || 'Không thể tạo đơn đặt', 'error');
      }
    } catch (err) {
      showToast('Lỗi gửi dữ liệu đặt chỗ', 'error');
    }
  };

  const handleCancelBooking = async (id) => {
    if (!requireAuth()) return;
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn đặt phòng này?')) return;
    try {
      const res = await api.cancelBooking(id);
      if (res.success) {
        showToast(res.message, 'info');
        fetchUserData();
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast('Lỗi khi hủy đơn', 'error');
    }
  };

  // Pet Handler
  const handleAddPet = async (petData) => {
    if (!requireAuth()) return;
    try {
      const res = await api.addPet(petData);
      if (res.success) {
        showToast(res.message, 'success');
        fetchUserData();
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast('Lỗi khi thêm hồ sơ Boss', 'error');
    }
  };

  const handleDeletePet = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa hồ sơ Boss này?')) return;
    try {
      const res = await api.deletePet(id);
      if (res.success) {
        showToast(res.message, 'info');
        fetchUserData();
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast('Lỗi khi xóa hồ sơ', 'error');
    }
  };

  // Review Handler
  const handleSubmitReview = async (reviewData) => {
    if (!user) {
      showToast('Vui lòng đăng nhập để gửi đánh giá!', 'warning');
      setIsAuthModalOpen(true);
      return;
    }
    if (user.role === 'admin') {
      showToast('Tài khoản Admin không viết đánh giá khách hàng.', 'warning');
      return;
    }

    try {
      const res = await api.createReview(reviewData);
      if (res.success) {
        showToast(res.message, 'success');
        const revRes = await api.getReviews();
        if (revRes.success) setReviews(revRes.data);
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast('Lỗi gửi đánh giá', 'error');
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) return;
    try {
      const res = await api.deleteReview(id);
      if (res.success) {
        showToast(res.message, 'info');
        const revRes = await api.getReviews();
        if (revRes.success) setReviews(revRes.data);
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast('Lỗi khi xóa đánh giá', 'error');
    }
  };

  // Admin Booking Status Handler
  const handleUpdateBookingStatus = async (id, status) => {
    try {
      const res = await api.updateBookingStatus(id, status);
      if (res.success) {
        showToast(res.message, 'success');
        fetchUserData();
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast('Lỗi khi đổi trạng thái', 'error');
    }
  };

  // Admin Room CRUD Handlers
  const handleSaveRoom = async (roomData) => {
    try {
      let res;
      if (selectedRoomForEdit) {
        res = await api.updateRoom(selectedRoomForEdit.id, roomData);
      } else {
        res = await api.createRoom(roomData);
      }
      if (res.success) {
        showToast(res.message, 'success');
        setIsRoomModalOpen(false);
        setSelectedRoomForEdit(null);
        fetchInitialData();
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast('Lỗi lưu thông tin phòng', 'error');
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phòng khách sạn này?')) return;
    try {
      const res = await api.deleteRoom(id);
      if (res.success) {
        showToast(res.message, 'info');
        fetchInitialData();
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast('Lỗi xóa phòng', 'error');
    }
  };

  // Admin Service CRUD Handlers
  const handleSaveService = async (serviceData) => {
    try {
      let res;
      if (selectedServiceForEdit) {
        res = await api.updateService(selectedServiceForEdit.id, serviceData);
      } else {
        res = await api.createService(serviceData);
      }
      if (res.success) {
        showToast(res.message, 'success');
        setIsServiceModalOpen(false);
        setSelectedServiceForEdit(null);
        fetchInitialData();
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast('Lỗi lưu thông tin dịch vụ', 'error');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa dịch vụ Spa này?')) return;
    try {
      const res = await api.deleteService(id);
      if (res.success) {
        showToast(res.message, 'info');
        fetchInitialData();
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast('Lỗi xóa dịch vụ', 'error');
    }
  };

  // Admin User Management Handlers
  const handleCreateUser = async (userData) => {
    try {
      const res = await api.createUser(userData);
      if (res.success) {
        showToast(res.message, 'success');
        setIsUserModalOpen(false);
        fetchUserData();
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast('Lỗi tạo tài khoản mới', 'error');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tài khoản này khỏi hệ thống?')) return;
    try {
      const res = await api.deleteUser(id);
      if (res.success) {
        showToast(res.message, 'info');
        fetchUserData();
      } else {
        showToast(res.message, 'error');
      }
    } catch (err) {
      showToast('Lỗi xóa tài khoản', 'error');
    }
  };

  const handleViewDetail = (item, type = 'room') => {
    setDetailItem(item);
    setDetailType(type);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="app-container">
      {/* Toast Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Navigation Bar - Rendered for Customer / Guest views */}
      {activeTab !== 'admin' && (
        <Navbar 
          activeTab={activeTab}
          setActiveTab={handleSelectTab}
          user={user}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          onOpenBooking={() => handleBookRoom(rooms[0])}
          onOpenProfile={() => setIsProfileModalOpen(true)}
        />
      )}

      {/* Main Tab Views */}
      <main className="main-content" style={{ paddingBottom: activeTab === 'admin' ? 0 : '60px' }}>
        {activeTab === 'home' && (
          <HomePage 
            rooms={rooms} 
            services={services} 
            reviews={reviews} 
            onBookRoom={handleBookRoom} 
            onSelectTab={handleSelectTab}
            user={user}
            onEditRoom={(rm) => { setSelectedRoomForEdit(rm); setIsRoomModalOpen(true); }}
            onEditService={(sv) => { setSelectedServiceForEdit(sv); setIsServiceModalOpen(true); }}
            onViewDetail={(item, type) => handleViewDetail(item, type)}
          />
        )}

        {activeTab === 'rooms' && (
          <RoomsPage 
            rooms={rooms} 
            onBookRoom={handleBookRoom}
            user={user}
            onEditRoom={(rm) => { setSelectedRoomForEdit(rm); setIsRoomModalOpen(true); }}
            onOpenAddRoom={() => { setSelectedRoomForEdit(null); setIsRoomModalOpen(true); }}
            onViewDetail={(rm) => handleViewDetail(rm, 'room')}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage 
            services={services} 
            onBookService={() => handleBookRoom(rooms[0])}
            user={user}
            onEditService={(sv) => { setSelectedServiceForEdit(sv); setIsServiceModalOpen(true); }}
            onOpenAddService={() => { setSelectedServiceForEdit(null); setIsServiceModalOpen(true); }}
            onViewDetail={(sv) => handleViewDetail(sv, 'service')}
          />
        )}

        {activeTab === 'pets' && (
          <MyPetsPage 
            pets={pets} 
            onOpenAddPet={() => { if (!requireAuth()) return; setIsPetModalOpen(true); }} 
            onDeletePet={handleDeletePet} 
            user={user}
            onGoToAdmin={() => setActiveTab('admin')}
          />
        )}

        {activeTab === 'bookings' && (
          <MyBookingsPage 
            bookings={bookings} 
            onCancelBooking={handleCancelBooking} 
            onOpenBooking={() => handleBookRoom(rooms[0])}
            user={user}
            onGoToAdmin={() => setActiveTab('admin')}
          />
        )}

        {activeTab === 'reviews' && (
          <ReviewsPage 
            reviews={reviews} 
            onSubmitReview={handleSubmitReview}
            onDeleteReview={handleDeleteReview} 
            user={user} 
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard 
            bookings={bookings} 
            rooms={rooms}
            services={services}
            pets={pets}
            usersList={usersList}
            reviews={reviews}
            user={user}
            onUpdateStatus={handleUpdateBookingStatus} 
            onRefreshData={fetchInitialData} 
            onDeleteReview={handleDeleteReview}
            onOpenAddRoom={() => { setSelectedRoomForEdit(null); setIsRoomModalOpen(true); }}
            onEditRoom={(rm) => { setSelectedRoomForEdit(rm); setIsRoomModalOpen(true); }}
            onDeleteRoom={handleDeleteRoom}
            onOpenAddService={() => { setSelectedServiceForEdit(null); setIsServiceModalOpen(true); }}
            onEditService={(sv) => { setSelectedServiceForEdit(sv); setIsServiceModalOpen(true); }}
            onDeleteService={handleDeleteService}
            onOpenAddUser={() => setIsUserModalOpen(true)}
            onDeleteUser={handleDeleteUser}
            onExitAdmin={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Floating Chatbox Widget for Customer support */}
      {activeTab !== 'admin' && <Chatbox user={user} onOpenBooking={() => handleBookRoom(rooms[0])} />}

      {/* Detail Modal (Full Uncropped Image View) */}
      <DetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => { setIsDetailModalOpen(false); setDetailItem(null); }}
        item={detailItem}
        type={detailType}
        user={user}
        onBook={(itm) => {
          setIsDetailModalOpen(false);
          handleBookRoom(itm);
        }}
        onEdit={(itm) => {
          setIsDetailModalOpen(false);
          if (detailType === 'room') {
            setSelectedRoomForEdit(itm);
            setIsRoomModalOpen(true);
          } else {
            setSelectedServiceForEdit(itm);
            setIsServiceModalOpen(true);
          }
        }}
      />

      {/* Customer Modals */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        rooms={rooms}
        services={services}
        pets={pets}
        user={user}
        preselectedRoom={selectedRoomForBooking}
        onSubmitBooking={handleSubmitBooking}
      />

      <PetModal 
        isOpen={isPetModalOpen}
        onClose={() => setIsPetModalOpen(false)}
        onAddPet={handleAddPet}
        userId={user ? user.id : 'u-customer1'}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Admin Modals */}
      <RoomModal 
        isOpen={isRoomModalOpen}
        onClose={() => { setIsRoomModalOpen(false); setSelectedRoomForEdit(null); }}
        room={selectedRoomForEdit}
        onSubmit={handleSaveRoom}
      />

      <ServiceModal 
        isOpen={isServiceModalOpen}
        onClose={() => { setIsServiceModalOpen(false); setSelectedServiceForEdit(null); }}
        service={selectedServiceForEdit}
        onSubmit={handleSaveService}
      />

      <UserModal 
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSubmit={handleCreateUser}
      />

      {/* Footer */}
      {activeTab !== 'admin' && <Footer />}
    </div>
  );
}
