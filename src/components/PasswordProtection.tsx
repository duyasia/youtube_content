import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

interface PasswordProtectionProps {
  children: React.ReactNode;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const authenticated = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authenticated);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const correctPassword = import.meta.env.VITE_PASSWORD || '1991';
    
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setError('');
    } else {
      setError('Mật khẩu không đúng');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="bg-[#111111] rounded-lg border border-[#222222] p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-500/10 p-3 rounded-full">
            <Lock className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-white mb-2">
          ĐÂY LÀ BẢN BETA
        </h1>
        
        <p className="text-center text-gray-400 mb-6">
          Vui lòng nhập mật khẩu để tiếp tục
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="block w-full px-4 py-3 rounded-md bg-[#1A1A1A] border border-[#333333] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500/10 text-blue-500 border border-blue-500/20 py-3 rounded-md hover:bg-blue-500/20 transition-all duration-200 font-medium"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtection;