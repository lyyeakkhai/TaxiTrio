export const API_ENDPOINTS = {
  AUTH: {
    ME: "/api/auth/me",
    USERS: "/api/users",
  },
  DRIVER: {
    PROFILE: "/api/driver/profile",
    AVAILABILITY: "/api/driver/availability",
    EARNINGS: "/api/driver/earnings",
    REVIEWS: "/api/driver/reviews",
    BOOKINGS: {
      LIST: "/api/driver/bookings",
      DETAIL: (id: string) => `/api/driver/bookings/${id}`,
      ACTION: (id: string, action: string) => `/api/driver/bookings/${id}/${action}`,
    },
    TELEGRAM: {
      GENERATE_CODE: "/api/driver/telegram/generate-code",
    }
  },
  BOOKINGS: {
    LIST: "/api/bookings",
    CREATE: "/api/bookings",
    MY: "/api/bookings/my",
    DETAIL: (id: string) => `/api/bookings/${id}`,
    CANCEL: (id: string) => `/api/bookings/${id}/cancel`,
  },
  COMPLAINTS: {
    MY: "/api/complaints/my",
    CREATE: "/api/complaints",
    DETAIL: (id: string) => `/api/complaints/${id}`,
  },
  NOTIFICATIONS: {
    LIST: "/api/notifications",
    READ: (id: string) => `/api/notifications/${id}/read`,
    READ_ALL: "/api/notifications/read-all",
  },
  REVIEWS: {
    CREATE: "/api/reviews",
  },
  ROUTES: {
    LIST: "/api/routes",
    DETAIL: (id: string) => `/api/routes/${id}`,
  },
  TAXIS: {
    LIST: "/api/taxis",
    DETAIL: (id: string) => `/api/taxis/${id}`,
  },
  TOURS: {
    LIST: "/api/tours",
    DETAIL: (id: string) => `/api/tours/${id}`,
  },
  ASSISTANCE: {
    LIST: "/api/assistance",
    DETAIL: (id: string) => `/api/assistance/${id}`,
  },
  PAYMENTS: {
    DETAIL: (bookingId: string) => `/api/payments/booking/${bookingId}`,
    INITIATE: (bookingId: string) => `/api/payments/booking/${bookingId}/initiate`,
    UPLOAD_PROOF: (bookingId: string) => `/api/payments/${bookingId}/upload-proof`,
  },
  TELEGRAM: {
    WEBHOOK: "/api/telegram/webhook",
  },
  WEBHOOKS: {
    CLERK_BILLING: "/api/webhooks/clerk/billing",
  },
  ADMIN: {
    BOOKINGS: {
      LIST: "/api/admin/bookings",
      DETAIL: (id: string) => `/api/admin/bookings/${id}`,
      ASSIGN: (id: string) => `/api/admin/bookings/${id}/assign`,
      CANCEL: (id: string) => `/api/admin/bookings/${id}/cancel`,
    },
    DRIVERS: {
      LIST: "/api/admin/drivers",
      DETAIL: (id: string) => `/api/admin/drivers/${id}`,
      APPROVE: (id: string) => `/api/admin/drivers/${id}/approve`,
      REJECT: (id: string) => `/api/admin/drivers/${id}/reject`,
    },
    PAYMENTS: {
      LIST: "/api/admin/payments",
      DETAIL: (id: string) => `/api/admin/payments/${id}`,
    },
    REVIEWS: {
      LIST: "/api/admin/reviews",
      DETAIL: (id: string) => `/api/admin/reviews/${id}`,
    },
    COMPLAINTS: {
      LIST: "/api/admin/complaints",
      DETAIL: (id: string) => `/api/admin/complaints/${id}`,
      REPLY: (id: string) => `/api/admin/complaints/${id}/reply`,
      RESOLVE: (id: string) => `/api/admin/complaints/${id}/resolve`,
    },
    ROUTES: {
      LIST: "/api/admin/routes",
      DETAIL: (id: string) => `/api/admin/routes/${id}`,
      TOGGLE: (id: string) => `/api/admin/routes/${id}/toggle`,
    },
    TOURS: {
      LIST: "/api/admin/tours",
      DETAIL: (id: string) => `/api/admin/tours/${id}`,
      TOGGLE: (id: string) => `/api/admin/tours/${id}/toggle`,
    },
    TAXIS: {
      LIST: "/api/admin/taxis",
      DETAIL: (id: string) => `/api/admin/taxis/${id}`,
      TOGGLE: (id: string) => `/api/admin/taxis/${id}/toggle`,
    },
    ASSISTANCE: {
      LIST: "/api/admin/assistance",
      DETAIL: (id: string) => `/api/admin/assistance/${id}`,
      TOGGLE: (id: string) => `/api/admin/assistance/${id}/toggle`,
    }
  }
} as const;
