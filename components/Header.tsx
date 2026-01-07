import React from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginClick, onLogout }) => {
  return (
    <header className="bg-[#2E7D32] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          
          {/* --- BẮT ĐẦU KHỐI LOGO MỚI (CHỈNH SỬA KÍCH THƯỚC) --- */}
          <div className="bg-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden shadow-sm">
            <img 
              src="https://i.postimg.cc/xChDWCx2/logoaos.png" 
              alt="Logo AoS" 
              className="w-full h-full object-contain" 
            />
          </div>
          {/* --- KẾT THÚC KHỐI LOGO MỚI --- */}

          <h1 className="text-xl md:text-2xl font-bold tracking-wider">
            THÔNG TIN GIÁO SĨ AOS
          </h1>
        </div>
        
        <div>
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors font-medium shadow-sm"
            >
              Đăng xuất
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-white text-[#2E7D32] hover:bg-gray-100 px-6 py-2 rounded-md transition-colors font-semibold shadow-sm"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;