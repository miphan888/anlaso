// ============================================================
// AN LỘC TỒN và Bộ 12 sao (Bác Sĩ → Quan Phù)
// ============================================================

import { DiaChi, DIA_CHI, ThienCan, CHI_INDEX } from './can-chi';

// ============================================================
// Lộc Tồn theo Can năm
// ============================================================
export const LOC_TON_TABLE: Record<ThienCan, DiaChi> = {
  'Giáp':'Dần','Ất':'Mão','Bính':'Tỵ','Đinh':'Ngọ',
  'Mậu':'Tỵ','Kỷ':'Ngọ','Canh':'Thân','Tân':'Dậu',
  'Nhâm':'Hợi','Quý':'Tý'
};

export function anLocTon(canNam: ThienCan): DiaChi {
  return LOC_TON_TABLE[canNam];
}

// ============================================================
// Bộ sao Lộc Tồn (12 sao, bắt đầu từ Bác Sĩ = cùng cung Lộc Tồn)
// Dương nam/Âm nữ: thuận; Âm nam/Dương nữ: nghịch
// ============================================================

export const LOC_TON_BO: string[] = [
  'Bác Sĩ','Lực Sĩ','Thanh Long','Tiểu Hao',
  'Tướng Quân','Tấu Thư','Phi Liêm','Hỉ Thần',
  'Bệnh Phù','Đại Hao','Phục Binh','Quan Phù'
];

/**
 * An bộ sao Lộc Tồn
 * @param canNam - Can năm sinh
 * @param isThuan - true = Dương nam / Âm nữ (thuận), false = ngược lại
 */
export function anLocTonBo(canNam: ThienCan, isThuan: boolean): Record<string, DiaChi> {
  const locIdx = CHI_INDEX[LOC_TON_TABLE[canNam]];
  const result: Record<string, DiaChi> = {};

  LOC_TON_BO.forEach((sao, i) => {
    if (isThuan) {
      result[sao] = DIA_CHI[(locIdx + i) % 12];
    } else {
      result[sao] = DIA_CHI[((locIdx - i) % 12 + 12) % 12];
    }
  });

  return result;
}
