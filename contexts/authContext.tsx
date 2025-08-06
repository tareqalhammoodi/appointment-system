'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  verificationId: string;
  setVerificationId: (id: string) => void;
  clearVerification: () => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  verificationId: '',
  setVerificationId: () => {},
  clearVerification: () => {},
  phoneNumber: '',
  setPhoneNumber: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [verificationId, setVerificationIdState] = useState<string>('');
  const [phoneNumber, setPhoneNumberState] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const setVerificationId = (id: string) => setVerificationIdState(id);
  const clearVerification = () => {
    setVerificationIdState('');
    setPhoneNumberState('');
  };
  const setPhoneNumber = (phone: string) => setPhoneNumberState(phone);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    verificationId,
    setVerificationId,
    clearVerification,
    phoneNumber,
    setPhoneNumber,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 