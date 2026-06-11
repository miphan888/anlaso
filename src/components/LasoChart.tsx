'use client'

import React, { useRef } from 'react'
import { LasoResult, CungData } from '../engine/index'
import CungCell from './CungCell'
import CenterPanel from './CenterPanel'

interface LasoChartProps {
  result: LasoResult
}

/**
 * Bố cục lá số 4×4 (12 cung quanh + ô trung tâm 2×2):
 *
 *  [Tỵ ]  [Ngọ]  [Mùi]  [Thân]     row 1
 *  [Thìn] [ CENTER   ] [Dậu ]     row 2
 *  [Mão ] [ CENTER   ] [Tuất]     row 3
 *  [Dần ] [Sửu ]  [Tý ]  [Hợi ]     row 4
 *
 * Vị trí trong CSS grid (1-indexed col, row):
 */
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
  const printRef = useRef<HTMLDivElement>(null)
  const { cungs, cungThan, tuoi } = result

  function handlePrint() {
    window.print()
  }

  return (
    <div className="w-full">
      {/* ── Print button ── */}
      <div className="flex justify-end mb-2 no-print">
        <button
          onClick={handlePrint}
          className="text-[0.75rem] text-[#8B4513] border border-[#8B4513] px-3 py-1 rounded
                     hover:bg-[#8B4513] hover:text-white transition-colors"
        >
          🖨 In lá số
        </button>
      </div>

      {/* ── Lá số grid ── */}
      <div
        ref={printRef}
        className="laso-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          minHeight: '640px',
          border: '2px solid #8B4513',
          borderRadius: '6px',
          overflow: 'hidden',
          background: '#3d2b1f',
          gap: '1px',
        }}
      >
        {/* ── 12 cung ── */}
        {cungs.map(cung => {
          const pos = GRID_POSITIONS[cung.chi]
          if (!pos) return null
          const isThan = cung.chi === cungThan

          return (
            <CungCell
              key={cung.chi}
              cung={cung}
              isThan={isThan}
              tuoi={tuoi}
              style={{
                gridColumn: pos.col,
                gridRow: pos.row,
              }}
            />
          )
        })}

        {/* ── Ô trung tâm 2×2 ── */}
        <div
          style={{
            gridColumn: '2 / 4',
            gridRow: '2 / 4',
            background: '#fffdf5',
          }}
        >
          <CenterPanel result={result} />
        </div>
      </div>

      {/* ── Chú thích màu ── */}
      <div className="no-print mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.68rem] text-[#5a4a3a]">
        <LegendItem color="var(--color-chinh)" label="Chính tinh" bold />
        <LegendItem color="var(--color-sat)"   label="Sát tinh" />
        <LegendItem color="var(--color-cat)"   label="Cát tinh" />
        <LegendItem color="var(--color-loc)"   label="Hóa Lộc / Lộc Tồn" />
        <LegendItem color="var(--color-ky)"    label="Hóa Kỵ" />
        <LegendItem color="var(--color-quyen)" label="Hóa Quyền" />
        <LegendItem color="var(--color-khoa)"  label="Hóa Khoa" />
        <span className="text-[#9a8070]">| (M)=Miếu (V)=Vượng (Đ)=Đắc (H)=Hãm</span>
      </div>
    </div>
  )
}

function LegendItem({ color, label, bold }: { color: string; label: string; bold?: boolean }) {
  return (
    <span className="flex items-center gap-1">
      <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
      <span style={{ fontWeight: bold ? 700 : 400 }}>{label}</span>
    </span>
  )
}
