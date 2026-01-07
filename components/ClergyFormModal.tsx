
import React, { useState, useEffect } from 'react';
import { Clergy } from '../types';

interface ClergyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Clergy, 'id'> & { id?: string }) => void;
  editingItem: Clergy | null;
}

const ClergyFormModal: React.FC<ClergyFormModalProps> = ({ isOpen, onClose, onSave, editingItem }) => {
  const [formData, setFormData] = useState<Omit<Clergy, 'id'>>({
    name: '',
    accountLink: '',
    ministryLocation: '',
    mission: '',
    ordinationDate: '',
    timePeriod: '',
    code: '',
    dateOfBirth: '',
    patronSaint: '',
    ministryHistory: ''
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        accountLink: editingItem.accountLink,
        ministryLocation: editingItem.ministryLocation,
        mission: editingItem.mission,
        ordinationDate: editingItem.ordinationDate,
        timePeriod: editingItem.timePeriod,
        code: editingItem.code,
        dateOfBirth: editingItem.dateOfBirth || '',
        patronSaint: editingItem.patronSaint || '',
        ministryHistory: editingItem.ministryHistory || ''
      });
    } else {
      setFormData({
        name: '',
        accountLink: '',
        ministryLocation: '',
        mission: '',
        ordinationDate: '',
        timePeriod: '',
        code: '',
        dateOfBirth: '',
        patronSaint: '',
        ministryHistory: ''
      });
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: editingItem?.id });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[110] p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl overflow-hidden max-h-[95vh] flex flex-col">
        <div className="bg-[#2E7D32] p-4 text-white flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-bold">{editingItem ? 'Cập Nhật Thông Tin' : 'Thêm Giáo Sĩ Mới'}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700">Họ và Tên *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#2E7D32] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">Ngày sinh</label>
                <input
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#2E7D32] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">Quan Thầy / Ngày lễ</label>
                <input
                  name="patronSaint"
                  placeholder="VD: Thánh Phêrô (29/06)"
                  value={formData.patronSaint}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#2E7D32] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">Link Tài Khoản</label>
                <input
                  name="accountLink"
                  value={formData.accountLink}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#2E7D32] outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700">Nơi Mục Vụ</label>
                <input
                  name="ministryLocation"
                  value={formData.ministryLocation}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#2E7D32] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">Sứ Vụ</label>
                <input
                  name="mission"
                  value={formData.mission}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#2E7D32] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-bold text-gray-700">Ngày Chức</label>
                  <input
                    name="ordinationDate"
                    type="date"
                    value={formData.ordinationDate}
                    onChange={handleChange}
                    className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#2E7D32] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700">Ký Hiệu</label>
                  <input
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#2E7D32] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">Thời Gian</label>
                <input
                  name="timePeriod"
                  placeholder="VD: 2010 - Nay"
                  value={formData.timePeriod}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#2E7D32] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-bold text-gray-700">Lịch sử mục vụ (Nhập từng dòng mốc thời gian)</label>
            <textarea
              name="ministryHistory"
              rows={4}
              value={formData.ministryHistory}
              onChange={handleChange}
              placeholder="VD:&#10;2010 - 2012: Phó xứ A&#10;2012 - Nay: Quản xứ B"
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#2E7D32] outline-none resize-none font-mono text-sm"
            />
          </div>

          <div className="mt-8 flex justify-end space-x-3 sticky bottom-0 bg-white py-2 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-[#2E7D32] text-white rounded-md hover:bg-[#1B5E20] font-bold shadow-md transition-all"
            >
              {editingItem ? 'CẬP NHẬT' : 'THÊM MỚI'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClergyFormModal;
