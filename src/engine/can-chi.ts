// ============================================================
// CAN CHI - Thiên Can, Địa Chi, Âm Dương, Ngũ Hành
// ============================================================

export const THIEN_CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'] as const;
export const DIA_CHI   = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'] as const;

export type ThienCan = typeof THIEN_CAN[number];
export type DiaChi   = typeof DIA_CHI[number];

export const CAN_INDEX: Record<ThienCan, number> = Object.fromEntries(
  THIEN_CAN.map((c,i) => [c,i])
) as Record<ThienCan, number>;

export const CHI_INDEX: Record<DiaChi, number> = Object.fromEntries(
  DIA_CHI.map((c,i) => [c,i])
) as Record<DiaChi, number>;

/** Âm (0) hay Dương (1) của Can */
export function canAmDuong(can: ThienCan): 'Dương'|'Âm' {
  return CAN_INDEX[can] % 2 === 0 ? 'Dương' : 'Âm';
}

/** Âm (0) hay Dương (1) của Chi */
export function chiAmDuong(chi: DiaChi): 'Dương'|'Âm' {
  return CHI_INDEX[chi] % 2 === 0 ? 'Dương' : 'Âm';
}

/** Can năm sinh từ năm dương lịch */
export function canNam(nam: number): ThienCan {
  return THIEN_CAN[(nam - 4) % 10 < 0 ? (nam - 4) % 10 + 10 : (nam - 4) % 10];
}

/** Chi năm sinh từ năm dương lịch */
export function chiNam(nam: number): DiaChi {
  const idx = ((nam - 4) % 12 + 12) % 12;
  return DIA_CHI[idx];
}

/** Lấy Can-Chi từ số thứ tự trong chu kỳ 60 (0-based) */
export function canChiFromIndex(idx: number): { can: ThienCan; chi: DiaChi } {
  const i = ((idx % 60) + 60) % 60;
  return { can: THIEN_CAN[i % 10], chi: DIA_CHI[i % 12] };
}

/** Tính số thứ tự Can-Chi từ năm dương lịch (0 = Giáp Tý) */
export function canChiNamIndex(nam: number): number {
  return ((nam - 4) % 60 + 60) % 60;
}

/** Chi của giờ sinh (Tý=0,1h; Sửu=1-3h; ... Hợi=21-23h) */
export function chiGio(gio: number, phut: number): DiaChi {
  // Tý: 23:00-00:59, Sửu: 1:00-2:59, ...
  const totalMin = gio * 60 + phut;
  let idx: number;
  if (totalMin >= 23 * 60 || totalMin < 1 * 60) idx = 0; // Tý
  else idx = Math.floor((totalMin - 60) / 120) + 1;
  return DIA_CHI[idx % 12];
}

/** Can của giờ (dựa theo Can ngày, nhưng ở đây dùng can tháng/năm để an sao) */
export function canGio(chiGioVal: DiaChi, canNgay: ThienCan): ThienCan {
  // Bảng can giờ theo can ngày
  const base: Record<string, number> = {
    'Giáp': 0, 'Kỷ': 0,
    'Ất': 2, 'Canh': 2,
    'Bính': 4, 'Tân': 4,
    'Đinh': 6, 'Nhâm': 6,
    'Mậu': 8, 'Quý': 8
  };
  const chiIdx = CHI_INDEX[chiGioVal];
  return THIEN_CAN[(base[canNgay] + chiIdx) % 10];
}

/** Ngũ hành của Can */
export function nguHanhCan(can: ThienCan): string {
  const map: Record<ThienCan, string> = {
    'Giáp':'Mộc','Ất':'Mộc','Bính':'Hỏa','Đinh':'Hỏa',
    'Mậu':'Thổ','Kỷ':'Thổ','Canh':'Kim','Tân':'Kim',
    'Nhâm':'Thủy','Quý':'Thủy'
  };
  return map[can];
}

/** Ngũ hành của Chi */
export function nguHanhChi(chi: DiaChi): string {
  const map: Record<DiaChi, string> = {
    'Tý':'Thủy','Sửu':'Thổ','Dần':'Mộc','Mão':'Mộc',
    'Thìn':'Thổ','Tỵ':'Hỏa','Ngọ':'Hỏa','Mùi':'Thổ',
    'Thân':'Kim','Dậu':'Kim','Tuất':'Thổ','Hợi':'Thủy'
  };
  return map[chi];
}

/** Cộng trừ chi theo vòng 12 */
export function addChi(chi: DiaChi, n: number): DiaChi {
  return DIA_CHI[((CHI_INDEX[chi] + n) % 12 + 12) % 12];
}

/** Khoảng cách từ chi1 → chi2 theo chiều thuận */
export function distChi(from: DiaChi, to: DiaChi): number {
  return ((CHI_INDEX[to] - CHI_INDEX[from]) % 12 + 12) % 12;
}

export const NGU_HANH_COLOR: Record<string, string> = {
  'Kim': '#DAA520',
  'Mộc': '#228B22',
  'Thủy': '#1E90FF',
  'Hỏa': '#DC143C',
  'Thổ': '#8B4513'
};
