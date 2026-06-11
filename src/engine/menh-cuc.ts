// ============================================================
// MỆNH CỤC - 60 Nạp Âm & Xác định Cục
// ============================================================

import { ThienCan, DiaChi, CAN_INDEX, CHI_INDEX } from './can-chi';

// ============================================================
// 60 Nạp Âm
// ============================================================

const NAP_AM_TABLE: Record<string, string> = {
  'Giáp Tý': 'Hải Trung Kim', 'Ất Sửu': 'Hải Trung Kim',
  'Bính Dần': 'Lò Trung Hỏa',  'Đinh Mão': 'Lò Trung Hỏa',
  'Mậu Thìn': 'Đại Lâm Mộc',   'Kỷ Tỵ': 'Đại Lâm Mộc',
  'Canh Ngọ': 'Lộ Bàng Thổ',   'Tân Mùi': 'Lộ Bàng Thổ',
  'Nhâm Thân': 'Kiếm Phong Kim','Quý Dậu': 'Kiếm Phong Kim',
  'Giáp Tuất': 'Sơn Đầu Hỏa',  'Ất Hợi': 'Sơn Đầu Hỏa',
  'Bính Tý': 'Giản Hạ Thủy',   'Đinh Sửu': 'Giản Hạ Thủy',
  'Mậu Dần': 'Thành Đầu Thổ',  'Kỷ Mão': 'Thành Đầu Thổ',
  'Canh Thìn': 'Bạch Lạp Kim', 'Tân Tỵ': 'Bạch Lạp Kim',
  'Nhâm Ngọ': 'Dương Liễu Mộc','Quý Mùi': 'Dương Liễu Mộc',
  'Giáp Thân': 'Tuyền Trung Thủy','Ất Dậu': 'Tuyền Trung Thủy',
  'Bính Tuất': 'Ốc Thượng Thổ','Đinh Hợi': 'Ốc Thượng Thổ',
  'Mậu Tý': 'Tích Lịch Hỏa',   'Kỷ Sửu': 'Tích Lịch Hỏa',
  'Canh Dần': 'Tùng Bách Mộc', 'Tân Mão': 'Tùng Bách Mộc',
  'Nhâm Thìn': 'Trường Lưu Thủy','Quý Tỵ': 'Trường Lưu Thủy',
  'Giáp Ngọ': 'Sa Trung Kim',  'Ất Mùi': 'Sa Trung Kim',
  'Bính Thân': 'Sơn Hạ Hỏa',  'Đinh Dậu': 'Sơn Hạ Hỏa',
  'Mậu Tuất': 'Bình Địa Mộc',  'Kỷ Hợi': 'Bình Địa Mộc',
  'Canh Tý': 'Bích Thượng Thổ','Tân Sửu': 'Bích Thượng Thổ',
  'Nhâm Dần': 'Kim Bạc Kim',   'Quý Mão': 'Kim Bạc Kim',
  'Giáp Thìn': 'Phú Đăng Hỏa', 'Ất Tỵ': 'Phú Đăng Hỏa',
  'Bính Ngọ': 'Thiên Hà Thủy', 'Đinh Mùi': 'Thiên Hà Thủy',
  'Mậu Thân': 'Đại Dịch Thổ',  'Kỷ Dậu': 'Đại Dịch Thổ',
  'Canh Tuất': 'Thoa Xuyến Kim','Tân Hợi': 'Thoa Xuyến Kim',
  'Nhâm Tý': 'Tang Đố Mộc',   'Quý Sửu': 'Tang Đố Mộc',
  'Giáp Dần': 'Đại Khê Thủy',  'Ất Mão': 'Đại Khê Thủy',
  'Bính Thìn': 'Sa Trung Thổ', 'Đinh Tỵ': 'Sa Trung Thổ',
  'Mậu Ngọ': 'Thiên Thượng Hỏa','Kỷ Mùi': 'Thiên Thượng Hỏa',
  'Canh Thân': 'Thạch Lựu Mộc','Tân Dậu': 'Thạch Lựu Mộc',
  'Nhâm Tuất': 'Đại Hải Thủy', 'Quý Hợi': 'Đại Hải Thủy',
};

