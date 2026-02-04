import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

interface QuestionCardProps {
  onYes: () => void
}

export default function QuestionCard({ onYes }: QuestionCardProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [noScale, setNoScale] = useState(1)
  const [escaped, setEscaped] = useState(false)
  const [escapeCount, setEscapeCount] = useState(0)
  const noBtnRef = useRef<HTMLButtonElement>(null)
  const yesBtnRef = useRef<HTMLButtonElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const msgRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const messages = [
    '¿Segura? 🤔',
    '¡Piénsalo bien! 😢',
    '¡No me hagas esto! 💔',
    '¡Será increíble! 😤',
    '¡Intenta otra vez! 😏',
    '¡Ese botón no funciona! 🚫',
    '¡Dale al otro! ➡️',
    '¡Ya casi! 😜',
  ]

  const escapeNo = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight

    const noBtn = noBtnRef.current
    if (!noBtn) return
    const noBtnRect = noBtn.getBoundingClientRect()
    const noBtnWidth = noBtn.offsetWidth
    const noBtnHeight = noBtn.offsetHeight

    // Collect all rects to avoid
    const avoidRects: DOMRect[] = []
    if (yesBtnRef.current) avoidRects.push(yesBtnRef.current.getBoundingClientRect())
    if (titleRef.current) avoidRects.push(titleRef.current.getBoundingClientRect())
    if (msgRef.current) avoidRects.push(msgRef.current.getBoundingClientRect())
    if (imageRef.current) avoidRects.push(imageRef.current.getBoundingClientRect())

    const safeMargin = 30
    const edgePadding = 24

    // Calculate the No button's original center (before any transform)
    // When escaped=false, button is in flow. When escaped=true, it's absolute.
    // We need to compute offset relative to current position.
    const currentCenterX = noBtnRect.left + noBtnRect.width / 2
    const currentCenterY = noBtnRect.top + noBtnRect.height / 2

    let bestX = 0
    let bestY = 0
    let bestDist = 0

    for (let attempt = 0; attempt < 30; attempt++) {
      // Random position anywhere on screen with edge padding
      const candidateLeft = edgePadding + Math.random() * (vw - noBtnWidth - edgePadding * 2)
      const candidateTop = edgePadding + Math.random() * (vh - noBtnHeight - edgePadding * 2)
      const candidateRight = candidateLeft + noBtnWidth
      const candidateBottom = candidateTop + noBtnHeight

      // Check overlap with all avoid rects
      let overlaps = false
      for (const rect of avoidRects) {
        if (
          candidateLeft < rect.right + safeMargin &&
          candidateRight > rect.left - safeMargin &&
          candidateTop < rect.bottom + safeMargin &&
          candidateBottom > rect.top - safeMargin
        ) {
          overlaps = true
          break
        }
      }

      if (overlaps) continue

      // Distance from current position (prefer far away)
      const candCenterX = candidateLeft + noBtnWidth / 2
      const candCenterY = candidateTop + noBtnHeight / 2
      const dist = Math.sqrt(
        (candCenterX - currentCenterX) ** 2 + (candCenterY - currentCenterY) ** 2
      )

      if (dist > bestDist) {
        bestDist = dist
        // Convert to offset from current center
        bestX = candCenterX - currentCenterX + noPosition.x
        bestY = candCenterY - currentCenterY + noPosition.y
      }
    }

    if (bestDist > 0) {
      setNoPosition({ x: bestX, y: bestY })
    }

    setEscaped(true)
    setNoScale(Math.max(0.85, noScale - 0.02))
    setEscapeCount((prev) => prev + 1)
  }, [noScale, noPosition])

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.6 }}
      style={{ minHeight: '100dvh' }}
    >
      {/* Circular image */}
      <motion.div
        ref={imageRef}
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid rgba(253, 164, 175, 0.4)',
          boxShadow: '0 4px 20px rgba(251, 113, 133, 0.2)',
          marginBottom: 20,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
      >
        <img
          src={import.meta.env.BASE_URL + 'carta-image-1.jpeg'}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>

      {/* The question */}
      <motion.h2
        ref={titleRef}
        className="font-script text-rose-600 drop-shadow-sm leading-tight"
        style={{ fontSize: 'clamp(2.2rem, 9vw, 4.5rem)', marginBottom: 16 }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        ¿Quieres ser
        <br />
        mi Valentín?
      </motion.h2>

      {/* Escape message */}
      <div ref={msgRef} style={{ height: 28, marginBottom: 24 }}>
        {escapeCount > 0 && (
          <motion.p
            key={escapeCount}
            style={{ color: '#fb7185', fontSize: '0.95rem' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {messages[Math.min(escapeCount - 1, messages.length - 1)]}
          </motion.p>
        )}
      </div>

      {/* Buttons row - side by side */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        {/* YES button */}
        <motion.button
          ref={yesBtnRef}
          onClick={onYes}
          className="btn-yes-valentine"
          style={{ zIndex: 20 }}
          animate={{
            scale: [1, 1.04, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.97 }}
        >
          ¡Sí! <span className="btn-heart-icon">🤍</span>
        </motion.button>

        {/* NO button - escapes far away! */}
        <motion.button
          ref={noBtnRef}
          className="btn-no-valentine"
          animate={{
            x: noPosition.x,
            y: noPosition.y,
            scale: noScale,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          onHoverStart={escapeNo}
          onTouchStart={(e) => {
            e.preventDefault()
            escapeNo()
          }}
        >
          No 😢
        </motion.button>
      </div>
    </motion.div>
  )
}
