// ============================================================
// AN TỨ HÓA - Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ
// ============================================================

import { ThienCan, DiaChi } from './can-chi';

export type TuHoaType = 'Lộc' | 'Quyền' | 'Khoa' | 'Kỵ';

export interface TuHoaEntry {
  type: TuHoaType;
  sao: string;
}

// ============================================================
// Bảng Tứ Hóa theo Can năm
// ============================================================

const TU_HOA_TABLE: Record<ThienCan, Record<TuHoaType, string>> = {
  'Giáp': { 'Lộc':'Liêm Trinh', 'Quyền':'Phá Quân', 'Khoa':'Vũ Khúc',   'Kỵ':'Thái Dương'  },
  'Ất':   { 'Lộc':'Thiên Cơ',   'Quyền':'Thiên Lương','Khoa':'Tử Vi',    'Kỵ':'Thái Âm'     },
  'Bính': { 'Lộc':'Thiên Đồng', 'Quyền':'Thiên Cơ',  'Khoa':'Văn Xương', 'Kỵ':'Liêm Trinh'  },
  'Đinh': { 'Lộc':'Thái Âm',    'Quyền':'Thiên Đồng','Khoa':'Thiên Cơ',  'Kỵ':'Cự Môn'      },
  'Mậu':  { 'Lộc':'Tham Lang',  'Quyền':'Thái Âm',   'Khoa':'Hữu Bật',   'Kỵ':'Thiên Cơ'    },
  'Kỷ':   { 'Lộc':'Vũ Khúc',    'Quyền':'Tham Lang', 'Khoa':'Thiên Lương','Kỵ':'Văn Khúc'    },
  'Canh': { 'Lộc':'Thái Dương', 'Quyền':'Vũ Khúc',   'Khoa':'Thái Âm',   'Kỵ':'Thiên Đồng'  },
  'Tân':  { 'Lộc':'Cự Môn',     'Quyền':'Thái Dương','Khoa':'Văn Khúc',  'Kỵ':'Văn Xương'   },
  'Nhâm': { 'Lộc':'Thiên Lương','Quyền':'Tử Vi',     'Khoa':'Tả Phù',    'Kỵ':'Vũ Khúc'     },
  'Quý':  { 'Lộc':'Phá Quân',   'Quyền':'Cự Môn',    'Khoa':'Thái Âm',   'Kỵ':'Tham Lang'   },
};

/**
 * Lấy danh sách Tứ Hóa theo Can năm
 */
export function getTuHoa(canNam: ThienCan): Record<TuHoaType, string> {
  return TU_HOA_TABLE[canNam];
}

/**
 * Kiểm tra sao có Tứ Hóa không, trả về loại
 */
export function getTuHoaOfSao(canNam: ThienCan, tenSao: string): TuHoaType | null {
  const table = TU_HOA_TABLE[canNam];
  for (const [type, sao] of Object.entries(table)) {
    if (sao === tenSao) return type as TuHoaType;
  }
  return null;
}

/**
 * Tứ Hóa cho lưu niên (can năm xem hạn)
 */
export function getTuHoaLuuNien(canNamHan: ThienCan): Record<TuHoaType, string> {
  return TU_HOA_TABLE[canNamHan];
}
