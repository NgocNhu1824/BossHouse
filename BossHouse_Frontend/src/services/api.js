const API_BASE_URL = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('bosshouse_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  // Authentication
  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  getProfile: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Rooms & Services
  getRooms: async (category = 'all') => {
    const res = await fetch(`${API_BASE_URL}/rooms?category=${category}`);
    return res.json();
  },

  getServices: async (category = 'all') => {
    const res = await fetch(`${API_BASE_URL}/services?category=${category}`);
    return res.json();
  },

  // Pets
  getPets: async (userId) => {
    const res = await fetch(`${API_BASE_URL}/pets?userId=${userId || ''}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  addPet: async (petData) => {
    const res = await fetch(`${API_BASE_URL}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(petData)
    });
    return res.json();
  },

  deletePet: async (id) => {
    const res = await fetch(`${API_BASE_URL}/pets/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Bookings
  getBookings: async (userId) => {
    const query = userId ? `?userId=${userId}` : '';
    const res = await fetch(`${API_BASE_URL}/bookings${query}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  createBooking: async (bookingData) => {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(bookingData)
    });
    return res.json();
  },

  cancelBooking: async (id) => {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}/cancel`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  updateBookingStatus: async (id, status) => {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  // Reviews
  getReviews: async () => {
    const res = await fetch(`${API_BASE_URL}/reviews`);
    return res.json();
  },

  createReview: async (reviewData) => {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(reviewData)
    });
    return res.json();
  },

  // Admin Stats
  getAdminStats: async () => {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: getAuthHeaders()
    });
    return res.json();
  }
};
