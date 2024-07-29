import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isLoggingOut: false,
    isCheckingAuth: true,
    isLogginIn: false,
    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post('/api/v1/auth/signup', credentials);
            set({ user: response.data.user, isSigningUp: false });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed");
            set({ user: null, isSigningUp: false });
        }
    },
    login: async (credentials) => {
        set({ isLogginIn: true });
        try {
            const response = await axios.post('/api/v1/auth/login', credentials);
            set({ user: response.data.user, isLogginIn: false });
        } catch (error) {
            toast.error(error.response.data.message || "Login failed");
            set({ user: null, isLogginIn: false });
        }
    },
    logout: async () => {
        try {
            set({ isLoggingOut: true });
            await axios.post("/api/v1/auth/logout");
            set({ user: null, isLoggingOut: false });
        } catch (error) {
            set({ isLoggingOut: false });
            toast.error(error.response.data.message || "Logout failed");
        }
    },
    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get('/api/v1/auth/auth-check');
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            console.log(error.message);
            set({ user: null, isCheckingAuth: false });
        }
    }
}))