export function getMenh(canNam: ThienCan, chiNam: DiaChi): string {
  return NAP_AM_TABLE[`${canNam} ${chiNam}`] || 'Không xác định';
}

export function getNguHanhMenh(menh: string): string {
  if (menh.includes('Kim')) return 'Kim';
  if (menh.includes('Mộc')) return 'Mộc';
  if (menh.includes('Thủy')) return 'Thủy';
  if (menh.includes('Hỏa')) return 'Hỏa';
  if (menh.includes('Thổ')) return 'Thổ';
  return '';
}

// ============================================================
// Xác định Cục
// ============================================================

export interface CucInfo {
  loai: string;   // 'Thủy'|'Hỏa'|'Mộc'|'Kim'|'Thổ'
  so: number;     // 2|3|4|5|6
  ten: string;    // 'Thủy nhị cục' etc.
}

// Bảng cục: Can năm → nhóm (0-4), Cung mệnh → cột
// Nhóm Can: Giáp-Kỷ=0, Ất-Canh=1, Bính-Tân=2, Đinh-Nhâm=3, Mậu-Quý=4
// Cột cung: Tý-Sửu=0, Dần-Mão-Tuất-Hợi=1, Thìn-Tỵ=2, Ngọ-Mùi=3, Thân-Dậu=4

const CUC_TABLE: Array<Array<{loai:string,so:number}>> = [
  // Giáp-Kỷ
  [{loai:'Thủy',so:2},{loai:'Hỏa',so:6},{loai:'Mộc',so:3},{loai:'Thổ',so:5},{loai:'Kim',so:4}],
  // Ất-Canh
  [{loai:'Hỏa',so:6},{loai:'Thổ',so:5},{loai:'Kim',so:4},{loai:'Mộc',so:3},{loai:'Thủy',so:2}],
  // Bính-Tân
  [{loai:'Thổ',so:5},{loai:'Mộc',so:3},{loai:'Thủy',so:2},{loai:'Kim',so:4},{loai:'Hỏa',so:6}],
  // Đinh-Nhâm
  [{loai:'Mộc',so:3},{loai:'Kim',so:4},{loai:'Hỏa',so:6},{loai:'Thủy',so:2},{loai:'Thổ',so:5}],
  // Mậu-Quý
  [{loai:'Kim',so:4},{loai:'Thủy',so:2},{loai:'Thổ',so:5},{loai:'Hỏa',so:6},{loai:'Mộc',so:3}],
];

const CAN_NHOM: Record<string,number> = {
  'Giáp':0,'Kỷ':0,'Ất':1,'Canh':1,'Bính':2,'Tân':2,'Đinh':3,'Nhâm':3,'Mậu':4,'Quý':4
};

function getCungCol(cungMenh: DiaChi): number {
  const nhomA = ['Tý','Sửu'];
  const nhomB = ['Dần','Mão','Tuất','Hợi'];
  const nhomC = ['Thìn','Tỵ'];
  const nhomD = ['Ngọ','Mùi'];
  const nhomE = ['Thân','Dậu'];
  if (nhomA.includes(cungMenh)) return 0;
  if (nhomB.includes(cungMenh)) return 1;
  if (nhomC.includes(cungMenh)) return 2;
  if (nhomD.includes(cungMenh)) return 3;
  if (nhomE.includes(cungMenh)) return 4;
  return 0;
}

const TEN_CUC: Record<string,string> = {
  'Thủy2':'Thủy nhị cục','Hỏa6':'Hỏa lục cục',
  'Mộc3':'Mộc tam cục','Kim4':'Kim tứ cục','Thổ5':'Thổ ngũ cục'
};

