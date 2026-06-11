'use client'

import React, { useState } from 'react'

export interface FormData {
  hoTen: string
  ngaySinh: number
  thangSinh: number
  namSinh: number
  gioSinh: number
  phutSinh: number
  gioiTinh: 'Nam' | 'Nữ'
  namXem: number
}

interface InputFormProps {
  onSubmit: (data: FormData) => void
  loading: boolean
}

const CURRENT_YEAR = new Date().getFullYear()

// Mẫu thử nhanh
const SAMPLES = [
  {
    label: 'Phan Gia Bảo',
    data: { hoTen:'Phan Gia Bảo', ngaySinh:16, thangSinh:12, namSinh:2008, gioSinh:9,  phutSinh:30, gioiTinh:'Nam' as const, namXem:2026 },
  },
  {
    label: 'Phan Gia Huy',
    data: { hoTen:'Phan Gia Huy',  ngaySinh:27, thangSinh:11, namSinh:2017, gioSinh:16, phutSinh:55, gioiTinh:'Nam' as const, namXem:2026 },
  },
  {
    label: 'Phan Gia Đạt',
    data: { hoTen:'Phan Gia Đạt',  ngaySinh:26, thangSinh:7,  namSinh:2011, gioSinh:19, phutSinh:55, gioiTinh:'Nam' as const, namXem:2026 },
  },
]

export default function InputForm({ onSubmit, loading }: InputFormProps) {
  const [form, setForm] = useState<FormData>({
    hoTen: '',
    ngaySinh: 1,
    thangSinh: 1,
    namSinh: 1990,
    gioSinh: 6,
    phutSinh: 0,
    gioiTinh: 'Nam',
    namXem: CURRENT_YEAR,
  })

  function set<K extends keyof FormData>(key: K, val: FormData[K]) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function loadSample(d: FormData) {
    setForm(d)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ── Mẫu thử nhanh ── */}
      <div>
        <p className="form-label mb-2">Lá số mẫu (thử nhanh)</p>
        <div className="flex flex-wrap gap-2">
          {SAMPLES.map(s => (
            <button
              key={s.label}
              type="button"
              onClick={() => loadSample(s.data)}
              className="text-[0.75rem] px-3 py-1.5 border border-[#d4c4a8] rounded-md
                         hover:border-[#8B4513] hover:text-[#8B4513] transition-colors bg-white"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#e8dcc8]" />

      {/* ── Họ tên ── */}
      <div>
        <label className="form-label">Họ và tên</label>
        <input
          className="form-input"
          type="text"
          placeholder="Nguyễn Văn A"
          value={form.hoTen}
          onChange={e => set('hoTen', e.target.value)}
          required
        />
      </div>

      {/* ── Ngày / Tháng / Năm sinh ── */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="form-label">Ngày sinh (DL)</label>
          <input
            className="form-input"
            type="number" min={1} max={31}
            value={form.ngaySinh}
            onChange={e => set('ngaySinh', +e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Tháng sinh (DL)</label>
          <input
            className="form-input"
            type="number" min={1} max={12}
            value={form.thangSinh}
            onChange={e => set('thangSinh', +e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Năm sinh (DL)</label>
          <input
            className="form-input"
            type="number" min={1900} max={2100}
            value={form.namSinh}
            onChange={e => set('namSinh', +e.target.value)}
            required
          />
        </div>
      </div>

      {/* ── Giờ / Phút sinh ── */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="form-label">Giờ sinh (0–23)</label>
          <input
            className="form-input"
            type="number" min={0} max={23}
            value={form.gioSinh}
            onChange={e => set('gioSinh', +e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Phút sinh (0–59)</label>
          <input
            className="form-input"
            type="number" min={0} max={59}
            value={form.phutSinh}
            onChange={e => set('phutSinh', +e.target.value)}
            required
          />
        </div>
      </div>

      {/* ── Giới tính ── */}
      <div>
        <label className="form-label">Giới tính</label>
        <div className="flex gap-4 mt-1">
          {(['Nam','Nữ'] as const).map(gt => (
            <label key={gt} className="flex items-center gap-2 cursor-pointer text-sm text-[#3d2b1f]">
              <input
                type="radio"
                name="gioiTinh"
                value={gt}
                checked={form.gioiTinh === gt}
                onChange={() => set('gioiTinh', gt)}
                className="accent-[#8B4513]"
              />
              {gt}
            </label>
          ))}
        </div>
      </div>

      {/* ── Năm xem hạn ── */}
      <div>
        <label className="form-label">Năm xem hạn</label>
        <input
          className="form-input"
          type="number" min={1900} max={2100}
          value={form.namXem}
          onChange={e => set('namXem', +e.target.value)}
          required
        />
      </div>

      {/* ── Submit ── */}
      <div className="pt-1">
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Đang tính…' : '✦ Lập Lá Số'}
        </button>
      </div>

      {/* ── Ghi chú giờ Tý ── */}
      <p className="text-[0.68rem] text-[#9a8070] text-center">
        Giờ Tý (23:00–00:59) thuộc ngày hôm sau theo âm lịch
      </p>
    </form>
  )
}
