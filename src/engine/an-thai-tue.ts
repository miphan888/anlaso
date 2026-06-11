// ============================================================
// AN THÁI TUẾ và Bộ 12 sao
// ============================================================

import { DiaChi, DIA_CHI, CHI_INDEX } from './can-chi';

// ============================================================
// Thái Tuế = cung của Chi năm
// ============================================================
export function anThaiTue(chiNam: DiaChi): DiaChi {
  return chiNam; // Thái Tuế luôn ở cung có chi = chi năm
}

// ============================================================
// Bộ 12 sao Thái Tuế (thuận chiều từ Thái Tuế)
// ============================================================
export const THAI_TUE_BO: string[] = [
  'Thái Tuế','Thiếu Dương','Tang Môn','Thiếu Âm',
  'Quan Phù','Tử Phù','Tuế Phá','Long Đức',
  'Bạch Hổ','Phúc Đức','Điếu Khách','Trực Phù'
];

export function anThaiTueBo(chiNam: DiaChi): Record<string, DiaChi> {
  const tueIdx = CHI_INDEX[chiNam];
  const result: Record<string, DiaChi> = {};

  THAI_TUE_BO.forEach((sao, i) => {
    result[sao] = DIA_CHI[(tueIdx + i) % 12];
  });

  return result;
}
