// ============================================================
// AN CHÍNH TINH - 14 Chính Diệu
// Tử Vi tinh hệ + Thiên Phủ tinh hệ
// ============================================================

import { DiaChi, DIA_CHI, CHI_INDEX, addChi } from './can-chi';
import { CucInfo } from './menh-cuc';

export type MucDo = 'M' | 'V' | 'Đ' | 'B' | 'H'; // Miếu/Vượng/Đắc/Bình/Hãm

export interface ChinhTinh {
  ten: string;
  chi: DiaChi;
  mucDo: MucDo;
}

// ============================================================
// Vị trí Tử Vi theo Cục và Ngày âm lịch
// ============================================================

/**
 * An Tử Vi:
 * Tìm vị trí sao Tử Vi theo cục số và ngày âm lịch.
 * Công thức: 
 *   - Lấy ngày âm lịch, chia cho số cục → thương và dư
 *   - Nếu dư = 0: Tử Vi ở cung có chi = DIA_CHI[ngay % 12]
 *   - Tìm chi sao cho (chi_tuvi - ngay_am_lich) chia hết cho cục và dư = 0
 * 
 * Thuật toán chính xác:
 *   Từ cung An (chi thứ ngay-1 trong vòng 12), tìm cung sao cho
 *   số bước = ngay/cuc và (ngay mod cuc = 0, tại cung đó)
 *   hoặc tìm theo bảng cố định.
 */
export function anTuVi(ngayAm: number, cuc: CucInfo): DiaChi {
  const soCuc = cuc.so;
  // Tử Vi đứng ở cung mà khi tính từ đó đến Dần có số bước = ngay/cuc
  // Công thức: duyệt 12 cung, tìm cung i sao cho:
  //   (i + 1) >= ngayAm và ((i+1) - ngayAm) % soCuc === 0 (nếu i >= ngayAm-1)
  // hoặc dùng công thức nhanh:
  
  // Cách tính chuẩn: Tử Vi ở chi thỏa mãn:
  //   số hiệu chi (1-12) mod soCuc == ngayAm mod soCuc
  //   và số hiệu chi >= ngayAm mod soCuc (nếu mod != 0)
  //   chọn chi nhỏ nhất thỏa mãn >= ngayAm và chia hết khi trừ đi ngay chia soCuc
  
  for (let i = 0; i < 12; i++) {
    const chiSo = i + 1; // 1-12
    if (chiSo >= ngayAm && (chiSo - ngayAm) % soCuc === 0) {
      // Tử Vi ở vị trí i (Tý=0, Sửu=1, ...)
      return DIA_CHI[i];
    }
  }
  
  // Nếu không tìm được (ngày lớn hơn 12), tính tiếp vòng 2
  for (let i = 0; i < 12; i++) {
    const chiSo = i + 1 + 12;
    if (chiSo >= ngayAm && (chiSo - ngayAm) % soCuc === 0) {
      return DIA_CHI[i];
    }
  }
  
  // Fallback
  return DIA_CHI[(ngayAm - 1) % 12];
}

// ============================================================
// Tử Vi tinh hệ: Tử Vi → bỏ 3 → Liêm Trinh → bỏ 2 → 
//   Thiên Đồng → Vũ Khúc → Thái Dương → bỏ 1 → Thiên Cơ
// ============================================================

// Offset tính từ vị trí Tử Vi (thuận chiều)
const TU_VI_TINH_HE: Array<{ ten: string; offset: number }> = [
  { ten: 'Tử Vi',    offset: 0 },
  // bỏ 3
  { ten: 'Liêm Trinh',  offset: 4 },
  // bỏ 2
  { ten: 'Thiên Đồng',  offset: 7 },
  { ten: 'Vũ Khúc',    offset: 8 },
  { ten: 'Thái Dương',  offset: 9 },
  // bỏ 1
  { ten: 'Thiên Cơ',   offset: 11 },
];

// ============================================================
// Thiên Phủ tinh hệ: đối xứng Tử Vi, rồi thuận
// Thiên Phủ → Thái Âm → Tham Lang → Cự Môn → Thiên Tướng → 
//   Thiên Lương → Thất Sát → bỏ 3 → Phá Quân
// ============================================================

const THIEN_PHU_TINH_HE: Array<{ ten: string; offset: number }> = [
  { ten: 'Thiên Phủ', offset: 0 },
  { ten: 'Thái Âm',   offset: 1 },
  { ten: 'Tham Lang', offset: 2 },
  { ten: 'Cự Môn',    offset: 3 },
  { ten: 'Thiên Tướng',offset: 4 },
  { ten: 'Thiên Lương',offset: 5 },
  { ten: 'Thất Sát',  offset: 6 },
  // bỏ 3
  { ten: 'Phá Quân',  offset: 10 },
];

// ============================================================
// Mức độ (Miếu/Vượng/Đắc/Bình/Hãm) của từng chính tinh theo cung
// ============================================================

