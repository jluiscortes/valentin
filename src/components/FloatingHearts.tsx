import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  swing: number
  swingSpeed: number
  phase: number
  rotation: number
  rotationSpeed: number
  type: 'heart' | 'petal' | 'sparkle'
  color: string
}

const COLORS = {
  heart: ['#fda4af', '#fb7185', '#f9a8d4'],
  petal: ['#fecdd3', '#fda4af', '#fce7f3', '#fbcfe8'],
  sparkle: ['#fde68a', '#fbbf24', '#ffffff', '#fda4af'],
}

export default function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: Particle[] = []
    const TOTAL = 35

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const pickRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

    for (let i = 0; i < TOTAL; i++) {
      const rand = Math.random()
      const type: Particle['type'] = rand < 0.35 ? 'heart' : rand < 0.75 ? 'petal' : 'sparkle'
      const colorSet = COLORS[type]

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === 'sparkle' ? Math.random() * 4 + 2 : Math.random() * 12 + 6,
        speed: type === 'sparkle' ? Math.random() * 0.3 + 0.1 : Math.random() * 0.5 + 0.2,
        opacity: type === 'sparkle' ? Math.random() * 0.6 + 0.3 : Math.random() * 0.25 + 0.08,
        swing: Math.random() * 30 + 10,
        swingSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        type,
        color: pickRandom(colorSet),
      })
    }

    const drawHeart = (x: number, y: number, size: number, opacity: number, color: string) => {
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.fillStyle = color
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

    const drawPetal = (x: number, y: number, size: number, opacity: number, rotation: number, color: string) => {
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.ellipse(0, 0, size * 0.4, size, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const drawSparkle = (x: number, y: number, size: number, opacity: number, time: number, color: string) => {
      const twinkle = (Math.sin(time * 0.08) + 1) / 2
      ctx.save()
      ctx.globalAlpha = opacity * twinkle
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()

      // Cross sparkle rays
      ctx.strokeStyle = color
      ctx.lineWidth = 0.5
      ctx.globalAlpha = opacity * twinkle * 0.6
      const rayLen = size * 2.5
      ctx.beginPath()
      ctx.moveTo(x - rayLen, y)
      ctx.lineTo(x + rayLen, y)
      ctx.moveTo(x, y - rayLen)
      ctx.lineTo(x, y + rayLen)
      ctx.stroke()
      ctx.restore()
    }

    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      for (const p of particles) {
        p.y -= p.speed
        p.rotation += p.rotationSpeed
        const swingOffset = Math.sin(time * p.swingSpeed + p.phase) * p.swing

        if (p.y + p.size < -20) {
          p.y = canvas.height + p.size + 20
          p.x = Math.random() * canvas.width
        }

        const px = p.x + swingOffset

        if (p.type === 'heart') {
          drawHeart(px, p.y, p.size, p.opacity, p.color)
        } else if (p.type === 'petal') {
          drawPetal(px, p.y, p.size, p.opacity, p.rotation, p.color)
        } else {
          drawSparkle(px, p.y, p.size, p.opacity, time + p.phase * 50, p.color)
        }
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
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
