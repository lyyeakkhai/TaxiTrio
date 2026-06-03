import axios from 'axios';
import { auth } from '@clerk/nextjs/server';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

// For Server Components and Server Actions
api.interceptors.request.use(async (config) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    // We might be on the client side where `auth()` from @clerk/nextjs/server throws an error.
    // For client-side, we should pass the token explicitly or use a client-side interceptor hook.
  }
  return config;
});
