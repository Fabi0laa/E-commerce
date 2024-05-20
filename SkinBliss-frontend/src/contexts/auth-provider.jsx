import { useGetUserQuery } from '@/redux/features/auth/authApi';
import { createContext } from 'react';

export const AuthContext = createContext({
  user: null,
  isLoading: true,
});

export function AuthProvider({ children }) {
  const { data: user, isLoading, error } = useGetUserQuery();

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
}
