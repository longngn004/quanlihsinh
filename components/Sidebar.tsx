import React from 'react';
import type { View } from '../types';
import { UserRole } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { ChartPieIcon, DocumentTextIcon, SparklesIcon, ScaleIcon, PresentationChartBarIcon, ShieldCheckIcon } from './ui/Icon';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const allNavItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: <ChartPieIcon />, roles: [UserRole.PRINCIPAL, UserRole.TEACHER, UserRole.COUNSELOR] },
    { id: 'analytics', label: 'Phân tích hệ thống', icon: <PresentationChartBarIcon />, roles: [UserRole.PRINCIPAL, UserRole.TEACHER, UserRole.COUNSELOR] },
    { id: 'ai-assistant', label: 'Trợ lý AI', icon: <SparklesIcon />, roles: [UserRole.PRINCIPAL, UserRole.COUNSELOR] },
    { id: 'plan', label: 'Kế hoạch nghiên cứu', icon: <DocumentTextIcon />, roles: [UserRole.PRINCIPAL, UserRole.TEACHER, UserRole.COUNSELOR] },
    { id: 'pros-cons', label: 'Ưu & Nhược điểm', icon: <ScaleIcon />, roles: [UserRole.PRINCIPAL, UserRole.TEACHER, UserRole.COUNSELOR] },
    { id: 'privacy', label: 'Bảo mật & Quyền riêng tư', icon: <ShieldCheckIcon />, roles: [UserRole.PRINCIPAL, UserRole.TEACHER, UserRole.COUNSELOR] },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const { user, logout } = useAuth();

  // This component is only rendered for staff, so user is guaranteed to be a staff member
  const currentUserRole = user?.role as Exclude<UserRole, UserRole.STUDENT>;

  const navItems = allNavItems.filter(item => item.roles.includes(currentUserRole));

  return (
    <div className="w-64 bg-white shadow-md flex-shrink-0 h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-primary-700">Trường Học Hạnh Phúc</h1>
            <div className="mt-4">
                {/* FIX: Use a type guard to safely access the name property on the user object, which can be either a 'User' or a 'Student'. */}
                <p className="text-sm font-semibold text-gray-800">{user && ('name' in user ? user.name : user.full_name)}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
        </div>
        <nav className="flex-1 p-2 space-y-1">
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id as View)}
                    className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        currentView === item.id
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                    <span className="w-6 h-6 mr-3">{item.icon}</span>
                    {item.label}
                </button>
            ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
            <button
                onClick={logout}
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
                Đăng xuất
            </button>
        </div>
    </div>
  );
};

export default Sidebar;