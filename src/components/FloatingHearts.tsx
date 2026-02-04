import { useEffect, useRef } from 'react'

interface Heart {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  swing: number
  swingSpeed: number
  phase: number
}

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const hearts: Heart[] = []
    const HEART_COUNT = 25

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < HEART_COUNT; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 12 + 6,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
        swing: Math.random() * 30 + 10,
        swingSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const drawHeart = (x: number, y: number, size: number, opacity: number) => {
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.fillStyle = '#fda4af'
      ctx.beginPath()
      const topX = x
      const topY = y - size / 2
      ctx.moveTo(topX, topY + size / 4)
      ctx.bezierCurveTo(topX, topY, topX - size / 2, topY, topX - size / 2, topY + size / 4)
      ctx.bezierCurveTo(topX - size / 2, topY + size / 2, topX, topY + size * 0.625, topX, topY + size * 0.8)
      ctx.bezierCurveTo(topX, topY + size * 0.625, topX + size / 2, topY + size / 2, topX + size / 2, topY + size / 4)
      ctx.bezierCurveTo(topX + size / 2, topY, topX, topY, topX, topY + size / 4)
      ctx.fill()
      ctx.restore()
    }

    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      for (const heart of hearts) {
        heart.y -= heart.speed
        const swingOffset = Math.sin(time * heart.swingSpeed + heart.phase) * heart.swing

        if (heart.y + heart.size < 0) {
          heart.y = canvas.height + heart.size
          heart.x = Math.random() * canvas.width
        }

        drawHeart(heart.x + swingOffset, heart.y, heart.size, heart.opacity)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
