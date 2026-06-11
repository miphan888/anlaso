// ============================================================
// ĐẠI HẠN & TIỂU HẠN
// ============================================================

import { DiaChi, DIA_CHI, CHI_INDEX, ThienCan, THIEN_CAN, CAN_INDEX } from './can-chi';
import { CucInfo } from './menh-cuc';

// ============================================================
// Đại Hạn
// ============================================================

export interface DaiHan {
  chiCung: DiaChi;
  tuoi: number;    // tuổi bắt đầu đại hạn
  den: number;     // tuổi kết thúc
}

/**
 * Tính đại hạn cho 12 cung
 * @param cungMenh - Chi cung Mệnh
 * @param cuc - Cục
 * @param isThuan - Dương nam/Âm nữ = thuận, ngược lại = nghịch
 * @param namSinh - năm sinh để tính tuổi
 */
export function tinhDaiHan(
  cungMenh: DiaChi,
  cuc: CucInfo,
  isThuan: boolean,
  namSinh: number
): DaiHan[] {
  const soCuc = cuc.so;
  const menhIdx = CHI_INDEX[cungMenh];
  const result: DaiHan[] = [];

  for (let i = 0; i < 12; i++) {
    let chiIdx: number;
    if (isThuan) {
      chiIdx = (menhIdx + i) % 12;
    } else {
      chiIdx = ((menhIdx - i) % 12 + 12) % 12;
    }
    const tuoi = soCuc + i * 10;
    result.push({
      chiCung: DIA_CHI[chiIdx],
      tuoi,
      den: tuoi + 9
    });
  }

  return result;
}

/**
 * Xác định đại hạn hiện tại theo tuổi
 */
export function getDaiHanHienTai(daiHans: DaiHan[], tuoiHienTai: number): DaiHan | null {
  return daiHans.find(dh => tuoiHienTai >= dh.tuoi && tuoiHienTai <= dh.den) || null;
}

// ============================================================
// Tiểu Hạn
// ============================================================

export interface TieuHan {
  nam: number;      // năm dương lịch
  chiCung: DiaChi;
  tuoi: number;
  canNam: ThienCan;
  chiNam: DiaChi;
}

/**
 * Tính tiểu hạn của 1 năm cụ thể
 * Tiểu hạn: Dương nam/Âm nữ: Dần là tuổi 1, thuận
 *           Âm nam/Dương nữ: Ngọ là tuổi 1, thuận (hoặc theo một số sách: Thân)
 * Công thức phổ biến: tuổi 1 ở Dần (nam thuận, nữ nghịch)
 */
export function tinhTieuHan(
  namXem: number,
  namSinh: number,
  isThuan: boolean,
  gioiTinh: 'Nam' | 'Nữ'
): TieuHan {
  const tuoi = namXem - namSinh + 1;
  
  // Tiểu hạn bắt đầu từ Dần cho Dương nam, từ Ngọ cho Âm nam
  let startIdx: number;
  if (gioiTinh === 'Nam') {
    startIdx = isThuan ? CHI_INDEX['Dần'] : CHI_INDEX['Ngọ'];
  } else {
    startIdx = isThuan ? CHI_INDEX['Dần'] : CHI_INDEX['Ngọ'];
  }
  
  let chiIdx: number;
  if (isThuan) {
    chiIdx = (startIdx + (tuoi - 1)) % 12;
  } else {
    chiIdx = ((startIdx - (tuoi - 1)) % 12 + 12) % 12;
  }

  const canIdx = ((namXem - 4) % 10 + 10) % 10;
  const chiNamIdx = ((namXem - 4) % 12 + 12) % 12;

  return {
    nam: namXem,
    chiCung: DIA_CHI[chiIdx],
    tuoi,
    canNam: THIEN_CAN[canIdx],
    chiNam: DIA_CHI[chiNamIdx]
  };
}

/**
 * Tính tuổi hiện tại từ năm sinh và năm xem
 */
export function tinhTuoi(namSinh: number, namXem: number): number {
  return namXem - namSinh + 1;
}

/**
 * Lấy Can năm xem hạn
 */
export function getCanNamHan(namXem: number): ThienCan {
  return THIEN_CAN[((namXem - 4) % 10 + 10) % 10];
}

/**
 * Lấy Chi năm xem hạn
 */
export function getChiNamHan(namXem: number): DiaChi {
  return DIA_CHI[((namXem - 4) % 12 + 12) % 12];
}
