// ============================================================
// AN PHỤ TINH - Tất cả phụ tinh
// Tả Phù, Hữu Bật, Văn Xương, Văn Khúc, Thiên Khôi, Thiên Việt,
// Hồng Loan, Thiên Hỉ, Long Trì, Phượng Các, Đào Hoa, Thiên Mã,
// Cô Thần, Quả Tú, Thiên Hình, Thiên Riêu, Thiên Y, Thiên Giải,
// Địa Giải, Tam Thai, Bát Tọa, Ân Quang, Thiên Quý, Thiên Đức,
// Nguyệt Đức, Thai Phụ, Phong Cáo, Thiên Tài, Thiên Thọ,
// Thiên Thương, Thiên Sứ, Thiên La, Địa Võng, Đẩu Quân, Thiên Không,
// Phá Toái, Hoa Cái, Kiếp Sát
// ============================================================

import { DiaChi, DIA_CHI, ThienCan, CHI_INDEX } from './can-chi';

// ============================================================
// Tả Phù: khởi từ Thìn, thuận theo tháng sinh
// ============================================================
export function anTaPhu(thang: number): DiaChi {
  const thinIdx = CHI_INDEX['Thìn']; // 4
  return DIA_CHI[(thinIdx + thang - 1) % 12];
}

// ============================================================
// Hữu Bật: khởi từ Tuất, NGHỊCH theo tháng sinh
// ============================================================
export function anHuuBat(thang: number): DiaChi {
  const tuatIdx = CHI_INDEX['Tuất']; // 10
  return DIA_CHI[((tuatIdx - thang + 1) % 12 + 12) % 12];
}

// ============================================================
// Văn Xương: khởi từ Tuất, NGHỊCH theo giờ sinh
// ============================================================
export function anVanXuong(gioIdx: number): DiaChi {
  const tuatIdx = CHI_INDEX['Tuất'];
  return DIA_CHI[((tuatIdx - gioIdx) % 12 + 12) % 12];
}

// ============================================================
// Văn Khúc: khởi từ Thìn, THUẬN theo giờ sinh
// ============================================================
export function anVanKhuc(gioIdx: number): DiaChi {
  const thinIdx = CHI_INDEX['Thìn'];
  return DIA_CHI[(thinIdx + gioIdx) % 12];
}

// ============================================================
// Thiên Khôi (Khôi) và Thiên Việt (Việt) theo Can năm
// ============================================================
const KHOI_VIET: Record<string, [DiaChi, DiaChi]> = {
  'Giáp': ['Sửu','Mùi'], 'Mậu': ['Sửu','Mùi'],
  'Ất':   ['Tý','Thân'],  'Kỷ': ['Tý','Thân'],
  'Canh': ['Ngọ','Dần'],  'Tân': ['Ngọ','Dần'],
  'Bính': ['Hợi','Dậu'],  'Đinh': ['Hợi','Dậu'],
  'Nhâm': ['Mão','Tỵ'],   'Quý': ['Mão','Tỵ'],
};

export function anKhoi(canNam: ThienCan): DiaChi {
  return KHOI_VIET[canNam]?.[0] || 'Sửu';
}

export function anViet(canNam: ThienCan): DiaChi {
  return KHOI_VIET[canNam]?.[1] || 'Mùi';
}

// ============================================================
// Hồng Loan: khởi từ Mão, NGHỊCH theo chi năm
// Thiên Hỉ: đối cung với Hồng Loan
// ============================================================
export function anHongLoan(chiNam: DiaChi): DiaChi {
  const maoIdx = CHI_INDEX['Mão'];
  const chiIdx = CHI_INDEX[chiNam];
  return DIA_CHI[((maoIdx - chiIdx) % 12 + 12) % 12];
}

export function anThienHi(chiNam: DiaChi): DiaChi {
  const hl = CHI_INDEX[anHongLoan(chiNam)];
  return DIA_CHI[(hl + 6) % 12];
}

// ============================================================
// Long Trì: Thìn thuận theo chi năm
// Phượng Các: Tuất nghịch theo chi năm
// ============================================================
export function anLongTri(chiNam: DiaChi): DiaChi {
  const thinIdx = CHI_INDEX['Thìn'];
  const chiIdx = CHI_INDEX[chiNam];
  return DIA_CHI[(thinIdx + chiIdx) % 12];
}

