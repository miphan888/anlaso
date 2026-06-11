'use client'

import React, { useRef } from 'react'
import { LasoResult } from '../engine/index'
import CungCell from './CungCell'
import CenterPanel from './CenterPanel'

interface LasoChartProps {
  result: LasoResult
}

const GRID_POSITIONS: Record<string, { col: number; row: number }> = {
  'Tỵ':   { col: 1, row: 1 },
  'Ngọ':  { col: 2, row: 1 },
  'Mùi':  { col: 3, row: 1 },
  'Thân': { col: 4, row: 1 },
  'Thìn': { col: 1, row: 2 },
  'Dậu':  { col: 4, row: 2 },
  'Mão':  { col: 1, row: 3 },
  'Tuất': { col: 4, row: 3 },
  'Dần':  { col: 1, row: 4 },
  'Sửu':  { col: 2, row: 4 },
  'Tý':   { col: 3, row: 4 },
  'Hợi':  { col: 4, row: 4 },
}

export default function LasoChart({ result }: LasoChartProps) {
  const { cungs, cungThan, tuoi } = result

  return (
    <div className="w-full">
      {/* Print button */}
      <div className="no-print flex justify-end mb-3">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 text-[0.72rem] px-3 py-1.5 rounded-md transition-all"
          style={{
            color: 'var(--muted)',
            border: '1px solid var(--parchment-border)',
            background: 'white',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--sienna)'
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--sienna)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)'
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--parchment-border)'
          }}
        >
          🖨 In lá số
        </button>
      </div>

      {/* Lá số grid */}
      <div
        className="laso-grid"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          minHeight: '640px',
        }}
      >
        {cungs.map(cung => {
          const pos = GRID_POSITIONS[cung.chi]
          if (!pos) return null
          return (
            <CungCell
              key={cung.chi}
              cung={cung}
              isThan={cung.chi === cungThan}
              tuoi={tuoi}
              style={{ gridColumn: pos.col, gridRow: pos.row }}
            />
          )
        })}

        {/* Ô trung tâm 2×2 */}
        <div
          style={{
            gridColumn: '2 / 4',
            gridRow: '2 / 4',
            background: 'linear-gradient(145deg, #fffdf5 0%, #fdf8e8 100%)',
          }}
        >
          <CenterPanel result={result} />
        </div>
      </div>

      {/* Legend */}
      <div className="no-print mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.67rem]" style={{ color: 'var(--muted)' }}>
        {[
          { cls: 'sao-chinh', label: 'Chính tinh', bold: true },
          { cls: 'sao-sat',   label: 'Sát tinh' },
          { cls: 'sao-cat',   label: 'Cát tinh' },
          { cls: 'sao-loc',   label: 'Hóa Lộc / Lộc Tồn' },
          { cls: 'sao-ky',    label: 'Hóa Kỵ' },
          { cls: 'sao-quyen', label: 'Hóa Quyền' },
          { cls: 'sao-khoa',  label: 'Hóa Khoa' },
        ].map(item => (
          <span key={item.label} className={`flex items-center gap-1 ${item.cls}`} style={{ fontWeight: item.bold ? 700 : 400 }}>
            ● {item.label}
          </span>
        ))}
        <span style={{ color: 'var(--muted-light)' }}>| (M) Miếu · (V) Vượng · (Đ) Đắc · (H) Hãm</span>
      </div>
    </div>
  )
}
