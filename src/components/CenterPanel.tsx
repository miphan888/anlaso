'use client'

import React from 'react'
import { LasoResult } from '../engine/index'

interface CenterPanelProps {
  result: LasoResult
}

export default function CenterPanel({ result }: CenterPanelProps) {
  const {
    hoTen, namSinh, thangSinh, ngaySinh, gioSinh, phutSinh,
    gioiTinh, amDuong, namXem,
    amLich, menh, cuc, saosChuCuc, menhChu, thanChu,
    menhCucQuan, amDuongQuan,
    cungMenh, cungThan, cungThanTen,
    tuoi, canNamHan, chiNamHan,
    daiHanHienTai, tieuHan, huyenKhi,
  } = result

  const huyenKhiColor =
    huyenKhi > 3  ? '#27744a' :
    huyenKhi > 0  ? '#b8860b' :
    huyenKhi > -3 ? '#8B4513' : '#c0392b'

  const menhCucColor =
    menhCucQuan.includes('sinh') ? '#27744a' :
    menhCucQuan.includes('khắc') ? '#c0392b' : '#5a4a3a'

  return (
    <div className="center-panel flex flex-col justify-between p-3 h-full">
      {/* ── Tiêu đề ── */}
      <div className="text-center mb-2">
        <div className="text-[0.55rem] font-semibold tracking-[0.12em] text-[#8B4513] uppercase opacity-70 mb-1">
          Nhóm Nghiên Cứu Tử Vi Cổ Học
        </div>
        <div
          className="font-display text-[1rem] font-bold tracking-wide text-[#1c1410]"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          Lá Số Tử Vi
        </div>
        <div className="ornament-divider mt-1 text-[0.6rem]">✦</div>
      </div>

      {/* ── Thông tin cá nhân ── */}
      <div className="space-y-[3px] text-[0.72rem]">
        <Row label="Họ tên" value={hoTen} valueClass="font-bold text-[#c0392b]" />
        <Row
          label="Năm sinh"
          value={`${namSinh}`}
          extra={<span className="text-[#8B4513] font-semibold ml-1">{amLich.tenNam}</span>}
        />
        <Row
          label="Tháng sinh"
          value={`${thangSinh} (${amLich.thang})`}
          extra={<span className="text-[#5a4a3a] ml-1">{amLich.tenThang}</span>}
        />
        <Row
          label="Ngày sinh"
          value={`${ngaySinh} (${amLich.ngay})`}
          extra={<span className="text-[#5a4a3a] ml-1">{amLich.tenNgay}</span>}
        />
        <Row
          label="Giờ sinh"
          value={`${gioSinh} giờ ${phutSinh.toString().padStart(2,'0')} phút`}
          extra={<span className="text-[#5a4a3a] ml-1">{amLich.chiNam && getGioName(gioSinh, phutSinh)}</span>}
        />
      </div>

      <div className="border-t border-[#d4c4a8] my-2" />

      {/* ── Năm hạn ── */}
      <div className="space-y-[3px] text-[0.72rem]">
        <Row
          label="Năm hạn"
          value={`${namXem}`}
          extra={<span className="text-[#8B4513] font-semibold ml-1">{canNamHan} {chiNamHan}</span>}
        />
        <Row label="Âm dương" value={`${amDuong} ${gioiTinh}`} valueClass="font-semibold" />
        <Row label="Mệnh" value={menh} valueClass="font-bold text-[#c0392b]" />
        <Row label="Cục" value={cuc.ten} valueClass="font-semibold text-[#8B4513]" />
        <Row label="Sao chủ cục" value={saosChuCuc} valueClass="text-[#1a4e8c]" />
        <Row label="Mệnh chủ" value={menhChu} valueClass="text-[#27744a] font-semibold" />
        <Row label="Thân chủ" value={thanChu} valueClass="text-[#27744a] font-semibold" />
      </div>

      <div className="border-t border-[#d4c4a8] my-2" />

      {/* ── Cung Thân + Đại/Tiểu hạn ── */}
      <div className="space-y-[3px] text-[0.72rem]">
        <Row label="Lai nhân cung" value={cungThanTen || ''} />
        {daiHanHienTai && (
          <Row
            label="Nguyên thần"
            value={`${daiHanHienTai.chiCung}`}
            extra={<span className="text-[#8B4513] ml-1 font-semibold">{daiHanHienTai.tuoi}–{daiHanHienTai.den} tuổi</span>}
          />
        )}
        <Row label="Huyền khí" value={huyenKhi.toString()} valueClass="font-bold" valueStyle={{ color: huyenKhiColor }} />
      </div>

      <div className="border-t border-[#d4c4a8] my-2" />

      {/* ── Luận đoán tổng ── */}
      <div className="space-y-[2px]">
        <div
          className="text-[0.72rem] font-bold text-center"
          style={{ color: '#c0392b' }}
        >
          {amDuongQuan}
        </div>
        <div
          className="text-[0.72rem] font-bold text-center"
          style={{ color: menhCucColor }}
        >
          {menhCucQuan}
        </div>
        {cungThan !== cungMenh && (
          <div className="text-[0.72rem] text-center text-[#1a4e8c] font-semibold">
            Thân cư {cungThanTen}
          </div>
        )}
      </div>

      {/* ── Tuổi hiện tại ── */}
      <div className="text-center mt-2">
        <span className="text-[0.62rem] text-[#9a8070]">
          {tuoi} tuổi · Tiểu hạn cung {tieuHan.chiCung}
        </span>
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────
interface RowProps {
  label: string
  value: string
  extra?: React.ReactNode
  valueClass?: string
  valueStyle?: React.CSSProperties
}
function Row({ label, value, extra, valueClass, valueStyle }: RowProps) {
  return (
    <div className="flex items-baseline justify-between gap-1">
      <span className="text-[#7a6a58] flex-shrink-0 text-[0.68rem]">{label}:</span>
      <span className={`text-right leading-snug ${valueClass ?? 'text-[#1c1410]'}`} style={valueStyle}>
        {value}{extra}
      </span>
    </div>
  )
}

// ── Tên giờ ───────────────────────────────────────────────────
function getGioName(gio: number, phut: number): string {
  const names = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi']
  const totalMin = gio * 60 + phut
  let idx: number
  if (totalMin >= 23 * 60 || totalMin < 1 * 60) idx = 0
  else idx = Math.floor((totalMin - 60) / 120) + 1
  return `Giờ ${names[idx % 12]}`
}
