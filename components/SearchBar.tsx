
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  category,
  onSearchChange,
  onCategoryChange,
  onSearch
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Tìm kiếm giáo sĩ..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
          />
        </div>
        <div className="w-full md:w-64">
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
          >
            <option value="all">Tất cả</option>
            <option value="tgm">TGM và ĐCV</option>
            <option value="parish">Giáo xứ</option>
          </select>
        </div>
        <button
          onClick={onSearch}
          className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-2 rounded-md transition-colors font-medium"
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
