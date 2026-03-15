import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiClient } from '@/lib/api'

interface User {
  id: string
  name: string
  email: string
  role: string
  avatarUrl?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setLoading: (v: boolean) => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      setLoading: (v) => set({ isLoading: v }),
      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const { data } = await apiClient.post('/auth/login', { email, password })
          if (typeof window !== 'undefined') localStorage.setItem('bt_token', data.token)
          set({ user: data.user, token: data.token, isLoading: false })
        } catch (err) {
          set({ isLoading: false })
          throw err
        }
      },
      logout: () => {
        if (typeof window !== 'undefined') localStorage.removeItem('bt_token')
        set({ user: null, token: null })
        if (typeof window !== 'undefined') window.location.href = '/admin/login'
      },
    }),
    {
      name: 'bt_auth',
      partialize: (s) => ({ user: s.user, token: s.token }),
    }
  )
)
