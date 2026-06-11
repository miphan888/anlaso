'use client'

import React from 'react'
import { CungData, SaoTrongCung, MucDo, TuHoaType } from '../engine/index'

// ── helpers ──────────────────────────────────────────────────
function mdClass(md?: MucDo): string {
  const map: Record<string, string> = { M: 'mdo-M', V: 'mdo-V', Đ: 'mdo-D', B: 'mdo-B', H: 'mdo-H' }
  return md ? map[md] ?? '' : ''
}

function mdLabel(md?: MucDo): string {
  if (!md || md === 'B') return ''
  return `(${md})`
}

function tuHoaClass(t?: TuHoaType): string {
  if (!t) return ''
  return t === 'Lộc' ? 'sao-loc' : t === 'Kỵ' ? 'sao-ky' : t === 'Quyền' ? 'sao-quyen' : 'sao-khoa'
}

function tuHoaPrefix(t?: TuHoaType, isHan?: boolean): string {
  if (!t) return ''
  const p = isHan ? 'L.' : 'ĐV.'
  return `${p}Hóa ${t}`
}

// ── SaoRow ────────────────────────────────────────────────────
interface SaoRowProps { sao: SaoTrongCung; compact?: boolean }

function SaoRow({ sao, compact }: SaoRowProps) {
  const { ten, loai, mucDo, tuHoa, tuHoaLuuNien } = sao

  // Determine display class
  let cls = 'sao-phu'
  if (loai === 'chinh') cls = 'sao-chinh'
  else if (loai === 'sat') cls = 'sao-sat'
  else if (loai === 'cat') cls = 'sao-cat'
  if (tuHoa === 'Lộc') cls = 'sao-loc'
  else if (tuHoa === 'Kỵ') cls = 'sao-ky'
  else if (tuHoa === 'Quyền') cls = 'sao-quyen'
  else if (tuHoa === 'Khoa') cls = 'sao-khoa'

  const md = mdLabel(mucDo)
  const mdCls = mdClass(mucDo)

  return (
    <div className="leading-[1.25] flex items-baseline gap-[2px] flex-wrap">
      {/* Lưu niên tứ hóa prefix (màu nhạt hơn) */}
      {tuHoaLuuNien && (
        <span className={`sao-prefix ${tuHoaClass(tuHoaLuuNien)} opacity-80`}>
          {tuHoaPrefix(tuHoaLuuNien, true)}
        </span>
      )}
      {/* Bản mệnh tứ hóa prefix */}
      {tuHoa && (
        <span className={`sao-prefix ${tuHoaClass(tuHoa)}`}>
          {tuHoaPrefix(tuHoa, false)}
        </span>
      )}
      <span className={cls}>
        {ten}
        {md && <span className={`${mdCls} text-[0.6rem] ml-[1px]`}>{md}</span>}
      </span>
    </div>
  )
}

// ── CungCell ─────────────────────────────────────────────────
interface CungCellProps {
  cung: CungData
  isThan?: boolean
  tuoi?: number
  style?: React.CSSProperties
}

export default function CungCell({ cung, isThan, tuoi, style }: CungCellProps) {
  const { chi, ten, saos, truongSinh, daiHan, tuanTriet } = cung

  // Phân loại sao
  const chinhTinhs = saos.filter(s => s.loai === 'chinh')
  const satTinhs   = saos.filter(s => s.loai === 'sat')
  const catTinhs   = saos.filter(s => s.loai === 'cat')
  const phuTinhs   = saos.filter(s => s.loai === 'phu')

  // Sao có tứ hóa (bản mệnh hoặc lưu niên) → hiển thị ở trên cùng
  const tuHoaSaos  = saos.filter(s => s.tuHoa || s.tuHoaLuuNien)
  const otherSaos  = saos.filter(s => !s.tuHoa && !s.tuHoaLuuNien && s.loai !== 'chinh')

  const hasTuan  = tuanTriet.tuan
  const hasTriet = tuanTriet.triet
  const isActive = daiHan && tuoi && tuoi >= daiHan.tuoi && tuoi <= daiHan.den

  return (
    <div
      className={`cung-cell ${isActive ? 'ring-2 ring-inset ring-[#c0392b]' : ''}`}
      style={style}
    >
      {/* ── Header row: cung tên + chi + đại hạn ── */}
      <div className="flex items-start justify-between mb-[3px]">
        <div className="flex flex-col">
          <span className="cung-label">{ten}</span>
          <div className="flex items-center gap-1">
            <span className="cung-chi">{chi}</span>
            {isThan && (
              <span className="than-badge">THÂN</span>
            )}
          </div>
        </div>
        {daiHan && (
          <div className="text-right flex-shrink-0 ml-1">
            <div className="dai-han-num">{daiHan.tuoi}</div>
            {truongSinh && (
              <div className="truong-sinh-label">{truongSinh.replace('Tràng Sinh', 'T.Sinh')}</div>
            )}
          </div>
        )}
      </div>

      {/* ── Tuần / Triệt ── */}
      {(hasTuan || hasTriet) && (
        <div className="flex gap-1 mb-1">
          {hasTuan  && <span className="tuan-triet-bar tuan-bar">Tuần</span>}
          {hasTriet && <span className="tuan-triet-bar triet-bar">Triệt</span>}
        </div>
      )}

      {/* ── Tràng sinh (khi không có đại hạn) ── */}
      {!daiHan && truongSinh && (
        <div className="truong-sinh-label mb-[2px]">{truongSinh}</div>
      )}

      {/* ── Chính tinh ── */}
      {chinhTinhs.map(s => <SaoRow key={s.ten} sao={s} />)}

      {/* ── Separator nếu có chính tinh và còn sao khác ── */}
      {chinhTinhs.length > 0 && (satTinhs.length > 0 || catTinhs.length > 0 || phuTinhs.length > 0 || tuHoaSaos.length > 0) && (
        <div className="border-t border-[#e0d0b8] my-[3px]" />
      )}

      {/* ── Tứ hóa sao ── */}
      {tuHoaSaos.filter(s => s.loai !== 'chinh').map(s => <SaoRow key={`th-${s.ten}`} sao={s} />)}

      {/* ── Sát tinh ── */}
      {satTinhs.map(s => <SaoRow key={s.ten} sao={s} />)}

      {/* ── Cát tinh ── */}
      {catTinhs.filter(s => !s.tuHoa && !s.tuHoaLuuNien).map(s => <SaoRow key={s.ten} sao={s} />)}

      {/* ── Phụ tinh ── */}
      {phuTinhs.filter(s => !s.tuHoa && !s.tuHoaLuuNien).map(s => <SaoRow key={s.ten} sao={s} />)}
    </div>
  )
}
