import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tử Vi Đẩu Số — Lập lá số trực tuyến',
  description: 'Lập lá số Tử Vi Đẩu Số chuẩn xác, đầy đủ 14 chính diệu, phụ tinh, đại hạn, tiểu hạn.',
  keywords: 'tử vi, lá số tử vi, tử vi đẩu số, âm lịch, cung mệnh',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
