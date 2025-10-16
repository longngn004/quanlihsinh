import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.TEACHER);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!id || !password) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      setIsLoading(false);
      return;
    }
    
    const result = await login(selectedRole, id, password);
    
    if (!result.success) {
      setError(result.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
    }
    // On success, the App component will automatically re-render, so no need for an else block.
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-700">Trường Học Hạnh Phúc</h1>
          <p className="mt-2 text-gray-500">Chào mừng bạn đến với Bảng điều khiển dự án</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Chọn vai trò của bạn
            </label>
            <div className="mt-1">
              <select
                id="role"
                name="role"
                value={selectedRole}
                onChange={(e) => {
                    setSelectedRole(e.target.value as UserRole);
                    setError('');
                }}
                className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value={UserRole.STUDENT}>Học sinh</option>
                <option value={UserRole.TEACHER}>Giáo viên chủ nhiệm</option>
                <option value={UserRole.COUNSELOR}>Giáo viên tâm lý</option>
                <option value={UserRole.PRINCIPAL}>Hiệu trưởng</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="user-id" className="block text-sm font-medium text-gray-700">
              Tài khoản / ID
            </label>
            <input
              type="text"
              id="user-id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder={selectedRole === UserRole.STUDENT ? "Ví dụ: HS001" : "Nhập tài khoản của bạn"}
              required
            />
          </div>
          <div>
            <label htmlFor="password" aria-label="Mật khẩu" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </div>
           <div className="text-center">
              <button
                  type="button"
                  onClick={() => alert('Vui lòng liên hệ Giáo viên Chủ nhiệm để được cấp lại mật khẩu.')}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                  Quên mật khẩu?
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
