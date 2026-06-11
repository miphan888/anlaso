'use client'

import React from 'react'
import { CungData, SaoTrongCung, MucDo, TuHoaType } from '../engine/index'

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
  return `${isHan ? 'L.' : 'ĐV.'}Hóa ${t}`
}

interface SaoRowProps { sao: SaoTrongCung }

function SaoRow({ sao }: SaoRowProps) {
  const { ten, loai, mucDo, tuHoa, tuHoaLuuNien } = sao

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
      {tuHoaLuuNien && (
        <span className={`sao-prefix ${tuHoaClass(tuHoaLuuNien)} opacity-75`}>
          {tuHoaPrefix(tuHoaLuuNien, true)}
        </span>
      )}
      {tuHoa && (
        <span className={`sao-prefix ${tuHoaClass(tuHoa)}`}>
          {tuHoaPrefix(tuHoa, false)}
        </span>
      )}
      <span className={cls}>
        {ten}
        {md && <span className={`${mdCls} text-[0.59rem] ml-[1px]`}>{md}</span>}
      </span>
    </div>
  )
}

interface CungCellProps {
  cung: CungData
  isThan?: boolean
  tuoi?: number
  style?: React.CSSProperties
}

export default function CungCell({ cung, isThan, tuoi, style }: CungCellProps) {
  const { chi, ten, saos, truongSinh, daiHan, tuanTriet } = cung

  const chinhTinhs = saos.filter(s => s.loai === 'chinh')
  const satTinhs   = saos.filter(s => s.loai === 'sat')
  const catTinhs   = saos.filter(s => s.loai === 'cat')
  const phuTinhs   = saos.filter(s => s.loai === 'phu')
  const tuHoaSaos  = saos.filter(s => s.tuHoa || s.tuHoaLuuNien)

  const hasTuan  = tuanTriet.tuan
  const hasTriet = tuanTriet.triet
  const isActive = daiHan && tuoi && tuoi >= daiHan.tuoi && tuoi <= daiHan.den

  return (
    <div
      className="cung-cell"
      style={{
        ...style,
        ...(isActive ? {
          background: 'linear-gradient(145deg, #fdf6e8 0%, #fceee0 100%)',
          boxShadow: 'inset 0 0 0 1.5px rgba(181,53,26,0.35)',
        } : {}),
      }}
    >
      {/* Header: tên cung + chi + đại hạn */}
      <div className="flex items-start justify-between mb-[2px]">
        <div className="flex flex-col leading-tight">
          <span className="cung-label">{ten}</span>
          <div className="flex items-center gap-1 mt-[1px]">
            <span className="cung-chi">{chi}</span>
            {isThan && <span className="than-badge">THÂN</span>}
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

      {/* Tuần / Triệt */}
      {(hasTuan || hasTriet) && (
        <div className="flex gap-1 mb-[2px]">
          {hasTuan  && <span className="tuan-triet-bar tuan-bar">Tuần</span>}
          {hasTriet && <span className="tuan-triet-bar triet-bar">Triệt</span>}
        </div>
      )}

      {/* Tràng sinh khi không có đại hạn */}
      {!daiHan && truongSinh && (
        <div className="truong-sinh-label mb-[2px]">{truongSinh}</div>
      )}

      {/* Chính tinh */}
      {chinhTinhs.map(s => <SaoRow key={s.ten} sao={s} />)}

      {/* Separator */}
      {chinhTinhs.length > 0 && (satTinhs.length > 0 || catTinhs.length > 0 || phuTinhs.length > 0) && (
        <div className="my-[2px]" style={{ borderTop: '1px solid var(--parchment-border)', opacity: 0.7 }} />
      )}

      {/* Tứ hóa sao */}
      {tuHoaSaos.filter(s => s.loai !== 'chinh').map(s => <SaoRow key={`th-${s.ten}`} sao={s} />)}

      {/* Sát tinh */}
      {satTinhs.map(s => <SaoRow key={s.ten} sao={s} />)}

      {/* Cát tinh */}
      {catTinhs.filter(s => !s.tuHoa && !s.tuHoaLuuNien).map(s => <SaoRow key={s.ten} sao={s} />)}

      {/* Phụ tinh */}
      {phuTinhs.filter(s => !s.tuHoa && !s.tuHoaLuuNien).map(s => <SaoRow key={s.ten} sao={s} />)}
    </div>
  )
}
