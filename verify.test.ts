// ============================================================
// VERIFY TEST - Kiểm chứng 3 lá số mẫu
// ============================================================

import { lapLaSo } from '../engine/index';

// ============================================================
// Helper
// ============================================================
function check(label: string, actual: any, expected: any) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected) ||
             String(actual) === String(expected) ||
             (typeof actual === 'string' && typeof expected === 'string' && 
              actual.toLowerCase().includes(expected.toLowerCase()));
  console.log(`${ok ? '✅' : '❌'} ${label}`);
  if (!ok) {
    console.log(`   Expected: ${JSON.stringify(expected)}`);
    console.log(`   Actual:   ${JSON.stringify(actual)}`);
  }
}

function findSaoInCung(cungs: any[], cungTen: string, saoTen: string): boolean {
  const cung = cungs.find(c => c.ten === cungTen);
  return cung?.saos.some((s: any) => s.ten === saoTen) || false;
}

function getChinhTinhInCung(cungs: any[], cungTen: string): string[] {
  const cung = cungs.find(c => c.ten === cungTen);
  return cung?.saos.filter((s: any) => s.loai === 'chinh').map((s: any) => s.ten) || [];
}

function getMucDoInCung(cungs: any[], cungTen: string, saoTen: string): string {
  const cung = cungs.find(c => c.ten === cungTen);
  const sao = cung?.saos.find((s: any) => s.ten === saoTen);
  return sao?.mucDo || '';
}

// ============================================================
// LÁ SỐ 1: PHAN GIA BẢO
// Input: Dương Nam, 2008-12-16, 9h30
// ============================================================
console.log('\n========== LÁ SỐ 1: PHAN GIA BẢO ==========\n');
const ls1 = lapLaSo('Phan Gia Bảo', 16, 12, 2008, 9, 30, 'Nam', 2026);

console.log('--- Âm lịch ---');
check('Năm âm lịch', ls1.amLich.tenNam, 'Mậu Tý');
check('Tháng âm lịch', ls1.amLich.thang, 11);
check('Ngày âm lịch', ls1.amLich.ngay, 20);
check('Can ngày', ls1.amLich.canNgay, 'Canh');
check('Chi ngày', ls1.amLich.chiNgay, 'Dần');

console.log('\n--- Mệnh Cục ---');
check('Mệnh', ls1.menh, 'Tích Lịch Hỏa');
check('Cục', ls1.cuc.ten, 'Hỏa lục cục');
check('Sao chủ cục', ls1.saosChuCuc, 'Liêm Trinh');
check('Mệnh chủ', ls1.menhChu, 'Tham Lang');
check('Thân chủ', ls1.thanChu, 'Linh Tinh');

console.log('\n--- Cung ---');
check('Cung Mệnh', ls1.cungMenh, 'Mùi');
check('Thân cư Phu Thê', ls1.cungThan, 'Tỵ');
check('Âm Dương', ls1.amDuongQuan, 'Âm Dương nghịch lý');

console.log('\n--- Chính tinh ---');
const ls1_menh = getChinhTinhInCung(ls1.cungs, 'Mệnh');
console.log('Sao cung Mệnh (Mùi):', ls1_menh.join(', '));
check('Cung Mệnh có Thiên Phủ', ls1_menh.includes('Thiên Phủ'), true);
check('Thiên Phủ đắc ở Mùi', getMucDoInCung(ls1.cungs, 'Mệnh', 'Thiên Phủ'), 'Đ');

const ls1_pm = getChinhTinhInCung(ls1.cungs, 'Phụ Mẫu');
console.log('Sao cung Phụ Mẫu (Thân):', ls1_pm.join(', '));
check('Cung Phụ Mẫu có Thiên Cơ', ls1_pm.includes('Thiên Cơ'), true);
check('Cung Phụ Mẫu có Thái Âm', ls1_pm.includes('Thái Âm'), true);

const ls1_fd = getChinhTinhInCung(ls1.cungs, 'Phúc Đức');
console.log('Sao cung Phúc Đức (Dậu):', ls1_fd.join(', '));
check('Cung Phúc Đức có Tử Vi', ls1_fd.includes('Tử Vi'), true);
check('Cung Phúc Đức có Tham Lang', ls1_fd.includes('Tham Lang'), true);

const ls1_dt = getChinhTinhInCung(ls1.cungs, 'Điền Trạch');
console.log('Sao cung Điền Trạch (Tuất):', ls1_dt.join(', '));
check('Cung Điền Trạch có Cự Môn', ls1_dt.includes('Cự Môn'), true);

const ls1_ql = getChinhTinhInCung(ls1.cungs, 'Quan Lộc');
console.log('Sao cung Quan Lộc (Hợi):', ls1_ql.join(', '));
check('Cung Quan Lộc có Thiên Tướng', ls1_ql.includes('Thiên Tướng'), true);

const ls1_nb = getChinhTinhInCung(ls1.cungs, 'Nô Bộc');
console.log('Sao cung Nô Bộc (Tý):', ls1_nb.join(', '));
check('Cung Nô Bộc có Thiên Lương', ls1_nb.includes('Thiên Lương'), true);

const ls1_td = getChinhTinhInCung(ls1.cungs, 'Thiên Di');
console.log('Sao cung Thiên Di (Sửu):', ls1_td.join(', '));
check('Cung Thiên Di có Thất Sát', ls1_td.includes('Thất Sát'), true);

