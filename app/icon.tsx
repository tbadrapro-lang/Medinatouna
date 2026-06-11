import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #12301e, #040d08)',
        }}
      >
        <span style={{ color: '#c49a3c', fontSize: 20, fontWeight: 700 }}>ب</span>
      </div>
    ),
    { ...size }
  )
}
