import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#07110c',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 24,
            border: '1px solid rgba(196,154,60,0.4)',
          }}
        />
        <div style={{ color: '#f4efe4', fontSize: 64, fontWeight: 600, textAlign: 'center', display: 'flex' }}>
          Les Bons Plans d&apos;Arabie
        </div>
        <div style={{ color: '#c49a3c', fontSize: 28, marginTop: 24, letterSpacing: 4, display: 'flex' }}>
          Institut · Camp bédouin · Médine
        </div>
      </div>
    ),
    { ...size }
  )
}
