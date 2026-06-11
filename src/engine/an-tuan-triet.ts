// ============================================================
// AN TUẦN & TRIỆT
// ============================================================

import { DiaChi, ThienCan, DIA_CHI, CHI_INDEX } from './can-chi';

// ============================================================
// Bảng Tuần (dựa theo Can-Chi ngày)
// Giáp Tý→Quý Dậu: Tuần Tuất-Hợi
// Giáp Tuất→Quý Mùi: Tuần Thân-Dậu
// etc.
// ============================================================

const TUAN_TABLE: Record<string, DiaChi[]> = {
  'Giáp Tý':  ['Tuất','Hợi'],
  'Giáp Tuất':['Thân','Dậu'],
  'Giáp Thân':['Ngọ','Mùi'],
  'Giáp Ngọ': ['Thìn','Tỵ'],
  'Giáp Thìn':['Dần','Mão'],
  'Giáp Dần': ['Tý','Sửu'],
};

/**
 * Xác định Tuần dựa trên Can-Chi ngày
 */
export function getTuan(canNgay: ThienCan, chiNgay: DiaChi): DiaChi[] {
  // Tìm điểm Giáp đầu chu kỳ
  const canIdx = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'].indexOf(canNgay);
  const chiIdx = CHI_INDEX[chiNgay];
  
  // Tính lùi về Giáp đầu chu kỳ
  const gapIdx = (chiIdx - canIdx + 12) % 12;
  const gapChi = DIA_CHI[gapIdx];
  
  return TUAN_TABLE[`Giáp ${gapChi}`] || [];
}

// ============================================================
// Bảng Triệt (theo Can năm)
// ============================================================

const TRIET_TABLE: Record<string, DiaChi[]> = {
  'Giáp': ['Thân','Dậu'], 'Kỷ': ['Thân','Dậu'],
  'Ất':   ['Ngọ','Mùi'],  'Canh':['Ngọ','Mùi'],
  'Bính': ['Thìn','Tỵ'],  'Tân': ['Thìn','Tỵ'],
  'Đinh': ['Dần','Mão'],  'Nhâm':['Dần','Mão'],
  'Mậu':  ['Tý','Sửu'],   'Quý': ['Tý','Sửu'],
};

/**
 * Xác định Triệt dựa trên Can năm sinh
 */
export function getTriet(canNam: ThienCan): DiaChi[] {
  return TRIET_TABLE[canNam] || [];
}
