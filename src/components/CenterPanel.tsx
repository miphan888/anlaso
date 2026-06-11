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
    huyenKhi > 3  ? 'var(--jade)' :
    huyenKhi > 0  ? 'var(--gold)' :
    huyenKhi > -3 ? 'var(--sienna)' : 'var(--vermilion)'

  const menhCucColor =
    menhCucQuan.includes('sinh') ? 'var(--jade)' :
    menhCucQuan.includes('khắc') ? 'var(--vermilion)' : 'var(--muted)'

  return (
    <div
      className="flex flex-col justify-between p-3 h-full"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Tiêu đề */}
      <div className="text-center mb-1.5">
        <div
          className="text-[0.5rem] font-bold tracking-[0.14em] uppercase mb-1"
          style={{ color: 'var(--sienna)', opacity: 0.6 }}
        >
          Tử Vi Đẩu Số
        </div>
        <div
          className="font-bold tracking-wide"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem',
            color: 'var(--ink)',
          }}
        >
          Lá Số
        </div>
        <div
          className="font-bold text-[0.9rem] mt-0.5"
          style={{ color: 'var(--vermilion)', fontFamily: 'var(--font-serif)' }}
        >
          {hoTen}
        </div>
        <div className="mt-1.5 h-px mx-4" style={{ background: 'var(--parchment-border)' }} />
      </div>

      {/* Thông tin cá nhân */}
      <div className="space-y-[3px] text-[0.7rem]">
        <Row label="Năm sinh"   value={`${namSinh}`}
          extra={<Tag>{amLich.tenNam}</Tag>} />
        <Row label="Tháng"      value={`DL ${thangSinh} · AL ${amLich.thang}`}
          extra={<span style={{ color: 'var(--muted)' }}> {amLich.tenThang}</span>} />
        <Row label="Ngày"       value={`DL ${ngaySinh} · AL ${amLich.ngay}`}
          extra={<span style={{ color: 'var(--muted)' }}> {amLich.tenNgay}</span>} />
        <Row label="Giờ sinh"
          value={`${gioSinh}:${phutSinh.toString().padStart(2,'0')}`}
          extra={<span style={{ color: 'var(--muted)' }}> {getGioName(gioSinh, phutSinh)}</span>} />
        <Row label="Giới tính"  value={`${amDuong} · ${gioiTinh}`} bold />
      </div>

      <Divider />

      {/* Mệnh Cục */}
      <div className="space-y-[3px] text-[0.7rem]">
        <Row label="Mệnh"       value={menh}         valueStyle={{ color: 'var(--vermilion)', fontWeight: 700 }} />
        <Row label="Cục"        value={cuc.ten}      valueStyle={{ color: 'var(--sienna)', fontWeight: 600 }} />
        <Row label="Sao chủ cục" value={saosChuCuc}  valueStyle={{ color: 'var(--cobalt)' }} />
        <Row label="Mệnh chủ"   value={menhChu}      valueStyle={{ color: 'var(--jade)', fontWeight: 600 }} />
        <Row label="Thân chủ"   value={thanChu}      valueStyle={{ color: 'var(--jade)', fontWeight: 600 }} />
      </div>

      <Divider />

      {/* Năm hạn */}
      <div className="space-y-[3px] text-[0.7rem]">
        <Row label="Năm xem"    value={`${namXem}`}
          extra={<Tag>{canNamHan} {chiNamHan}</Tag>} />
        {daiHanHienTai && (
          <Row label="Đại hạn"
            value={`${daiHanHienTai.chiCung}`}
            extra={<span style={{ color: 'var(--sienna)', fontWeight: 600 }}> {daiHanHienTai.tuoi}–{daiHanHienTai.den} tuổi</span>} />
        )}
        <Row label="Tiểu hạn"   value={`cung ${tieuHan.chiCung}`} />
        <Row label="Huyền khí"  value={huyenKhi.toString()}
          valueStyle={{ color: huyenKhiColor, fontWeight: 700 }} />
      </div>

      <Divider />

      {/* Kết luận */}
      <div className="text-center space-y-[2px]">
        <div className="text-[0.7rem] font-bold" style={{ color: 'var(--vermilion)' }}>
          {amDuongQuan}
        </div>
        <div className="text-[0.7rem] font-semibold" style={{ color: menhCucColor }}>
          {menhCucQuan}
        </div>
        {cungThan !== cungMenh && (
          <div className="text-[0.68rem]" style={{ color: 'var(--cobalt)', fontWeight: 600 }}>
            Thân cư {cungThanTen}
          </div>
        )}
        <div className="text-[0.62rem] mt-1" style={{ color: 'var(--muted-light)' }}>
          {tuoi} tuổi
        </div>
      </div>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────── */

function Divider() {
  return <div className="h-px my-1.5" style={{ background: 'var(--parchment-border)' }} />
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="ml-1 px-1.5 py-0.5 rounded text-[0.6rem] font-semibold"
      style={{ background: 'var(--parchment-deep)', color: 'var(--sienna)', border: '1px solid var(--parchment-border)' }}
    >
      {children}
    </span>
  )
}

interface RowProps {
  label: string
  value: string
  extra?: React.ReactNode
  bold?: boolean
  valueStyle?: React.CSSProperties
}
function Row({ label, value, extra, bold, valueStyle }: RowProps) {
  return (
    <div className="flex items-baseline justify-between gap-1">
      <span className="flex-shrink-0 text-[0.65rem]" style={{ color: 'var(--muted-light)' }}>{label}</span>
      <span
        className="text-right leading-snug"
        style={{ color: 'var(--ink-light)', fontWeight: bold ? 600 : 400, ...valueStyle }}
      >
        {value}{extra}
      </span>
    </div>
  )
}

function getGioName(gio: number, phut: number): string {
  const names = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi']
  const totalMin = gio * 60 + phut
  let idx: number
  if (totalMin >= 23 * 60 || totalMin < 1 * 60) idx = 0
  else idx = Math.floor((totalMin - 60) / 120) + 1
  return `Giờ ${names[idx % 12]}`
}
