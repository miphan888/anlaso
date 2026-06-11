// ============================================================
// CALENDAR - Chuyển đổi Dương lịch → Âm lịch
// Sử dụng thuật toán tính lịch thiên văn
// ============================================================

import { THIEN_CAN, DIA_CHI, ThienCan, DiaChi } from './can-chi';

export interface AmLich {
  nam: number;
  thang: number;
  ngay: number;
  nhuan: boolean;  // tháng nhuận
  canNam: ThienCan;
  chiNam: DiaChi;
  canThang: ThienCan;
  chiThang: DiaChi;
  canNgay: ThienCan;
  chiNgay: DiaChi;
  tenNam: string;   // "Mậu Tý"
  tenThang: string; // "Giáp Tí"
  tenNgay: string;  // "Canh Dần"
}

// ============================================================
// Core algorithm (dựa trên lunar calendar của Ho Ngoc Duc)
// ============================================================

function INT(d: number): number { return Math.floor(d); }

function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = INT((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
  if (jd < 2299161) {
    jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
  }
  return jd;
}

function jdToDate(jd: number): { d: number; m: number; y: number } {
  let a, b, c;
  if (jd > 2299160) {
    a = jd + 32044;
    b = INT((4 * a + 3) / 146097);
    c = a - INT((146097 * b) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d1 = INT((4 * c + 3) / 1461);
  const e = c - INT((1461 * d1) / 4);
  const m1 = INT((5 * e + 2) / 153);
  const day = e - INT((153 * m1 + 2) / 5) + 1;
  const month = m1 + 3 - 12 * INT(m1 / 10);
  const year = 100 * b + d1 - 4800 + INT(m1 / 10);
  return { d: day, m: month, y: year };
}

function newMoonDay(k: number, timeZone: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  let deltat: number;
  if (T < -11) {
    deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
  } else {
    deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
  }
  const JdNew = Jd1 + C1 - deltat;
  return INT(JdNew + 0.5 + timeZone / 24);
}

function sunLongitude(jdn: number, timeZone: number): number {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - Math.PI * 2 * INT(L / (Math.PI * 2));
  return INT(L / Math.PI * 6);
}

function getLunarMonth11(yy: number, timeZone: number): number {
  const off = jdFromDate(31, 12, yy) - 2415021;
  const k = INT(off / 29.530588853);
  let nm = newMoonDay(k, timeZone);
  const sunLong = sunLongitude(nm, timeZone);
  if (sunLong >= 9) nm = newMoonDay(k - 1, timeZone);
  return nm;
}

function getLeapMonthOffset(a11: number, timeZone: number): number {
  const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = sunLongitude(newMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = sunLongitude(newMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);
  return i - 1;
}

export function solarToLunar(dd: number, mm: number, yy: number, timeZone = 7): {
  lunarDay: number; lunarMonth: number; lunarYear: number; lunarLeap: boolean
} {
  const dayNumber = jdFromDate(dd, mm, yy);
  const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = newMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) monthStart = newMoonDay(k, timeZone);
  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear: number;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }
  const lunarDay = dayNumber - monthStart + 1;
  const diff = INT((monthStart - a11) / 29);
  let lunarLeap = false;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) lunarLeap = true;
    }
  }
  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
  return { lunarDay, lunarMonth, lunarYear, lunarLeap };
}

// ============================================================
// Can Chi tháng, ngày
// ============================================================

/** Can của tháng âm lịch dựa theo Can năm */
export function canThang(thang: number, canNamVal: ThienCan): ThienCan {
  // Tháng 1 âm lịch bắt đầu từ Can theo quy tắc:
  // Giáp/Kỷ → tháng 1 = Bính Dần
  // Ất/Canh → tháng 1 = Mậu Dần
  // Bính/Tân → tháng 1 = Canh Dần
  // Đinh/Nhâm → tháng 1 = Nhâm Dần
  // Mậu/Quý → tháng 1 = Giáp Dần
  const baseMap: Record<string, number> = {
    'Giáp': 2, 'Kỷ': 2,
    'Ất': 4, 'Canh': 4,
    'Bính': 6, 'Tân': 6,
    'Đinh': 8, 'Nhâm': 8,
    'Mậu': 0, 'Quý': 0
  };
  const base = baseMap[canNamVal];
  return THIEN_CAN[(base + thang - 1) % 10];
}

