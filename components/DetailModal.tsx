
import React from 'react';
import { Clergy } from '../types';

interface DetailModalProps {
  clergy: Clergy | null;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ clergy, onClose }) => {
  if (!clergy) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[110] p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#2E7D32] p-5 text-white flex justify-between items-center z-10">
          <div className="flex items-center space-x-3">
             <div className="bg-white text-[#2E7D32] p-1.5 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
             </div>
             <h2 className="text-xl font-bold uppercase tracking-wide">Chi Tiết Giáo Sĩ</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <div className="mb-8 border-b pb-6">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{clergy.name}</h3>
            <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-full text-sm font-semibold border border-[#2E7D32]/20">
              Ký hiệu: {clergy.code}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Ngày sinh</p>
              <p className="text-lg font-medium text-gray-800">{clergy.dateOfBirth || 'Chưa cập nhật'}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Quan thầy / Ngày lễ</p>
              <p className="text-lg font-medium text-gray-800">{clergy.patronSaint || 'Chưa cập nhật'}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Nơi mục vụ hiện tại</p>
              <p className="text-lg font-medium text-gray-800">{clergy.ministryLocation}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Sứ vụ</p>
              <p className="text-lg font-medium text-gray-800">{clergy.mission}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Ngày thụ phong</p>
              <p className="text-lg font-medium text-gray-800">{clergy.ordinationDate}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Thời gian</p>
              <p className="text-lg font-medium text-gray-800">{clergy.timePeriod}</p>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">Lịch sử mục vụ</p>
            {clergy.ministryHistory ? (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 italic text-gray-700 whitespace-pre-line leading-relaxed">
                {clergy.ministryHistory}
              </div>
            ) : (
              <p className="text-gray-400 italic">Chưa có thông tin lịch sử mục vụ.</p>
            )}
          </div>

          <div className="mt-10 flex justify-center">
             <button 
               onClick={onClose}
               className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-10 py-2.5 rounded-lg font-bold transition-colors"
             >
               Đóng cửa sổ
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
