
import { Clergy } from './types';

export const INITIAL_DATA: Clergy[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    accountLink: 'https://example.com/a',
    ministryLocation: 'Tòa Giám Mục',
    mission: 'Linh mục Chánh văn phòng',
    ordinationDate: '2010-06-25',
    timePeriod: '2010 - Nay',
    code: 'AOS-001',
    dateOfBirth: '1985-01-01',
    patronSaint: 'Thánh Phêrô (29/06)',
    ministryHistory: '2010 - 2012: Phó xứ Nhà Thờ Lớn\n2012 - 2015: Du học Roma\n2015 - Nay: Chánh văn phòng TGM'
  },
  {
    id: '2',
    name: 'Trần Văn B',
    accountLink: 'https://example.com/b',
    ministryLocation: 'Đại Chủng Viện',
    mission: 'Giáo thọ',
    ordinationDate: '2005-05-12',
    timePeriod: '2005 - Nay',
    code: 'AOS-002',
    dateOfBirth: '1975-05-20',
    patronSaint: 'Thánh Giuse (19/03)',
    ministryHistory: '2005 - 2010: Phụ tá Giáo xứ X\n2010 - Nay: Giáo sư tại Đại Chủng Viện'
  },
  {
    id: '3',
    name: 'Phạm Văn C',
    accountLink: 'https://example.com/c',
    ministryLocation: 'Giáo xứ Chính Tòa',
    mission: 'Linh mục Quản xứ',
    ordinationDate: '2015-08-15',
    timePeriod: '2015 - Nay',
    code: 'AOS-003',
    dateOfBirth: '1990-12-12',
    patronSaint: 'Thánh Gioan Baotixita (24/06)',
    ministryHistory: '2015 - 2018: Phó xứ Y\n2018 - Nay: Quản xứ Chính Tòa'
  }
];

export const AUTH_CREDENTIALS = {
  username: 'AOS221',
  password: 'JHS221'
};

export const STORAGE_KEY = 'aos_clergy_data';