/** Can ngày từ Julian Day Number */
export function canNgayFromJD(jd: number): ThienCan {
  // JD 0 = Giáp Tý (can index 0)
  // Thực ra JD 2299160 (15/10/1582) cần offset
  // Công thức: (jd + 40) % 10 → can index  (offset thực nghiệm)
  return THIEN_CAN[((jd % 10) + 10) % 10];
}

/** Chi ngày từ Julian Day Number */
export function chiNgayFromJD(jd: number): DiaChi {
  return DIA_CHI[((jd % 12) + 12) % 12];
}

/** Can ngày tính từ ngày dương lịch */
export function getCanNgay(dd: number, mm: number, yy: number): ThienCan {
  const jd = jdFromDate(dd, mm, yy);
  // offset: JD 2451545 (1/1/2000) = Mậu Dần → can index 4
  const canIdx = ((jd - 2451545 + 4) % 10 + 10) % 10;
  return THIEN_CAN[canIdx];
}

/** Chi ngày tính từ ngày dương lịch */
export function getChiNgay(dd: number, mm: number, yy: number): DiaChi {
  const jd = jdFromDate(dd, mm, yy);
  // Calibrated offset: verified against 3 sample charts
  const chiIdx = ((jd - 2451545 + 6) % 12 + 12) % 12;
  return DIA_CHI[chiIdx];
}

/** Tên Can Chi ghép */
export function tenCanChi(can: ThienCan, chi: DiaChi): string {
  return `${can} ${chi}`;
}

/** Lấy đầy đủ thông tin âm lịch */
export function getAmLich(
  ngaySinh: number, thangSinh: number, namSinh: number,
  gioSinh: number, phutSinh: number
): AmLich {
  // Nếu giờ >= 23, ngày âm lịch tính cho ngày hôm sau
  let dd = ngaySinh, mm = thangSinh, yy = namSinh;
  if (gioSinh >= 23) {
    // Tăng ngày lên 1
    const jd = jdFromDate(dd, mm, yy) + 1;
    const d2 = jdToDate(jd);
    dd = d2.d; mm = d2.m; yy = d2.y;
  }

  const { lunarDay, lunarMonth, lunarYear, lunarLeap } = solarToLunar(dd, mm, yy);

  // Can Chi năm
  const canIdx = ((lunarYear - 4) % 10 + 10) % 10;
  const chiIdx = ((lunarYear - 4) % 12 + 12) % 12;
  const canNamVal = THIEN_CAN[canIdx];
  const chiNamVal = DIA_CHI[chiIdx];

  // Can Chi tháng
  const canThangVal = canThang(lunarMonth, canNamVal);
  const chiThangVal = DIA_CHI[(lunarMonth + 1) % 12]; // Tháng 1 = Dần = index 2

  // Can Chi ngày
  const canNgayVal = getCanNgay(dd, mm, yy);
  const chiNgayVal = getChiNgay(dd, mm, yy);

  return {
    nam: lunarYear,
    thang: lunarMonth,
    ngay: lunarDay,
    nhuan: lunarLeap,
    canNam: canNamVal,
    chiNam: chiNamVal,
    canThang: canThangVal,
    chiThang: chiThangVal,
    canNgay: canNgayVal,
    chiNgay: chiNgayVal,
    tenNam: `${canNamVal} ${chiNamVal}`,
    tenThang: `${canThangVal} ${chiThangVal}`,
    tenNgay: `${canNgayVal} ${chiNgayVal}`
  };
}

export { jdFromDate, jdToDate };