export function anPhuongCac(chiNam: DiaChi): DiaChi {
  const tuatIdx = CHI_INDEX['Tuất'];
  const chiIdx = CHI_INDEX[chiNam];
  return DIA_CHI[((tuatIdx - chiIdx) % 12 + 12) % 12];
}

// ============================================================
// Đào Hoa theo chi năm
// ============================================================
export function anDaoHoa(chiNam: DiaChi): DiaChi {
  const map: Partial<Record<DiaChi, DiaChi>> = {
    'Tỵ':'Ngọ','Dậu':'Ngọ','Sửu':'Ngọ',
    'Hợi':'Tý','Mão':'Tý','Mùi':'Tý',
    'Thân':'Dậu','Tý':'Dậu','Thìn':'Dậu',
    'Dần':'Mão','Ngọ':'Mão','Tuất':'Mão',
  };
  return map[chiNam] || 'Tý';
}

// ============================================================
// Thiên Mã theo chi năm
// ============================================================
export function anThienMa(chiNam: DiaChi): DiaChi {
  const map: Partial<Record<DiaChi, DiaChi>> = {
    'Dần':'Thân','Ngọ':'Thân','Tuất':'Thân',
    'Thân':'Dần','Tý':'Dần','Thìn':'Dần',
    'Tỵ':'Hợi','Dậu':'Hợi','Sửu':'Hợi',
    'Hợi':'Tỵ','Mão':'Tỵ','Mùi':'Tỵ',
  };
  return map[chiNam] || 'Thân';
}

// ============================================================
// Cô Thần / Quả Tú theo chi năm
// ============================================================
export function anCoThan(chiNam: DiaChi): DiaChi {
  const map: Partial<Record<DiaChi, DiaChi>> = {
    'Hợi':'Dần','Tý':'Dần','Sửu':'Dần',
    'Dần':'Tỵ','Mão':'Tỵ','Thìn':'Tỵ',
    'Tỵ':'Thân','Ngọ':'Thân','Mùi':'Thân',
    'Thân':'Hợi','Dậu':'Hợi','Tuất':'Hợi',
  };
  return map[chiNam] || 'Dần';
}

export function anQuaTu(chiNam: DiaChi): DiaChi {
  const map: Partial<Record<DiaChi, DiaChi>> = {
    'Hợi':'Tuất','Tý':'Tuất','Sửu':'Tuất',
    'Dần':'Sửu','Mão':'Sửu','Thìn':'Sửu',
    'Tỵ':'Thìn','Ngọ':'Thìn','Mùi':'Thìn',
    'Thân':'Mùi','Dậu':'Mùi','Tuất':'Mùi',
  };
  return map[chiNam] || 'Tuất';
}

// ============================================================
// Thiên Hình: Dậu thuận theo tháng sinh
// ============================================================
export function anThienHinh(thang: number): DiaChi {
  const dауIdx = CHI_INDEX['Dậu'];
  return DIA_CHI[(dауIdx + thang - 1) % 12];
}

// ============================================================
// Thiên Riêu: Sửu thuận theo tháng sinh
// Thiên Y: cùng cung Thiên Riêu
// ============================================================
export function anThienRieu(thang: number): DiaChi {
  const suuIdx = CHI_INDEX['Sửu'];
  return DIA_CHI[(suuIdx + thang - 1) % 12];
}

// ============================================================
// Thiên Giải: Thân thuận theo tháng sinh
// ============================================================
export function anThienGiai(thang: number): DiaChi {
  const thanIdx = CHI_INDEX['Thân'];
  return DIA_CHI[(thanIdx + thang - 1) % 12];
}

// ============================================================
// Địa Giải: Mùi thuận theo tháng sinh
// ============================================================
export function anDiaGiai(thang: number): DiaChi {
  const muiIdx = CHI_INDEX['Mùi'];
  return DIA_CHI[(muiIdx + thang - 1) % 12];
}

// ============================================================
// Tam Thai: từ Tả Phù thuận theo ngày sinh
// ============================================================
export function anTamThai(taPhuChi: DiaChi, ngay: number): DiaChi {
  const idx = CHI_INDEX[taPhuChi];
  return DIA_CHI[(idx + ngay - 1) % 12];
}

// ============================================================
// Bát Tọa: từ Hữu Bật nghịch theo ngày sinh
// ============================================================
export function anBatToa(huuBatChi: DiaChi, ngay: number): DiaChi {
  const idx = CHI_INDEX[huuBatChi];
  return DIA_CHI[((idx - ngay + 1) % 12 + 12) % 12];
}

