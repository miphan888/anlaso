// ============================================================
// INDEX - Hàm lapLaSo() tổng hợp
// ============================================================

import { THIEN_CAN, DIA_CHI, ThienCan, DiaChi, CHI_INDEX, canNam, chiNam, chiGio } from './can-chi';
import { getAmLich, AmLich } from './calendar';
import { getMenh, getNguHanhMenh, getCuc, getSaosChuCuc, getMenhChu, getThanChu, getMenhCucQuan, CucInfo } from './menh-cuc';
import { anMenh, anThan, lap12Cung, CungInfo, CungName, isThuanCung, getAmDuongNam } from './an-cung';
import { an14ChinhTinh, ChinhTinh, getMucDo, MucDo } from './an-chinh-tinh';
import { getTuHoa, getTuHoaOfSao, TuHoaType, getTuHoaLuuNien } from './an-tu-hoa';
import { anLocTon, anLocTonBo, LOC_TON_TABLE } from './an-loc-ton';
import { anThaiTue, anThaiTueBo } from './an-thai-tue';
import { anTruongSinhBo, getTruongSinhOfCung } from './an-truong-sinh';
import { getTuan, getTriet } from './an-tuan-triet';
import { tinhDaiHan, tinhTieuHan, tinhTuoi, getCanNamHan, getChiNamHan, DaiHan, TieuHan } from './dai-han';
import { getGioIndex, anKinhDuong, anDaLa, anHoaTinh, anLinhTinh, anDiaKiep, anDiaKhong } from './an-sat-tinh';
import * as Phu from './an-phu-tinh';

// ============================================================
// Kiểu dữ liệu output
// ============================================================

export interface SaoTrongCung {
  ten: string;
  loai: 'chinh' | 'sat' | 'cat' | 'phu' | 'han';  // loại sao
  mucDo?: MucDo;
  tuHoa?: TuHoaType;
  tuHoaLuuNien?: TuHoaType;
}

export interface CungData {
  chi: DiaChi;
  ten: CungName;
  saos: SaoTrongCung[];
  truongSinh?: string;
  daiHan?: DaiHan;
  tuanTriet: { tuan: boolean; triet: boolean };
}

export interface LasoResult {
  // Input
  hoTen: string;
  ngaySinh: number;
  thangSinh: number;
  namSinh: number;
  gioSinh: number;
  phutSinh: number;
  gioiTinh: 'Nam' | 'Nữ';
  amDuong: 'Dương' | 'Âm';
  namXem: number;

  // Âm lịch
  amLich: AmLich;

  // Mệnh Cục
  menh: string;
  nguHanhMenh: string;
  cuc: CucInfo;
  saosChuCuc: string;
  menhChu: string;
  thanChu: string;
  menhCucQuan: string;
  amDuongQuan: string; // 'Âm Dương thuận lý' | 'Âm Dương nghịch lý'

  // Cung
  cungMenh: DiaChi;
  cungThan: DiaChi;
  cungs: CungData[];

  // Hạn
  tuoi: number;
  canNamHan: ThienCan;
  chiNamHan: DiaChi;
  daiHans: DaiHan[];
  tieuHan: TieuHan;
  daiHanHienTai?: DaiHan;
  cungThanTen?: CungName;

  // Tuần Triệt
  tuanChi: DiaChi[];
  trietChi: DiaChi[];

  // Huyền Khí (điểm tổng hợp, tính đơn giản)
  huyenKhi: number;
}

// ============================================================
// Hàm chính
// ============================================================

