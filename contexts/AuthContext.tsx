import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User, Student } from '../types';
import { UserRole } from '../types';
import { students, teachers, counselors, principal } from '../constants';

interface AuthContextType {
  user: User | Student | null;
  login: (role: UserRole, id: string, password: string) => Promise<{success: boolean, message?: string}>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | Student | null>(null);

  const login = async (role: UserRole, id: string, password: string): Promise<{success: boolean, message?: string}> => {
    const lowerCaseId = id.toLowerCase();

    if (role === UserRole.STUDENT) {
      const studentUser = students.find(
        (s) => s.student_code.toLowerCase() === lowerCaseId && s.password === password
      );
      if (studentUser) {
        setUser(studentUser);
        return { success: true };
      }
      return { success: false, message: 'Mã số học sinh hoặc mật khẩu không đúng.' };
    }
    
    if (role === UserRole.PRINCIPAL) {
        if (principal.id.toLowerCase() === lowerCaseId && principal.password === password) {
            setUser(principal);
            return { success: true };
        }
    }

    if (role === UserRole.TEACHER) {
        const staffUser = teachers.find(u => u.id.toLowerCase() === lowerCaseId && u.password === password);
        if (staffUser) {
            setUser(staffUser);
            return { success: true };
        }
    }
    
    if (role === UserRole.COUNSELOR) {
        const staffUser = counselors.find(u => u.id.toLowerCase() === lowerCaseId && u.password === password);
        if (staffUser) {
            setUser(staffUser);
            return { success: true };
        }
    }

    return { success: false, message: 'Tài khoản hoặc mật khẩu không chính xác.' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