// ============================================================
// Ân Quang: từ Văn Xương thuận theo ngày, lùi 1 cung
// ============================================================
export function anAnQuang(vanXuongChi: DiaChi, ngay: number): DiaChi {
  const idx = CHI_INDEX[vanXuongChi];
  return DIA_CHI[((idx + ngay - 2) % 12 + 12) % 12];
}

// ============================================================
// Thiên Quý: từ Văn Khúc nghịch theo ngày, lùi 1 cung
// ============================================================
export function anThienQuy(vanKhucChi: DiaChi, ngay: number): DiaChi {
  const idx = CHI_INDEX[vanKhucChi];
  return DIA_CHI[((idx - ngay + 2) % 12 + 12) % 12];
}

// ============================================================
// Thiên Đức: Dậu thuận theo chi năm
// ============================================================
export function anThienDuc(chiNam: DiaChi): DiaChi {
  const dауIdx = CHI_INDEX['Dậu'];
  const chiIdx = CHI_INDEX[chiNam];
  return DIA_CHI[(dауIdx + chiIdx) % 12];
}

// ============================================================
// Nguyệt Đức: Tỵ thuận theo chi năm
// ============================================================
export function anNguyetDuc(chiNam: DiaChi): DiaChi {
  const tyIdx = CHI_INDEX['Tỵ'];
  const chiIdx = CHI_INDEX[chiNam];
  return DIA_CHI[(tyIdx + chiIdx) % 12];
}

// ============================================================
// Thai Phụ: Ngọ thuận theo giờ sinh
// ============================================================
export function anThaiPhu(gioIdx: number): DiaChi {
  const ngoIdx = CHI_INDEX['Ngọ'];
  return DIA_CHI[(ngoIdx + gioIdx) % 12];
}

// ============================================================
// Phong Cáo: Dần thuận theo giờ sinh
// ============================================================
export function anPhongCao(gioIdx: number): DiaChi {
  const danIdx = CHI_INDEX['Dần'];
  return DIA_CHI[(danIdx + gioIdx) % 12];
}

// ============================================================
// Thiên Tài: từ cung Mệnh thuận theo chi năm
// ============================================================
export function anThienTai(cungMenh: DiaChi, chiNam: DiaChi): DiaChi {
  const menhIdx = CHI_INDEX[cungMenh];
  const chiIdx = CHI_INDEX[chiNam];
  return DIA_CHI[(menhIdx + chiIdx) % 12];
}

// ============================================================
// Thiên Thọ: từ cung Thân thuận theo chi năm
// ============================================================
export function anThienTho(cungThan: DiaChi, chiNam: DiaChi): DiaChi {
  const thanIdx = CHI_INDEX[cungThan];
  const chiIdx = CHI_INDEX[chiNam];
  return DIA_CHI[(thanIdx + chiIdx) % 12];
}

// ============================================================
// Phá Toái theo chi năm
// ============================================================
export function anPhaToai(chiNam: DiaChi): DiaChi {
  const nhomTy = ['Tý','Ngọ','Mão','Dậu'];
  const nhomDan = ['Dần','Thân','Tỵ','Hợi'];
  const nhomThin = ['Thìn','Tuất','Sửu','Mùi'];
  if (nhomTy.includes(chiNam)) return 'Tỵ';
  if (nhomDan.includes(chiNam)) return 'Dậu';
  if (nhomThin.includes(chiNam)) return 'Sửu';
  return 'Tỵ';
}

// ============================================================
// Hoa Cái theo chi năm
// ============================================================
export function anHoaCai(chiNam: DiaChi): DiaChi {
  const map: Partial<Record<DiaChi, DiaChi>> = {
    'Tỵ':'Sửu','Dậu':'Sửu','Sửu':'Sửu',
    'Hợi':'Mùi','Mão':'Mùi','Mùi':'Mùi',
    'Dần':'Tuất','Ngọ':'Tuất','Tuất':'Tuất',
    'Thân':'Thìn','Tý':'Thìn','Thìn':'Thìn',
  };
  return map[chiNam] || 'Sửu';
}

// ============================================================
// Kiếp Sát theo chi năm
// ============================================================
export function anKiepSat(chiNam: DiaChi): DiaChi {
  const map: Partial<Record<DiaChi, DiaChi>> = {
    'Tỵ':'Dần','Dậu':'Dần','Sửu':'Dần',
    'Dần':'Hợi','Ngọ':'Hợi','Tuất':'Hợi',
    'Hợi':'Thân','Mão':'Thân','Mùi':'Thân',
    'Thân':'Tỵ','Tý':'Tỵ','Thìn':'Tỵ',
  };
  return map[chiNam] || 'Dần';
}

