// ============================================================
// AN TRÀNG SINH và Bộ 12 sao
// ============================================================

import { DiaChi, DIA_CHI, CHI_INDEX } from './can-chi';
import { CucInfo } from './menh-cuc';

// ============================================================
// Điểm khởi Tràng Sinh theo Cục
// ============================================================
const TRUONG_SINH_START: Record<string, DiaChi> = {
  'Thủy': 'Thân',
  'Mộc':  'Hợi',
  'Kim':  'Tỵ',
  'Thổ':  'Thân',
  'Hỏa':  'Dần',
};

// ============================================================
// 12 sao Tràng Sinh (theo thứ tự)
// ============================================================
export const TRUONG_SINH_BO: string[] = [
  'Tràng Sinh','Mộc Dục','Quan Đới','Lâm Quan',
  'Đế Vượng','Suy','Bệnh','Tử',
  'Mộ','Tuyệt','Thai','Dưỡng'
];

/**
 * An bộ Tràng Sinh
 * @param cuc - Cục thông tin
 * @param isThuan - Dương nam/Âm nữ = thuận, Âm nam/Dương nữ = nghịch
 */
export function anTruongSinhBo(cuc: CucInfo, isThuan: boolean): Record<string, DiaChi> {
  const startChi = TRUONG_SINH_START[cuc.loai] || 'Thân';
  const startIdx = CHI_INDEX[startChi];
  const result: Record<string, DiaChi> = {};

  TRUONG_SINH_BO.forEach((sao, i) => {
    if (isThuan) {
      result[sao] = DIA_CHI[(startIdx + i) % 12];
    } else {
      result[sao] = DIA_CHI[((startIdx - i) % 12 + 12) % 12];
    }
  });

  return result;
}

/**
 * Lấy tên Tràng Sinh của một cung cụ thể
 */
export function getTruongSinhOfCung(
  chi: DiaChi,
  cuc: CucInfo,
  isThuan: boolean
): string {
  const bo = anTruongSinhBo(cuc, isThuan);
  for (const [sao, c] of Object.entries(bo)) {
    if (c === chi) return sao;
  }
  return '';
}