export function lapLaSo(
  hoTen: string,
  ngaySinh: number,
  thangSinh: number,
  namSinh: number,
  gioSinh: number,
  phutSinh: number,
  gioiTinh: 'Nam' | 'Nữ',
  namXem: number
): LasoResult {

  // 1. Âm lịch
  const amLich = getAmLich(ngaySinh, thangSinh, namSinh, gioSinh, phutSinh);
  const { canNam: canNamVal, chiNam: chiNamVal, canNgay, chiNgay, thang: thangAm, ngay: ngayAm } = amLich;

  // 2. Âm Dương
  const amDuong = getAmDuongNam(chiNamVal); // Âm/Dương của năm sinh
  const isThuan = isThuanCung(gioiTinh, amDuong);
  const amDuongQuan = isThuan ? 'Âm Dương thuận lý' : 'Âm Dương nghịch lý';

  // 3. Mệnh Cục
  const menh = getMenh(canNamVal, chiNamVal);
  const nguHanhMenh = getNguHanhMenh(menh);
  const menhChu = getMenhChu(chiNamVal);
  const thanChu = getThanChu(chiNamVal);

  // 4. An Mệnh & Thân
  const cungMenh = anMenh(thangAm, gioSinh, phutSinh);
  const cungThan = anThan(thangAm, gioSinh, phutSinh);

  // 5. Cục
  const cuc = getCuc(canNamVal, cungMenh);
  const saosChuCuc = getSaosChuCuc(cuc);
  const menhCucQuan = getMenhCucQuan(nguHanhMenh, cuc.loai);

  // 6. 12 Cung
  const cungs12 = lap12Cung(cungMenh);
  const cungThanTen = cungs12.find(c => c.chi === cungThan)?.ten;

  // 7. 14 Chính tinh
  const chinhTinhs = an14ChinhTinh(ngayAm, cuc);

  // 8. Tứ Hóa
  const tuHoa = getTuHoa(canNamVal);
  const canNamHan = getCanNamHan(namXem);
  const tuHoaHan = getTuHoaLuuNien(canNamHan);

  // 9. Lộc Tồn
  const locTonChi = anLocTon(canNamVal);
  const locTonBo = anLocTonBo(canNamVal, isThuan);

  // 10. Thái Tuế bộ
  const thaiTueBo = anThaiTueBo(chiNamVal);

  // 11. Tràng Sinh bộ
  const truongSinhBo = anTruongSinhBo(cuc, isThuan);

  // 12. Tuần Triệt
  const tuanChi = getTuan(canNgay, chiNgay);
  const trietChi = getTriet(canNamVal);

  // 13. Sát tinh
  const gioIdx = getGioIndex(gioSinh, phutSinh);
  const kinhDuongChi = anKinhDuong(canNamVal);
  const daLaChi = anDaLa(canNamVal);
  const hoaTinhChi = anHoaTinh(chiNamVal, gioIdx, isThuan);
  const linhTinhChi = anLinhTinh(chiNamVal, gioIdx, isThuan);
  const diaKiepChi = anDiaKiep(gioIdx);
  const diaKhongChi = anDiaKhong(gioIdx);

  // 14. Phụ tinh
  const taPhuChi   = Phu.anTaPhu(thangAm);
  const huuBatChi  = Phu.anHuuBat(thangAm);
  const vanXuongChi= Phu.anVanXuong(gioIdx);
  const vanKhucChi = Phu.anVanKhuc(gioIdx);
  const khoiChi    = Phu.anKhoi(canNamVal);
  const vietChi    = Phu.anViet(canNamVal);
  const hongLoanChi= Phu.anHongLoan(chiNamVal);
  const thienHiChi = Phu.anThienHi(chiNamVal);
  const longTriChi = Phu.anLongTri(chiNamVal);
  const phuongCacChi = Phu.anPhuongCac(chiNamVal);
  const daoHoaChi  = Phu.anDaoHoa(chiNamVal);
  const thienMaChi = Phu.anThienMa(chiNamVal);
  const coThanChi  = Phu.anCoThan(chiNamVal);
  const quaTuChi   = Phu.anQuaTu(chiNamVal);
  const thienHinhChi = Phu.anThienHinh(thangAm);
  const thienRieuChi = Phu.anThienRieu(thangAm);
  const thienGiaiChi = Phu.anThienGiai(thangAm);
  const diaGiaiChi   = Phu.anDiaGiai(thangAm);
  const tamThaiChi   = Phu.anTamThai(taPhuChi, ngayAm);
  const batToaChi    = Phu.anBatToa(huuBatChi, ngayAm);
  const anQuangChi   = Phu.anAnQuang(vanXuongChi, ngayAm);
  const thienQuyPhuChi = Phu.anThienQuy(vanKhucChi, ngayAm);
  const thienDucChi  = Phu.anThienDuc(chiNamVal);
  const nguyetDucChi = Phu.anNguyetDuc(chiNamVal);
  const thaiPhuChi   = Phu.anThaiPhu(gioIdx);
  const phongCaoChi  = Phu.anPhongCao(gioIdx);
  const thienTaiChi  = Phu.anThienTai(cungMenh, chiNamVal);
  const thienThoChi  = Phu.anThienTho(cungThan, chiNamVal);
  const khoiPhuChi   = Phu.anThienQuan(canNamVal);
  const phaToaiChi   = Phu.anPhaToai(chiNamVal);
  const hoaCaiChi    = Phu.anHoaCai(chiNamVal);
  const kiepSatChi   = Phu.anKiepSat(chiNamVal);
  const khocChi      = Phu.anKhoc(chiNamVal);
  const huChi        = Phu.anHu(chiNamVal);
  const thienKhongChi= Phu.anThienKhong(chiNamVal);
  const thienQuanChi = Phu.anThienQuan(canNamVal);
  const thienPhucSaoChi = Phu.anThienPhucSao(canNamVal);
  const luuHaChi     = Phu.anLuuHa(canNamVal);
  const thienTruChi  = Phu.anThienTru(canNamVal);
  const dauQuanChi   = Phu.anDauQuan(chiNamVal, thangAm, gioIdx);

  // 15. Đại Hạn
  const tuoi = tinhTuoi(namSinh, namXem);
  const chiNamHan = getChiNamHan(namXem);
  const daiHans = tinhDaiHan(cungMenh, cuc, isThuan, namSinh);
  const daiHanHienTai = daiHans.find(dh => tuoi >= dh.tuoi && tuoi <= dh.den);
  const tieuHan = tinhTieuHan(namXem, namSinh, isThuan, gioiTinh);

  // 16. Tập hợp tất cả sao theo cung
  // Map: chi → list of stars
  type SaoItem = { ten: string; loai: SaoTrongCung['loai']; mucDo?: MucDo };
  const saoMap = new Map<DiaChi, SaoItem[]>();
  DIA_CHI.forEach(chi => saoMap.set(chi, []));

  function addSao(chi: DiaChi, ten: string, loai: SaoTrongCung['loai'], mucDo?: MucDo) {
    saoMap.get(chi)?.push({ ten, loai, mucDo });
  }

  // Chính tinh
  chinhTinhs.forEach(ct => addSao(ct.chi, ct.ten, 'chinh', ct.mucDo));

  // Sát tinh
  addSao(kinhDuongChi, 'Kình Dương', 'sat');
  addSao(daLaChi, 'Đà La', 'sat');
  addSao(hoaTinhChi, 'Hỏa Tinh', 'sat');
  addSao(linhTinhChi, 'Linh Tinh', 'sat');
  addSao(diaKiepChi, 'Địa Kiếp', 'sat');
  addSao(diaKhongChi, 'Địa Không', 'sat');

  // Cát tinh
  addSao(locTonChi, 'Lộc Tồn', 'cat');
  addSao(taPhuChi, 'Tả Phù', 'phu');
  addSao(huuBatChi, 'Hữu Bật', 'phu');
  addSao(vanXuongChi, 'Văn Xương', 'phu');
  addSao(vanKhucChi, 'Văn Khúc', 'phu');
  addSao(khoiChi, 'Thiên Khôi', 'cat');
  addSao(vietChi, 'Thiên Việt', 'cat');
  addSao(hongLoanChi, 'Hồng Loan', 'phu');
  addSao(thienHiChi, 'Thiên Hỉ', 'phu');
  addSao(longTriChi, 'Long Trì', 'phu');
  addSao(phuongCacChi, 'Phượng Các', 'phu');
  addSao(daoHoaChi, 'Đào Hoa', 'phu');
  addSao(thienMaChi, 'Thiên Mã', 'cat');
  addSao(coThanChi, 'Cô Thần', 'sat');
  addSao(quaTuChi, 'Quả Tú', 'sat');
  addSao(thienHinhChi, 'Thiên Hình', 'sat');
  addSao(thienRieuChi, 'Thiên Riêu', 'phu');
  addSao(thienRieuChi, 'Thiên Y', 'cat'); // cùng cung Thiên Riêu
  addSao(thienGiaiChi, 'Thiên Giải', 'cat');
  addSao(diaGiaiChi, 'Địa Giải', 'cat');
  addSao(tamThaiChi, 'Tam Thai', 'cat');
  addSao(batToaChi, 'Bát Tọa', 'cat');
  addSao(anQuangChi, 'Ân Quang', 'cat');
  addSao(thienQuyPhuChi, 'Thiên Quý', 'cat');
  addSao(thienDucChi, 'Thiên Đức', 'cat');
  addSao(nguyetDucChi, 'Nguyệt Đức', 'cat');
  addSao(thaiPhuChi, 'Thai Phụ', 'phu');
  addSao(phongCaoChi, 'Phong Cáo', 'phu');
  addSao(thienTaiChi, 'Thiên Tài', 'cat');
  addSao(thienThoChi, 'Thiên Thọ', 'cat');
  addSao(phaToaiChi, 'Phá Toái', 'sat');
  addSao(hoaCaiChi, 'Hoa Cái', 'phu');
  addSao(kiepSatChi, 'Kiếp Sát', 'sat');
  addSao(khocChi, 'Thiên Khốc', 'sat');
  addSao(huChi, 'Thiên Hư', 'sat');
  addSao(thienKhongChi, 'Thiên Không', 'sat');
  addSao(thienQuanChi, 'Thiên Quan', 'cat');
  addSao(thienPhucSaoChi, 'Thiên Phúc', 'cat');
  addSao(luuHaChi, 'Lưu Hà', 'phu');
  addSao(thienTruChi, 'Thiên Trù', 'cat');
  addSao(dauQuanChi, 'Đẩu Quân', 'phu');

  // Cố định
  addSao('Thìn', 'Thiên La', 'sat');
  addSao('Tuất', 'Địa Võng', 'sat');

  // Thái Tuế bộ
  Object.entries(thaiTueBo).forEach(([ten, chi]) => addSao(chi, ten, 'phu'));

  // Lộc Tồn bộ
  Object.entries(locTonBo).forEach(([ten, chi]) => {
    if (ten !== 'Bác Sĩ') addSao(chi, ten, 'phu'); // Bác Sĩ đã ở cùng Lộc Tồn
    else addSao(chi, ten, 'phu');
  });

  // Thiên Sứ & Thiên Thương: thêm theo vị trí cung
  // Sẽ được gán ở tầng UI theo cung Tật Ách và Nô Bộc

  // 17. Tập hợp CungData
  const cungsData: CungData[] = cungs12.map(cungInfo => {
    const rawSaos = saoMap.get(cungInfo.chi) || [];

    const saos: SaoTrongCung[] = rawSaos.map(s => {
      const tuHoaVal = getTuHoaOfSao(canNamVal, s.ten);
      const tuHoaHanVal = getTuHoaOfSao(canNamHan, s.ten);
      return {
        ...s,
        tuHoa: tuHoaVal || undefined,
        tuHoaLuuNien: tuHoaHanVal || undefined,
      };
    });

    const truongSinh = getTruongSinhOfCung(cungInfo.chi, cuc, isThuan);
    const daiHan = daiHans.find(dh => dh.chiCung === cungInfo.chi);

    return {
      chi: cungInfo.chi,
      ten: cungInfo.ten,
      saos,
      truongSinh,
      daiHan,
      tuanTriet: {
        tuan: tuanChi.includes(cungInfo.chi),
        triet: trietChi.includes(cungInfo.chi),
      }
    };
  });

  // Thêm Thiên Thương (Nô Bộc) & Thiên Sứ (Tật Ách)
  cungsData.forEach(cung => {
    if (cung.ten === 'Nô Bộc') {
      cung.saos.push({ ten: 'Thiên Thương', loai: 'sat' });
    }
    if (cung.ten === 'Tật Ách') {
      cung.saos.push({ ten: 'Thiên Sứ', loai: 'sat' });
    }
  });

  // 18. Huyền Khí (điểm phong thủy đơn giản, tham khảo)
  let huyenKhi = 0;
  const menhCungData = cungsData.find(c => c.ten === 'Mệnh');
  if (menhCungData) {
    menhCungData.saos.forEach(s => {
      if (s.loai === 'cat') huyenKhi += 1;
      if (s.loai === 'sat') huyenKhi -= 1;
      if (s.tuHoa === 'Lộc') huyenKhi += 2;
      if (s.tuHoa === 'Quyền') huyenKhi += 1.5;
      if (s.tuHoa === 'Khoa') huyenKhi += 1;
      if (s.tuHoa === 'Kỵ') huyenKhi -= 2;
    });
  }

  return {
    hoTen, ngaySinh, thangSinh, namSinh, gioSinh, phutSinh,
    gioiTinh, amDuong, namXem,
    amLich,
    menh, nguHanhMenh, cuc, saosChuCuc, menhChu, thanChu,
    menhCucQuan, amDuongQuan,
    cungMenh, cungThan,
    cungs: cungsData,
    tuoi, canNamHan, chiNamHan,
    daiHans, tieuHan, daiHanHienTai,
    cungThanTen,
    tuanChi, trietChi,
    huyenKhi: parseFloat(huyenKhi.toFixed(2))
  };
}

export type { DaiHan, TieuHan, CungInfo, CucInfo, MucDo, TuHoaType };
