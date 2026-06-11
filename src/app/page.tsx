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
      // Scroll to chart on mobile
      setTimeout(() => {
        document.getElementById('laso-output')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (e: any) {
      setError(e?.message ?? 'Có lỗi xảy ra. Vui lòng kiểm tra thông tin nhập.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#fefaf0' }}>

      {/* ── Header ── */}
      <header className="border-b border-[#d4c4a8] bg-[#1c1410] text-[#f5deb3]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1
              className="text-[1.1rem] font-bold tracking-wide"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              ✦ Tử Vi Đẩu Số
            </h1>
            <p className="text-[0.65rem] text-[#c8a87a] tracking-widest uppercase">
              Lập lá số trực tuyến
            </p>
          </div>
          <div className="text-[0.65rem] text-[#9a8070] hidden sm:block text-right">
            Tính toán client-side<br />Không lưu dữ liệu
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">

          {/* ── Sidebar: form ── */}
          <aside className="no-print">
            {/* Tiêu đề form */}
            <div className="mb-5">
              <div className="ornament-divider text-[0.65rem] mb-3">
                <span className="text-[#8B4513] font-semibold tracking-widest uppercase">
                  Nhập Thông Tin
                </span>
              </div>
              <p className="text-[0.72rem] text-[#7a6a58] leading-relaxed">
                Nhập ngày tháng năm sinh dương lịch. Hệ thống sẽ tự động
                chuyển sang âm lịch và lập đầy đủ lá số Tử Vi.
              </p>
            </div>

            <div
              className="bg-white rounded-xl shadow-sm border border-[#e8dcc8] p-5"
            >
              <InputForm onSubmit={handleSubmit} loading={loading} />
            </div>

            {/* Hướng dẫn đọc */}
            <div className="mt-4 bg-[#fdf3d7] border border-[#e8c87a] rounded-lg p-3 text-[0.68rem] text-[#5a4a3a] space-y-1">
              <p className="font-semibold text-[#8B4513]">Hướng dẫn màu sắc:</p>
              <p><span className="font-bold text-[#1c1410]">Đen đậm</span> = Chính diệu</p>
              <p><span className="font-bold text-[#c0392b]">Đỏ</span> = Sát tinh (Kình, Đà, Hỏa, Linh, Không, Kiếp…)</p>
              <p><span className="font-bold text-[#27744a]">Xanh lá</span> = Cát tinh</p>
              <p><span className="font-bold text-[#b8860b]">Vàng</span> = Hóa Lộc / Lộc Tồn</p>
              <p><span className="font-bold text-[#1a4e8c]">Xanh đậm</span> = Hóa Kỵ</p>
              <p><span className="font-bold text-[#8B4513]">Nâu</span> = Hóa Quyền</p>
              <p><span className="font-bold text-[#2e7d6e]">Ngọc</span> = Hóa Khoa</p>
              <p className="text-[#9a8070]">ĐV.Hóa X = Hóa theo bản mệnh · L.Hóa X = Hóa lưu niên</p>
            </div>
          </aside>

          {/* ── Main: chart ── */}
          <section id="laso-output">
            {!result && !error && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div
                  className="text-6xl mb-4 opacity-20"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                >
                  ☯
                </div>
                <p className="text-[#9a8070] text-sm">
                  Nhập thông tin bên trái để lập lá số
                </p>
                <p className="text-[0.68rem] text-[#b8a888] mt-1">
                  Hỗ trợ lịch dương 1900–2100
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                <p className="font-semibold mb-1">⚠ Lỗi tính toán</p>
                <p>{error}</p>
              </div>
            )}

            {result && (
              <div>
                {/* Tiêu đề kết quả */}
                <div className="ornament-divider text-[0.65rem] mb-4 no-print">
                  <span className="text-[#8B4513] font-semibold tracking-widest uppercase">
                    Lá Số — {result.hoTen}
                  </span>
                </div>

                <LasoChart result={result} />

                {/* ── Bảng Đại Hạn chi tiết ── */}
                <div className="no-print mt-6">
                  <div className="ornament-divider text-[0.65rem] mb-3">
                    <span className="text-[#8B4513] font-semibold tracking-widest uppercase">
                      Bảng Đại Hạn
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[0.72rem] border-collapse">
                      <thead>
                        <tr className="bg-[#1c1410] text-[#f5deb3]">
                          <th className="px-3 py-2 text-left font-semibold">Cung</th>
                          <th className="px-3 py-2 text-center font-semibold">Tuổi</th>
                          <th className="px-3 py-2 text-left font-semibold">Chính tinh</th>
                          <th className="px-3 py-2 text-left font-semibold">Tràng sinh</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.daiHans.map((dh, i) => {
                          const cungData = result.cungs.find(c => c.chi === dh.chiCung)
                          const chinhTinhs = cungData?.saos
                            .filter(s => s.loai === 'chinh')
                            .map(s => `${s.ten}(${s.mucDo ?? ''})`)
                            .join(', ') ?? ''
                          const isActive = result.tuoi >= dh.tuoi && result.tuoi <= dh.den
                          return (
                            <tr
                              key={i}
                              className={`border-b border-[#e8dcc8] ${isActive ? 'bg-[#fdf3d7] font-semibold' : i % 2 === 0 ? 'bg-white' : 'bg-[#fefaf5]'}`}
                            >
                              <td className="px-3 py-1.5">
                                <span className="font-bold text-[#8B4513]">{dh.chiCung}</span>
                                {' '}
                                <span className="text-[#7a6a58] text-[0.65rem]">({cungData?.ten})</span>
                                {isActive && <span className="ml-1 text-[0.6rem] bg-[#c0392b] text-white px-1 rounded">Hiện tại</span>}
                              </td>
                              <td className="px-3 py-1.5 text-center text-[#3d2b1f]">
                                {dh.tuoi}–{dh.den}
                              </td>
                              <td className="px-3 py-1.5 text-[#1c1410]">{chinhTinhs}</td>
                              <td className="px-3 py-1.5 text-[#7a6a58] italic">{cungData?.truongSinh}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ── Thông tin âm lịch ── */}
                <div className="no-print mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  {[
                    { label: 'Năm', value: result.amLich.tenNam },
                    { label: 'Tháng', value: `${result.amLich.tenThang} (${result.amLich.thang}${result.amLich.nhuan ? ' nhuận' : ''})` },
                    { label: 'Ngày', value: `${result.amLich.tenNgay} (${result.amLich.ngay})` },
                    { label: 'Cục', value: result.cuc.ten },
                  ].map(item => (
                    <div key={item.label} className="bg-white border border-[#e8dcc8] rounded-lg px-3 py-2">
                      <div className="text-[0.6rem] text-[#9a8070] uppercase tracking-wider mb-0.5">{item.label}</div>
                      <div className="text-[0.78rem] font-semibold text-[#3d2b1f]">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="no-print mt-12 border-t border-[#d4c4a8] py-4 text-center text-[0.65rem] text-[#9a8070]">
        <p>Tử Vi Đẩu Số — Tính toán hoàn toàn tại trình duyệt, không lưu thông tin cá nhân.</p>
        <p className="mt-1 opacity-60">Kết quả mang tính tham khảo, không thay thế tư vấn chuyên gia.</p>
      </footer>
    </div>
  )
}
