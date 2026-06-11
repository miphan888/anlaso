// ============================================================
// AN CUNG - An Mệnh, An Thân, 12 Cung
// ============================================================

import { DiaChi, DIA_CHI, CHI_INDEX, addChi } from './can-chi';

export const CUNG_NAMES = [
  'Mệnh','Phụ Mẫu','Phúc Đức','Điền Trạch',
  'Quan Lộc','Nô Bộc','Thiên Di','Tật Ách',
  'Tài Bạch','Tử Tức','Phu Thê','Huynh Đệ'
] as const;

export type CungName = typeof CUNG_NAMES[number];

export interface CungInfo {
  chi: DiaChi;
  ten: CungName;
}

/**
 * An Mệnh:
 * - Bắt đầu từ cung Dần = tháng 1
 * - Đếm thuận đến tháng sinh → vị trí giờ Tý
 * - Đếm NGHỊCH đến giờ sinh
 */
export function anMenh(thang: number, gioSinh: number, phutSinh: number): DiaChi {
  // Giờ sinh → chỉ số giờ (Tý=0, Sửu=1, ... Hợi=11)
  const gioIdx = getGioIdx(gioSinh, phutSinh);

  // Bắt đầu từ Dần (index 2), đếm thuận tháng-1 bước
  let pos = (2 + thang - 1) % 12;

  // Từ đó đếm NGHỊCH gioIdx bước
  pos = ((pos - gioIdx) % 12 + 12) % 12;

  return DIA_CHI[pos];
}

/**
 * An Thân:
 * - Bắt đầu từ cung Dần = tháng 1
 * - Đếm thuận đến tháng sinh → vị trí giờ Tý
 * - Đếm THUẬN đến giờ sinh
 */
export function anThan(thang: number, gioSinh: number, phutSinh: number): DiaChi {
  const gioIdx = getGioIdx(gioSinh, phutSinh);

  // Bắt đầu từ Dần, đếm thuận tháng-1 bước
  let pos = (2 + thang - 1) % 12;

  // Từ đó đếm THUẬN gioIdx bước
  pos = (pos + gioIdx) % 12;

  return DIA_CHI[pos];
}

function getGioIdx(gio: number, phut: number): number {
  const totalMin = gio * 60 + phut;
  // Tý: 23:00-00:59 → idx 0
  // Sửu: 01:00-02:59 → idx 1
  // ...
  if (totalMin >= 23 * 60 || totalMin < 1 * 60) return 0;
  return Math.floor((totalMin - 60) / 120) + 1;
}

/**
 * Lập 12 cung từ cung Mệnh
 * Thứ tự: Mệnh → Phụ Mẫu → ... → Huynh Đệ (thuận chiều)
 */
export function lap12Cung(cungMenh: DiaChi): CungInfo[] {
  const menhIdx = CHI_INDEX[cungMenh];
  return CUNG_NAMES.map((ten, i) => ({
    chi: DIA_CHI[(menhIdx + i) % 12],
    ten
  }));
}

/**
 * Lấy tên cung theo chi
 */
export function getCungBychi(cungs: CungInfo[], chi: DiaChi): CungName | undefined {
  return cungs.find(c => c.chi === chi)?.ten;
}

/**
 * Lấy chi của cung theo tên
 */
export function getChiByCung(cungs: CungInfo[], ten: CungName): DiaChi | undefined {
  return cungs.find(c => c.ten === ten)?.chi;
}

/**
 * Xác định thuận/nghịch cung:
 * - Dương nam / Âm nữ: NGHỊCH (isThuan = false)
 * - Âm nam / Dương nữ: THUẬN (isThuan = true)
 * Quy tắc: isThuan = (Nam XOR năm Dương) → Nam+Âm=true, Nữ+Dương=true
 */
export function isThuanCung(
  gioiTinh: 'Nam' | 'Nữ',
  amDuong: 'Dương' | 'Âm'
): boolean {
  // Nam + năm Âm = thuận | Nữ + năm Dương = thuận
  if (gioiTinh === 'Nam') return amDuong === 'Âm';
  return amDuong === 'Dương';
}

/**
 * Am Duong cua nam sinh (Duong/Am)
 */
export function getAmDuongNam(chiNam: DiaChi): 'Dương' | 'Âm' {
  const idx = CHI_INDEX[chiNam];
  return idx % 2 === 0 ? 'Dương' : 'Âm';
}
