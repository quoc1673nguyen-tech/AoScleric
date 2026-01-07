
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ClergyTable from './components/ClergyTable';
import LoginModal from './components/LoginModal';
import ClergyFormModal from './components/ClergyFormModal';
import DetailModal from './components/DetailModal';
import { Clergy } from './types';
import { INITIAL_DATA, STORAGE_KEY } from './constants';

const App: React.FC = () => {
  // Data state
  const [clergyList, setClergyList] = useState<Clergy[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [filteredList, setFilteredList] = useState<Clergy[]>([]);

  // UI Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isClergyModalOpen, setIsClergyModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Clergy | null>(null);
  const [selectedClergyForDetail, setSelectedClergyForDetail] = useState<Clergy | null>(null);

  // Initial load
  useEffect(() => {
    // 1. Load Clergy Data
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as Clergy[];
        setClergyList(parsed);
      } catch (e) {
        setClergyList(INITIAL_DATA);
      }
    } else {
      setClergyList(INITIAL_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    }

    // 2. Load Auth State from localStorage (Hard Logout fix requirement)
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Filter logic
  useEffect(() => {
    let result = clergyList;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.ministryLocation.toLowerCase().includes(term) ||
        item.mission.toLowerCase().includes(term) ||
        item.code.toLowerCase().includes(term)
      );
    }

    if (category !== 'all') {
      if (category === 'tgm') {
        result = result.filter(item => 
          item.ministryLocation.toLowerCase().includes('tòa giám mục') || 
          item.ministryLocation.toLowerCase().includes('đại chủng viện')
        );
      } else if (category === 'parish') {
        result = result.filter(item => 
          item.ministryLocation.toLowerCase().includes('giáo xứ')
        );
      }
    }

    setFilteredList(result);
  }, [clergyList, searchTerm, category]);

  const handleLoginSuccess = () => {
    // Set state and persist to localStorage
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  /**
   * CRITICAL FIX - HARD LOGOUT LOGIC
   * 1. Remove the login flag from localStorage
   * 2. Immediately reload the window to reset all script states to "Public Mode"
   */
  const handleLogout = () => {
    if (confirm('Bạn muốn đăng xuất khỏi hệ thống quản trị?')) {
      localStorage.removeItem('isLoggedIn');
      window.location.reload(); // Guaranteed UI refresh
    }
  };

  const handleSaveClergy = (data: Omit<Clergy, 'id'> & { id?: string }) => {
    let newList;
    if (data.id) {
      newList = clergyList.map(item => item.id === data.id ? { ...data, id: data.id! } : item);
    } else {
      const newItem: Clergy = {
        ...data,
        id: Date.now().toString()
      };
      newList = [newItem, ...clergyList];
    }
    
    setClergyList(newList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    setEditingItem(null);
  };

  const handleDeleteClergy = (id: string) => {
    const newList = clergyList.filter(item => item.id !== id);
    setClergyList(newList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  };

  const handleEditClick = (item: Clergy) => {
    setEditingItem(item);
    setIsClergyModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        isLoggedIn={isLoggedIn} 
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 border-l-4 border-[#2E7D32] pl-4">
              DANH SÁCH GIÁO SĨ
            </h2>
            <p className="text-gray-500 mt-1 ml-5">Quản lý và tra cứu thông tin giáo sĩ AoS</p>
          </div>
          {isLoggedIn && (
            <button
              onClick={() => {
                setEditingItem(null);
                setIsClergyModalOpen(true);
              }}
              className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-6 py-3 rounded-lg font-bold flex items-center shadow-lg transform active:scale-95 transition-all mt-4 md:mt-0"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
              </svg>
              THÊM GIÁO SĨ MỚI
            </button>
          )}
        </div>

        <SearchBar
          searchTerm={searchTerm}
          category={category}
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategory}
          onSearch={() => {}} 
        />

        <div className="mt-4 mb-2 text-sm text-gray-500 font-medium italic">
          * Nhấn vào bất kỳ hàng nào để xem chi tiết lý lịch giáo sĩ.
        </div>

        <ClergyTable
          data={filteredList}
          isAdmin={isLoggedIn}
          onEdit={handleEditClick}
          onDelete={handleDeleteClergy}
          onViewDetail={(item) => setSelectedClergyForDetail(item)}
        />
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 font-bold uppercase tracking-widest text-sm mb-2">Hệ thống Quản lý Giáo sĩ AoS</p>
          <p className="text-gray-400 text-xs">© 2026. AoSTech.</p>
        </div>
      </footer>

      {/* MODALS */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ClergyFormModal
        isOpen={isClergyModalOpen}
        onClose={() => {
          setIsClergyModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveClergy}
        editingItem={editingItem}
      />

      <DetailModal 
        clergy={selectedClergyForDetail}
        onClose={() => setSelectedClergyForDetail(null)}
      />
    </div>
  );
};

export default App;