export function getCuc(canNam: ThienCan, cungMenh: DiaChi): CucInfo {
  const nhom = CAN_NHOM[canNam] ?? 0;
  const col  = getCungCol(cungMenh);
  const c    = CUC_TABLE[nhom][col];
  return { ...c, ten: TEN_CUC[`${c.loai}${c.so}`] || `${c.loai} cục` };
}

// ============================================================
// Sao chủ cục, Mệnh chủ, Thân chủ
// ============================================================

export function getSaosChuCuc(cuc: CucInfo): string {
  const map: Record<string,string> = {
    'Thủy2':'Thiên Cơ','Mộc3':'Tử Vi','Kim4':'Vũ Khúc',
    'Thổ5':'Liêm Trinh','Hỏa6':'Liêm Trinh'
  };
  return map[`${cuc.loai}${cuc.so}`] || '';
}

// Mệnh chủ theo Chi năm
const MENH_CHU_TABLE: Record<DiaChi, string> = {
  'Tý':'Tham Lang','Sửu':'Cự Môn','Dần':'Lộc Tồn','Mão':'Văn Khúc',
  'Thìn':'Liêm Trinh','Tỵ':'Vũ Khúc','Ngọ':'Phá Quân','Mùi':'Vũ Khúc',
  'Thân':'Vũ Khúc','Dậu':'Văn Khúc','Tuất':'Liêm Trinh','Hợi':'Vũ Khúc'
};
// Bảng chính xác hơn theo sách Tử Vi Đẩu Số
const MENH_CHU_CORRECT: Record<string,string> = {
  'Tý':'Tham Lang','Sửu':'Cự Môn','Dần':'Lộc Tồn','Mão':'Văn Khúc',
  'Thìn':'Liêm Trinh','Tỵ':'Vũ Khúc','Ngọ':'Phá Quân','Mùi':'Vũ Khúc',
  'Thân':'Vũ Khúc','Dậu':'Văn Khúc','Tuất':'Liêm Trinh','Hợi':'Vũ Khúc'
};

export function getMenhChu(chiNam: DiaChi): string {
  return MENH_CHU_CORRECT[chiNam] || '';
}

// Thân chủ theo chi năm sinh
const THAN_CHU_TABLE: Record<DiaChi, string> = {
  'Tý':'Linh Tinh','Sửu':'Thiên Tướng','Dần':'Thiên Đồng',
  'Mão':'Văn Xương','Thìn':'Thiên Cơ','Tỵ':'Thiên Lương',
  'Ngọ':'Hỏa Tinh','Mùi':'Thiên Tướng','Thân':'Linh Tinh',
  'Dậu':'Thiên Đồng','Tuất':'Văn Xương','Hợi':'Thiên Cơ'
};

export function getThanChu(chiNam: DiaChi): string {
  return THAN_CHU_TABLE[chiNam] || '';
}

// ============================================================
// Âm Dương luận - Mệnh Cục bình/sinh/khắc
// ============================================================

export function getMenhCucQuan(nguHanhMenh: string, cucLoai: string): string {
  // Ngũ hành tương sinh: Kim→Thủy→Mộc→Hỏa→Thổ→Kim
  const sinh: Record<string,string> = {
    'Kim':'Thủy','Thủy':'Mộc','Mộc':'Hỏa','Hỏa':'Thổ','Thổ':'Kim'
  };
  const khac: Record<string,string> = {
    'Kim':'Mộc','Mộc':'Thổ','Thổ':'Thủy','Thủy':'Hỏa','Hỏa':'Kim'
  };
  if (nguHanhMenh === cucLoai) return 'Mệnh Cục bình hòa';
  if (sinh[cucLoai] === nguHanhMenh) return 'Mệnh sinh Cục';
  if (khac[cucLoai] === nguHanhMenh) return 'Mệnh khắc Cục';
  if (sinh[nguHanhMenh] === cucLoai) return 'Cục sinh Mệnh';
  if (khac[nguHanhMenh] === cucLoai) return 'Cục khắc Mệnh';
  return 'Bình hòa';
}
