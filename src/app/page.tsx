'use client'

import React, { useState } from 'react'
import InputForm, { FormData } from '../components/InputForm'
import LasoChart from '../components/LasoChart'
import { lapLaSo, LasoResult } from '../engine/index'

export default function HomePage() {
  const [result, setResult]   = useState<LasoResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  function handleSubmit(data: FormData) {
    setLoading(true)
    setError(null)
    try {
      const r = lapLaSo(
        data.hoTen,
        data.ngaySinh,
        data.thangSinh,
        data.namSinh,
        data.gioSinh,
        data.phutSinh,
        data.gioiTinh,
        data.namXem,
      )
      setResult(r)
      setTimeout(() => {
        document.getElementById('laso-output')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (e: unknown) {
      setError((e as Error)?.message ?? 'Có lỗi xảy ra. Vui lòng kiểm tra thông tin nhập.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Header ───────────────────────────────────── */}
      <header style={{ background: 'var(--ink)', borderBottom: '3px solid var(--sienna)' }}>
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Decorative seal */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
              style={{
                background: 'radial-gradient(circle, #7a3c18, #3d1a08)',
                border: '1.5px solid var(--gold-light)',
                color: 'var(--gold-light)',
                boxShadow: '0 0 12px rgba(180,130,40,0.2)',
                fontFamily: 'var(--font-display)',
              }}
            >
              紫
            </div>
            <div>
              <h1
                className="text-lg font-bold tracking-wide leading-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--parchment)' }}
              >
                Tử Vi Đẩu Số
              </h1>
              <p className="text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: 'var(--gold-light)', opacity: 0.8 }}>
                Lập lá số trực tuyến
              </p>
            </div>
          </div>

          <div
            className="hidden sm:flex items-center gap-1.5 text-[0.62rem] tracking-wider uppercase"
            style={{ color: 'rgba(249,243,227,0.35)' }}
          >
            <span className="inline-block w-1 h-1 rounded-full" style={{ background: 'var(--gold-light)', opacity: 0.6 }} />
            Tính toán tại trình duyệt
            <span className="inline-block w-1 h-1 rounded-full" style={{ background: 'var(--gold-light)', opacity: 0.6 }} />
            Không lưu dữ liệu
          </div>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────── */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">

          {/* ── Sidebar ────────────────────────────────── */}
          <aside className="no-print lg:sticky lg:top-6">
            <div className="card p-5">
              {/* Card header */}
              <div className="mb-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-7 h-7 rounded flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: 'var(--parchment-deep)', color: 'var(--sienna)', fontFamily: 'var(--font-display)' }}
                  >
                    命
                  </div>
                  <div>
                    <div className="section-eyebrow">Nhập Thông Tin</div>
                    <div className="text-[0.7rem] text-[var(--muted-light)] mt-0.5">Ngày tháng năm sinh dương lịch</div>
                  </div>
                </div>
                <div className="h-px" style={{ background: 'var(--parchment-border)' }} />
              </div>

              <InputForm onSubmit={handleSubmit} loading={loading} />
            </div>

            {/* Legend */}
            {result && (
              <div
                className="mt-4 rounded-lg p-4 text-[0.67rem] space-y-1.5"
                style={{ background: 'var(--parchment-deep)', border: '1px solid var(--parchment-border)' }}
              >
                <p className="section-eyebrow mb-2">Chú giải màu sắc</p>
                {[
                  { color: 'var(--color-chinh)', label: 'Chính tinh', bold: true },
                  { color: 'var(--color-sat)',   label: 'Sát tinh (Kình, Đà, Hỏa, Linh…)' },
                  { color: 'var(--color-cat)',   label: 'Cát tinh' },
                  { color: 'var(--color-loc)',   label: 'Hóa Lộc / Lộc Tồn' },
                  { color: 'var(--color-ky)',    label: 'Hóa Kỵ' },
                  { color: 'var(--color-quyen)', label: 'Hóa Quyền' },
                  { color: 'var(--color-khoa)',  label: 'Hóa Khoa' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: item.color }}
                    />
                    <span style={{ fontWeight: item.bold ? 700 : 400, color: 'var(--ink-light)' }}>{item.label}</span>
                  </div>
                ))}
                <div className="pt-1" style={{ borderTop: '1px solid var(--parchment-border)' }}>
                  <span className="text-[var(--muted-light)]">(M) Miếu · (V) Vượng · (Đ) Đắc · (H) Hãm</span>
                </div>
                <div className="text-[var(--muted-light)]">
                  ĐV.Hóa = bản mệnh · L.Hóa = lưu niên
                </div>
              </div>
            )}
          </aside>

          {/* ── Main content ───────────────────────────── */}
          <section id="laso-output">

            {/* Empty state */}
            {!result && !error && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div
                  className="mb-5 select-none"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '5rem',
                    lineHeight: 1,
                    background: 'linear-gradient(160deg, var(--parchment-border) 30%, var(--sienna) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ☯
                </div>
                <p className="text-base font-semibold mb-1" style={{ color: 'var(--muted)', fontFamily: 'var(--font-serif)' }}>
                  Nhập thông tin để lập lá số
                </p>
                <p className="text-sm" style={{ color: 'var(--muted-light)' }}>
                  Hỗ trợ lịch dương 1900–2100
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                className="rounded-lg p-4 text-sm"
                style={{ background: '#fff5f5', border: '1px solid #f5c0b8', color: '#8a1c10' }}
              >
                <p className="font-semibold mb-1">⚠ Lỗi tính toán</p>
                <p>{error}</p>
              </div>
            )}

            {/* Result */}
            {result && (
              <div>
                {/* Result header */}
                <div className="no-print flex items-center justify-between mb-4">
                  <div>
                    <div className="section-eyebrow">Lá Số Tử Vi</div>
                    <h2
                      className="text-xl font-bold mt-0.5"
                      style={{ color: 'var(--vermilion)', fontFamily: 'var(--font-display)' }}
                    >
                      {result.hoTen}
                    </h2>
                  </div>
                  {/* Quick info pills */}
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {[
                      result.amLich.tenNam,
                      result.menh,
                      result.cuc.ten,
                    ].map(v => (
                      <span
                        key={v}
                        className="text-[0.67rem] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: 'var(--parchment-deep)', color: 'var(--sienna)', border: '1px solid var(--parchment-border)' }}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                <LasoChart result={result} />

                {/* Đại hạn table */}
                <div className="no-print mt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center text-xs flex-shrink-0"
                      style={{ background: 'var(--parchment-deep)', color: 'var(--sienna)', fontFamily: 'var(--font-display)' }}
                    >
                      限
                    </div>
                    <span className="section-eyebrow">Bảng Đại Hạn</span>
                  </div>
                  <div className="card overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-[0.72rem] border-collapse">
                        <thead>
                          <tr style={{ background: 'var(--ink)', color: 'var(--parchment)' }}>
                            <th className="px-3 py-2.5 text-left font-semibold tracking-wide">Cung</th>
                            <th className="px-3 py-2.5 text-center font-semibold tracking-wide">Tuổi</th>
                            <th className="px-3 py-2.5 text-left font-semibold tracking-wide">Chính tinh</th>
                            <th className="px-3 py-2.5 text-left font-semibold tracking-wide">Tràng sinh</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.daiHans.map((dh, i) => {
                            const cungData = result.cungs.find(c => c.chi === dh.chiCung)
                            const chinhTinhs = cungData?.saos
                              .filter(s => s.loai === 'chinh')
                              .map(s => s.ten)
                              .join(', ') ?? ''
                            const isActive = result.tuoi >= dh.tuoi && result.tuoi <= dh.den
                            return (
                              <tr
                                key={i}
                                style={{
                                  background: isActive
                                    ? 'rgba(181,53,26,0.06)'
                                    : i % 2 === 0 ? 'white' : 'var(--parchment)',
                                  borderBottom: '1px solid var(--parchment-border)',
                                  fontWeight: isActive ? 600 : 400,
                                }}
                              >
                                <td className="px-3 py-2">
                                  <span className="font-bold" style={{ color: 'var(--sienna)' }}>{dh.chiCung}</span>
                                  {' '}
                                  <span className="text-[0.65rem]" style={{ color: 'var(--muted-light)' }}>
                                    ({cungData?.ten})
                                  </span>
                                  {isActive && (
                                    <span
                                      className="ml-2 text-[0.58rem] font-bold px-1.5 py-0.5 rounded-full"
                                      style={{ background: 'var(--vermilion)', color: 'white' }}
                                    >
                                      Hiện tại
                                    </span>
                                  )}
                                </td>
                                <td className="px-3 py-2 text-center" style={{ color: 'var(--ink-light)' }}>
                                  {dh.tuoi}–{dh.den}
                                </td>
                                <td className="px-3 py-2" style={{ color: 'var(--ink)' }}>{chinhTinhs}</td>
                                <td className="px-3 py-2 italic" style={{ color: 'var(--muted-light)' }}>{cungData?.truongSinh}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Thông tin âm lịch */}
                <div className="no-print mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { label: 'Năm', value: result.amLich.tenNam },
                    { label: 'Tháng', value: `${result.amLich.tenThang} (${result.amLich.thang}${result.amLich.nhuan ? ' nhuận' : ''})` },
                    { label: 'Ngày', value: `${result.amLich.tenNgay} (${result.amLich.ngay})` },
                    { label: 'Cục', value: result.cuc.ten },
                  ].map(item => (
                    <div
                      key={item.label}
                      className="card px-3 py-2.5 text-center"
                      style={{ background: 'var(--parchment-deep)' }}
                    >
                      <div className="section-eyebrow mb-0.5">{item.label}</div>
                      <div className="text-[0.8rem] font-semibold" style={{ color: 'var(--ink-light)' }}>{item.value}</div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </section>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────── */}
      <footer
        className="no-print mt-auto py-5 text-center text-[0.62rem] tracking-wide"
        style={{ borderTop: '1px solid var(--parchment-border)', color: 'var(--muted-light)' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <p>Tử Vi Đẩu Số — Tính toán hoàn toàn tại trình duyệt, không lưu thông tin cá nhân.</p>
          <p className="mt-1 opacity-60">Kết quả mang tính tham khảo.</p>
        </div>
      </footer>

    </div>
  )
}
