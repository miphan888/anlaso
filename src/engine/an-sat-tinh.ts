// ============================================================
// AN SÁT TINH - Lục Sát: Kình Dương, Đà La, Hỏa Tinh, Linh Tinh,
//               Địa Không, Địa Kiếp
// ============================================================

import { DiaChi, DIA_CHI, ThienCan, CHI_INDEX, addChi } from './can-chi';

function chi(s: string): DiaChi { return s as DiaChi; }

// ============================================================
// Lộc Tồn theo Can năm (dùng cho Kình/Đà)
// ============================================================
const LOC_TON_TABLE: Record<ThienCan, DiaChi> = {
  'Giáp':'Dần','Ất':'Mão','Bính':'Tỵ','Đinh':'Ngọ',
  'Mậu':'Tỵ','Kỷ':'Ngọ','Canh':'Thân','Tân':'Dậu',
  'Nhâm':'Hợi','Quý':'Tý'
};

/**
 * Kình Dương: cung trước Lộc Tồn (thuận)
 */
export function anKinhDuong(canNam: ThienCan): DiaChi {
  const locIdx = CHI_INDEX[LOC_TON_TABLE[canNam]];
  return DIA_CHI[(locIdx + 1) % 12]; // cung sau Lộc Tồn 1 bước = Kình Dương
  // Sách nói: Kình Dương = trước Lộc Tồn (nhưng chiều thuận từ Lộc Tồn = +1)
  // Thực ra Kình Dương ở CHI NGAY SAU Lộc Tồn theo chiều thuận
}

/**
 * Đà La: cung sau Lộc Tồn (nghịch = trước 1 cung)
 */
export function anDaLa(canNam: ThienCan): DiaChi {
  const locIdx = CHI_INDEX[LOC_TON_TABLE[canNam]];
  return DIA_CHI[(locIdx - 1 + 12) % 12]; // cung trước Lộc Tồn 1 bước = Đà La
}

// ============================================================
// Hỏa Tinh: khởi cung theo chi năm, đếm theo giờ sinh
// ============================================================

// Điểm khởi của Hỏa Tinh theo nhóm chi năm
// Dương nam/Âm nữ: thuận; Âm nam/Dương nữ: nghịch (đây là chiều đếm theo giờ)
// Điểm khởi:
//   Dần-Ngọ-Tuất: Sửu | Thân-Tý-Thìn: Dần | Tỵ-Dậu-Sửu: Mão | Hợi-Mão-Mùi: Dần
const HOA_TINH_START: Record<string, DiaChi> = {
  'Dần':'Sửu','Ngọ':'Sửu','Tuất':'Sửu',
  'Thân':'Dần','Tý':'Dần','Thìn':'Dần',
  'Tỵ':'Mão','Dậu':'Mão','Sửu':'Mão',
  'Hợi':'Dần','Mão':'Dần','Mùi':'Dần'
};

/**
 * Hỏa Tinh: khởi từ bảng trên, đếm THUẬN theo giờ sinh
 * (Dương nam / Âm nữ: thuận; Âm nam / Dương nữ: nghịch)
 * Tham số isThuanCung: true=thuận, false=nghịch
 */
export function anHoaTinh(chiNam: DiaChi, gioIdx: number, isThuan: boolean): DiaChi {
  const startIdx = CHI_INDEX[HOA_TINH_START[chiNam] || 'Dần'];
  if (isThuan) {
    return DIA_CHI[(startIdx + gioIdx) % 12];
  } else {
    return DIA_CHI[((startIdx - gioIdx) % 12 + 12) % 12];
  }
}

// ============================================================
// Linh Tinh: khởi cung theo chi năm, đếm theo giờ sinh (ngược lại Hỏa)
// ============================================================

const LINH_TINH_START: Record<string, DiaChi> = {
  'Dần':'Mão','Ngọ':'Mão','Tuất':'Mão',
  'Thân':'Tuất','Tý':'Tuất','Thìn':'Tuất',
  'Tỵ':'Tuất','Dậu':'Tuất','Sửu':'Tuất',
  'Hợi':'Tuất','Mão':'Tuất','Mùi':'Tuất'
};

/**
 * Linh Tinh: Dương nam/Âm nữ đi NGHỊCH theo giờ; Âm nam/Dương nữ THUẬN
 */
export function anLinhTinh(chiNam: DiaChi, gioIdx: number, isThuan: boolean): DiaChi {
  const startIdx = CHI_INDEX[LINH_TINH_START[chiNam] || 'Tuất'];
  // Linh Tinh đi ngược lại Hỏa Tinh
  if (isThuan) {
    // Dương nam/Âm nữ: Linh Tinh nghịch
    return DIA_CHI[((startIdx - gioIdx) % 12 + 12) % 12];
  } else {
    // Âm nam/Dương nữ: Linh Tinh thuận
    return DIA_CHI[(startIdx + gioIdx) % 12];
  }
}

// ============================================================
// Địa Kiếp và Địa Không: khởi từ Hợi theo giờ sinh
// ============================================================

/**
 * Địa Kiếp: Hợi thuận theo giờ
 */
export function anDiaKiep(gioIdx: number): DiaChi {
  const hoiIdx = CHI_INDEX['Hợi'];
  return DIA_CHI[(hoiIdx + gioIdx) % 12];
}

/**
 * Địa Không: Hợi nghịch theo giờ
 */
export function anDiaKhong(gioIdx: number): DiaChi {
  const hoiIdx = CHI_INDEX['Hợi'];
  return DIA_CHI[((hoiIdx - gioIdx) % 12 + 12) % 12];
}

// ============================================================
// Helper: chỉ số giờ từ giờ sinh
// ============================================================
export function getGioIndex(gio: number, phut: number): number {
  const totalMin = gio * 60 + phut;
  if (totalMin >= 23 * 60 || totalMin < 1 * 60) return 0; // Tý
  return Math.floor((totalMin - 60) / 120) + 1;
}

// ============================================================
// Mức độ sát tinh
// ============================================================
export function getMucDoKinhDuong(chi: DiaChi): 'M'|'H' {
  // Kình Dương miếu ở Dần, Thân (Mão, Dậu); hãm còn lại
  const mieu: DiaChi[] = ['Dần','Thân','Tý','Ngọ'];
  return mieu.includes(chi) ? 'M' : 'H';
}

export function getMucDoDaLa(chi: DiaChi): 'M'|'H' {
  const mieu: DiaChi[] = ['Thìn','Tuất','Sửu','Mùi'];
  return mieu.includes(chi) ? 'M' : 'H';
}

export function getMucDoHoaTinh(chi: DiaChi): 'M'|'H' {
  const mieu: DiaChi[] = ['Dần','Tỵ'];
  return mieu.includes(chi) ? 'M' : 'H';
}

export function getMucDoLinhTinh(chi: DiaChi): 'M'|'H' {
  const mieu: DiaChi[] = ['Tuất'];
  return mieu.includes(chi) ? 'M' : 'H';
}