const ls1_tt = getChinhTinhInCung(ls1.cungs, 'Tử Tức');
console.log('Sao cung Tử Tức (Thìn):', ls1_tt.join(', '));
check('Cung Tử Tức có Thiên Đồng', ls1_tt.includes('Thiên Đồng'), true);

const ls1_hd = getChinhTinhInCung(ls1.cungs, 'Huynh Đệ');
console.log('Sao cung Huynh Đệ (Ngọ):', ls1_hd.join(', '));
check('Cung Huynh Đệ có Thái Dương', ls1_hd.includes('Thái Dương'), true);

// Thân cư Phu Thê = Tỵ
const ls1_pt = getChinhTinhInCung(ls1.cungs, 'Phu Thê');
console.log('Sao cung Phu Thê (Tỵ):', ls1_pt.join(', '));
check('Cung Phu Thê có Vũ Khúc', ls1_pt.includes('Vũ Khúc'), true);
check('Cung Phu Thê có Phá Quân', ls1_pt.includes('Phá Quân'), true);

console.log('\n--- Đại Hạn ---');
check('Tuổi 2026', ls1.tuoi, 19);
console.log('Đại hạn hiện tại:', ls1.daiHanHienTai);

// ============================================================
// LÁ SỐ 2: PHAN GIA HUY
// Input: Âm Nam, 2017-11-27, 16h55
// ============================================================
console.log('\n========== LÁ SỐ 2: PHAN GIA HUY ==========\n');
const ls2 = lapLaSo('Phan Gia Huy', 27, 11, 2017, 16, 55, 'Nam', 2026);

console.log('--- Âm lịch ---');
check('Năm âm lịch', ls2.amLich.tenNam, 'Đinh Dậu');
check('Tháng âm lịch', ls2.amLich.thang, 10);
check('Ngày âm lịch', ls2.amLich.ngay, 10);
check('Can ngày', ls2.amLich.canNgay, 'Mậu');
check('Chi ngày', ls2.amLich.chiNgay, 'Ngọ');

console.log('\n--- Mệnh Cục ---');
check('Mệnh', ls2.menh, 'Sơn Hạ Hỏa');
check('Cục', ls2.cuc.ten, 'Kim tứ cục');
check('Sao chủ cục', ls2.saosChuCuc, 'Vũ Khúc');
check('Mệnh chủ', ls2.menhChu, 'Văn Khúc');
check('Thân chủ', ls2.thanChu, 'Thiên Đồng');

console.log('\n--- Cung ---');
check('Cung Mệnh', ls2.cungMenh, 'Mão');
check('Âm Dương', ls2.amDuongQuan, 'Âm Dương thuận lý');

const ls2_menh = getChinhTinhInCung(ls2.cungs, 'Mệnh');
console.log('Sao cung Mệnh (Mão):', ls2_menh.join(', '));
check('Cung Mệnh có Thái Dương', ls2_menh.includes('Thái Dương'), true);
check('Cung Mệnh có Thiên Lương', ls2_menh.includes('Thiên Lương'), true);

check('Thân cư Quan Lộc', ls2.cungThan, 'Mùi');

console.log('\n--- Đại Hạn ---');
check('Tuổi 2026', ls2.tuoi, 10);

// ============================================================
// LÁ SỐ 3: PHAN GIA ĐẠT
// Input: Âm Nam, 2011-07-26, 19h55
// ============================================================
console.log('\n========== LÁ SỐ 3: PHAN GIA ĐẠT ==========\n');
const ls3 = lapLaSo('Phan Gia Đạt', 26, 7, 2011, 19, 55, 'Nam', 2026);

console.log('--- Âm lịch ---');
check('Năm âm lịch', ls3.amLich.tenNam, 'Tân Mão');
check('Tháng âm lịch', ls3.amLich.thang, 6);
check('Ngày âm lịch', ls3.amLich.ngay, 26);
check('Can ngày', ls3.amLich.canNgay, 'Nhâm');
check('Chi ngày', ls3.amLich.chiNgay, 'Ngọ');

console.log('\n--- Mệnh Cục ---');
check('Mệnh', ls3.menh, 'Tùng Bách Mộc');
check('Cục', ls3.cuc.ten, 'Hỏa lục cục');
check('Sao chủ cục', ls3.saosChuCuc, 'Liêm Trinh');
check('Mệnh chủ', ls3.menhChu, 'Văn Khúc');
check('Thân chủ', ls3.thanChu, 'Thiên Đồng');

console.log('\n--- Cung ---');
check('Cung Mệnh', ls3.cungMenh, 'Dậu');
check('Âm Dương', ls3.amDuongQuan, 'Âm Dương thuận lý');

const ls3_menh = getChinhTinhInCung(ls3.cungs, 'Mệnh');
console.log('Sao cung Mệnh (Dậu):', ls3_menh.join(', '));
check('Cung Mệnh có Thiên Cơ', ls3_menh.includes('Thiên Cơ'), true);
check('Cung Mệnh có Cự Môn', ls3_menh.includes('Cự Môn'), true);

check('Thân cư Tài Bạch', ls3.cungThan, 'Tỵ');
check('Mệnh sinh Cục', ls3.menhCucQuan, 'Mệnh sinh Cục');

console.log('\n--- Đại Hạn ---');
check('Tuổi 2026', ls3.tuoi, 16);

console.log('\n========== HOÀN THÀNH ==========\n');