const MIEN_VUONG: Record<string, Partial<Record<DiaChi, MucDo>>> = {
  'Tử Vi': {
    'Tý':'M','Ngọ':'M','Thìn':'V','Tuất':'V','Sửu':'Đ','Mùi':'Đ',
    'Dần':'Đ','Thân':'Đ','Mão':'B','Dậu':'B','Tỵ':'H','Hợi':'H'
  },
  'Thiên Cơ': {
    'Mão':'M','Dậu':'M','Sửu':'V','Mùi':'V','Thìn':'Đ','Tuất':'Đ',
    'Dần':'Đ','Thân':'Đ','Tý':'B','Ngọ':'B','Tỵ':'H','Hợi':'H'
  },
  'Thái Dương': {
    'Dần':'M','Mão':'M','Thìn':'M','Tý':'V','Sửu':'V',
    'Tỵ':'Đ','Ngọ':'Đ','Mùi':'Đ',
    'Thân':'B','Dậu':'H','Tuất':'H','Hợi':'H'
  },
  'Vũ Khúc': {
    'Thìn':'M','Tuất':'M','Sửu':'M','Mùi':'M',
    'Tý':'V','Ngọ':'V',
    'Dần':'Đ','Thân':'Đ','Mão':'Đ','Dậu':'Đ',
    'Tỵ':'H','Hợi':'H'
  },
  'Thiên Đồng': {
    'Tý':'M','Ngọ':'M','Dần':'V','Thân':'V',
    'Thìn':'Đ','Tuất':'Đ','Sửu':'Đ','Mùi':'Đ',
    'Mão':'B','Dậu':'B','Tỵ':'H','Hợi':'H'
  },
  'Liêm Trinh': {
    'Dần':'M','Thân':'M','Ngọ':'V','Tuất':'V',
    'Tỵ':'Đ','Dậu':'Đ','Sửu':'Đ','Mùi':'Đ',
    'Tý':'B','Mão':'B','Thìn':'H','Hợi':'H'
  },
  'Thiên Phủ': {
    'Dần':'M','Ngọ':'M','Tuất':'M','Tý':'V','Thân':'V',
    'Thìn':'Đ','Sửu':'Đ','Mùi':'Đ',
    'Mão':'B','Tỵ':'B','Dậu':'H','Hợi':'H'
  },
  'Thái Âm': {
    'Tý':'M','Sửu':'M','Hợi':'V','Dậu':'V',
    'Dần':'Đ','Mão':'Đ','Thìn':'Đ',
    'Ngọ':'H','Mùi':'H','Thân':'H','Tuất':'H','Tỵ':'B'
  },
  'Tham Lang': {
    'Tý':'M','Ngọ':'M','Dần':'V','Thân':'V',
    'Mão':'Đ','Dậu':'Đ','Thìn':'Đ','Tuất':'Đ',
    'Sửu':'B','Mùi':'B','Tỵ':'H','Hợi':'H'
  },
  'Cự Môn': {
    'Mão':'M','Dậu':'M','Dần':'V','Thân':'V',
    'Tý':'Đ','Ngọ':'Đ',
    'Thìn':'B','Tuất':'B','Sửu':'B','Mùi':'B',
    'Tỵ':'H','Hợi':'H'
  },
  'Thiên Tướng': {
    'Tý':'M','Ngọ':'M','Dần':'V','Thân':'V',
    'Mão':'Đ','Dậu':'Đ','Thìn':'Đ','Tuất':'Đ',
    'Sửu':'B','Mùi':'B','Tỵ':'H','Hợi':'H'
  },
  'Thiên Lương': {
    'Mão':'M','Dậu':'M','Tý':'V','Ngọ':'V',
    'Dần':'Đ','Thân':'Đ','Sửu':'Đ','Mùi':'Đ',
    'Thìn':'B','Tuất':'B','Tỵ':'H','Hợi':'H'
  },
  'Thất Sát': {
    'Dần':'M','Thân':'M','Tý':'V','Ngọ':'V',
    'Thìn':'Đ','Tuất':'Đ',
    'Sửu':'B','Mùi':'B','Mão':'B','Dậu':'B',
    'Tỵ':'H','Hợi':'H'
  },
  'Phá Quân': {
    'Tý':'M','Ngọ':'M','Hợi':'V','Mão':'V',
    'Thìn':'Đ','Tuất':'Đ','Sửu':'Đ','Mùi':'Đ',
    'Dần':'B','Thân':'B','Tỵ':'H','Dậu':'H'
  },
};

export function getMucDo(tenSao: string, chi: DiaChi): MucDo {
  return MIEN_VUONG[tenSao]?.[chi] ?? 'B';
}

// ============================================================
// Hàm chính: An 14 chính diệu
// ============================================================

export function an14ChinhTinh(
  ngayAm: number,
  cuc: CucInfo
): ChinhTinh[] {
  const chiTuVi = anTuVi(ngayAm, cuc);
  const tuViIdx = CHI_INDEX[chiTuVi];

  // Tử Vi tinh hệ
  const tuViGroup: ChinhTinh[] = TU_VI_TINH_HE.map(({ ten, offset }) => {
    const chi = DIA_CHI[(tuViIdx + offset) % 12];
    return { ten, chi, mucDo: getMucDo(ten, chi) };
  });

  // Thiên Phủ đối xứng với Tử Vi (cung đối cung)
  const thuanPhuIdx = (14 - tuViIdx) % 12; // đối cung của Tử Vi
  const thuanPhu2Idx = (tuViIdx + 6) % 12; // đây mới đúng: đối diện
  const phuIdx = (tuViIdx + 6) % 12;

  const phuGroup: ChinhTinh[] = THIEN_PHU_TINH_HE.map(({ ten, offset }) => {
    const chi = DIA_CHI[(phuIdx + offset) % 12];
    return { ten, chi, mucDo: getMucDo(ten, chi) };
  });

  return [...tuViGroup, ...phuGroup];
}