// ============================================================
// Khốc: Ngọ nghịch theo chi năm
// Hư: Ngọ thuận theo chi năm
// ============================================================
export function anKhoc(chiNam: DiaChi): DiaChi {
  const ngoIdx = CHI_INDEX['Ngọ'];
  const chiIdx = CHI_INDEX[chiNam];
  return DIA_CHI[((ngoIdx - chiIdx) % 12 + 12) % 12];
}

export function anHu(chiNam: DiaChi): DiaChi {
  const ngoIdx = CHI_INDEX['Ngọ'];
  const chiIdx = CHI_INDEX[chiNam];
  return DIA_CHI[(ngoIdx + chiIdx) % 12];
}

// ============================================================
// Thiên Không: cung trước Thái Tuế (chiều nghịch 1)
// ============================================================
export function anThienKhong(chiNam: DiaChi): DiaChi {
  const idx = CHI_INDEX[chiNam];
  return DIA_CHI[((idx - 1) % 12 + 12) % 12];
}

// ============================================================
// Thiên La: luôn ở Thìn | Địa Võng: luôn ở Tuất
// Thiên Thương: luôn ở Nô Bộc | Thiên Sứ: luôn ở Tật Ách
// (vị trí cố định trong cung, xử lý ở tầng cao hơn)
// ============================================================
export const THIEN_LA_CHI: DiaChi = 'Thìn';
export const DIA_VONG_CHI: DiaChi = 'Tuất';

// ============================================================
// Đẩu Quân: từ Thái Tuế nghịch theo tháng → giờ Tý, thuận theo giờ
// ============================================================
export function anDauQuan(chiNam: DiaChi, thang: number, gioIdx: number): DiaChi {
  const tuatIdx = CHI_INDEX[chiNam]; // Thái Tuế = chi năm
  // Nghịch tháng
  let pos = ((tuatIdx - thang + 1) % 12 + 12) % 12;
  // Thuận giờ
  pos = (pos + gioIdx) % 12;
  return DIA_CHI[pos];
}

// ============================================================
// Thiên Quan, Thiên Phúc theo Can năm (bảng đơn giản)
// ============================================================
const THIEN_QUAN_TABLE: Record<ThienCan, DiaChi> = {
  'Giáp':'Mùi','Ất':'Thân','Bính':'Dậu','Đinh':'Hợi',
  'Mậu':'Mùi','Kỷ':'Ngọ','Canh':'Mùi','Tân':'Dần',
  'Nhâm':'Mão','Quý':'Tỵ'
};

const THIEN_PHUC_TABLE: Record<ThienCan, DiaChi> = {
  'Giáp':'Dậu','Ất':'Thân','Bính':'Tý','Đinh':'Hợi',
  'Mậu':'Mão','Kỷ':'Dần','Canh':'Ngọ','Tân':'Tỵ',
  'Nhâm':'Dần','Quý':'Mão'
};

export function anThienQuan(canNam: ThienCan): DiaChi {
  return THIEN_QUAN_TABLE[canNam] || 'Mùi';
}

export function anThienPhucSao(canNam: ThienCan): DiaChi {
  return THIEN_PHUC_TABLE[canNam] || 'Dậu';
}

// ============================================================
// Lưu Hà, Thiên Trù theo Can năm
// ============================================================
const LUU_HA_TABLE: Record<ThienCan, DiaChi> = {
  'Giáp':'Dậu','Ất':'Tuất','Bính':'Mùi','Đinh':'Thân',
  'Mậu':'Sửu','Kỷ':'Dần','Canh':'Thìn','Tân':'Mão',
  'Nhâm':'Mão','Quý':'Dần'
};

const THIEN_TRU_TABLE: Record<ThienCan, DiaChi> = {
  'Giáp':'Tuất','Ất':'Tỵ','Bính':'Dần','Đinh':'Dậu',
  'Mậu':'Ngọ','Kỷ':'Mùi','Canh':'Dần','Tân':'Ngọ',
  'Nhâm':'Dần','Quý':'Tỵ'
};

export function anLuuHa(canNam: ThienCan): DiaChi {
  return LUU_HA_TABLE[canNam] || 'Dậu';
}

export function anThienTru(canNam: ThienCan): DiaChi {
  return THIEN_TRU_TABLE[canNam] || 'Tuất';
}
