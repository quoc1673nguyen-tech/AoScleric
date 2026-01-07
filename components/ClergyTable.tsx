
import React from 'react';
import { Clergy } from '../types';

interface ClergyTableProps {
  data: Clergy[];
  isAdmin: boolean;
  onEdit: (item: Clergy) => void;
  onDelete: (id: string) => void;
  onViewDetail: (item: Clergy) => void;
}

const ClergyTable: React.FC<ClergyTableProps> = ({ data, isAdmin, onEdit, onDelete, onViewDetail }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">STT</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Profile</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Họ Tên</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nơi Mục Vụ</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sứ Vụ</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ngày Thụ Phong</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Thời Gian</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ký Hiệu</th>
            {isAdmin && (
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Hành Động</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr 
                key={item.id} 
                className="hover:bg-[#F1F8E9] cursor-pointer transition-colors group"
                onClick={() => onViewDetail(item)}
              >
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <a 
                    href={item.accountLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Xem Profile
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 group-hover:text-[#2E7D32]">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.ministryLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.mission}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{item.ordinationDate}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{item.timePeriod}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{item.code}</td>
                {isAdmin && (
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex justify-center space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onEdit(item)}
                        className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded transition-colors text-xs font-bold"
                      >
                        SỬA
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Bạn có chắc muốn xóa giáo sĩ ${item.name}?`)) {
                            onDelete(item.id);
                          }
                        }}
                        className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded transition-colors text-xs font-bold"
                      >
                        XÓA
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={isAdmin ? 9 : 8} className="px-6 py-10 text-center text-gray-500 italic">
                Không tìm thấy dữ liệu giáo sĩ nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClergyTable;
