import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface HeroProps {
  onContinue: () => void
}

function ScrollIndicator() {
  const [showIndicator, setShowIndicator] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      const needsScroll = scrollHeight > clientHeight + 50

      if (needsScroll && !hasScrolled) {
        setShowIndicator(true)
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setHasScrolled(true)
        setShowIndicator(false)
      }
    }

    const timeout = setTimeout(checkScroll, 1200)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', checkScroll)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [hasScrolled])

  const handleClick = () => {
    window.scrollBy({ top: 200, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          onClick={handleClick}
          className="fixed bottom-4 right-4 z-50 flex flex-col items-center cursor-pointer lg:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.div
            className="flex flex-col items-center"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: 20,
              padding: '8px 16px',
              boxShadow: '0 4px 20px rgba(251, 113, 133, 0.2)',
            }}
          >
            <span style={{ fontSize: '0.65rem', color: '#e11d48', fontWeight: 500, marginBottom: 2 }}>
              desliza
            </span>
            <div className="flex flex-col items-center" style={{ marginTop: -2 }}>
              {[0, 1, 2].map((i) => (
                <motion.svg
                  key={i}
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fb7185"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginTop: i === 0 ? 0 : -14 }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Hero({ onContinue }: HeroProps) {
  return (
    <motion.div
      className="relative z-10 flex items-center justify-center w-full"
      style={{ minHeight: '100dvh', padding: '40px 20px 20px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      {/* Desktop Layout - Two columns */}
      <div className="hidden lg:flex items-center justify-center gap-20 px-8" style={{ marginTop: '-80px' }}>
        {/* Left side - Large image with decorative frame */}
        <motion.div
          className="relative flex-shrink-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.2 }}
        >
          {/* Decorative background glow */}
          <div
            className="absolute -inset-8 rounded-3xl opacity-30"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(251, 113, 133, 0.4) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }}
          />

          {/* Image container */}
          <div className="relative">
            {/* Floating hearts around image */}
            <motion.span
              className="absolute -top-4 -left-4 text-3xl select-none"
              animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              💕
            </motion.span>
            <motion.span
              className="absolute -top-2 -right-6 text-2xl select-none"
              animate={{ y: [0, -6, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              💗
            </motion.span>
            <motion.span
              className="absolute -bottom-4 -left-6 text-2xl select-none"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            >
              🌹
            </motion.span>
            <motion.span
              className="absolute -bottom-2 -right-4 text-3xl select-none"
              animate={{ y: [0, -7, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            >
              💖
            </motion.span>

            <img
              src={import.meta.env.BASE_URL + 'carta-image-1.jpeg'}
              alt="Nosotros"
              className="rounded-3xl shadow-2xl"
              style={{
                width: 420,
                height: 380,
                objectFit: 'cover',
                border: '4px solid rgba(253, 164, 175, 0.3)',
              }}
            />

            {/* Overlay gradient */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(255,241,242,0.3) 0%, transparent 30%)',
              }}
            />
          </div>
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          className="flex flex-col items-center text-center"
          style={{ width: 450, flexShrink: 0, marginTop: 40 }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.4 }}
        >
          {/* Subtitle */}
          <motion.div
            style={{ marginBottom: 20, color: '#fda4af', fontSize: '0.85rem', letterSpacing: '0.5em', textTransform: 'uppercase', fontWeight: 300 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            ~ Para alguien muy especial ~
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-script"
            style={{ fontSize: '3.5rem', color: '#e11d48', marginBottom: 8, lineHeight: 1.2 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            Hola, mi corazoncito
            <br />
            de fresa 🍓
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            style={{ margin: '24px 0 28px' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.3, duration: 0.8, ease: 'easeOut' }}
          >
            <div className="card-divider" style={{ width: 120 }} />
          </motion.div>

          {/* Message */}
          <motion.p
            style={{ color: '#fb7185', fontSize: '1.35rem', fontWeight: 300, lineHeight: 1.8, marginBottom: 20 }}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            Quiero que estés conmigo
            <br />
            este sábado de San Valentín 💝
          </motion.p>

          {/* Extra detail */}
          <motion.p
            style={{ color: '#fda4af', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.6, marginBottom: 16 }}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.6 }}
          >
            Preparé algo especial para los dos 🌹
            <br />
            <span style={{ opacity: 0.8 }}>Solo necesito que abras esto...</span>
          </motion.p>

          {/* Date badge */}
          <motion.div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 24px',
              background: 'rgba(253, 164, 175, 0.15)',
              borderRadius: 30,
              fontSize: '0.95rem',
              color: '#e11d48',
              fontWeight: 500,
              letterSpacing: '0.05em',
              marginBottom: 36,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.5 }}
          >
            📅 Sábado 14 de febrero
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={onContinue}
            className="btn-primary-valentine"
            style={{ padding: '20px 60px', fontSize: '1.3rem' }}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Abrir <span className="btn-heart-icon">🤍</span>
          </motion.button>

          {/* Signature */}
          <motion.p
            className="card-signature"
            style={{ marginTop: 20, fontSize: '1rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            by Jorge
          </motion.p>
        </motion.div>
      </div>

      {/* Mobile Layout - Original card design */}
      <div className="lg:hidden" style={{ position: 'relative', width: '100%', maxWidth: 360, margin: '0 auto' }}>
        {/* Envelope seal - outside overflow:hidden */}
        <motion.div
          className="card-seal"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.6 }}
        >
          <span className="text-3xl sm:text-4xl select-none">💌</span>
        </motion.div>

        {/* Invitation Card */}
        <motion.div
          className="invitation-card"
          style={{ width: '100%', maxWidth: 360 }}
          initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
        >
          {/* Decorative top border */}
          <div className="card-ornament-top" />

          {/* Card Image */}
          <motion.div
            style={{ width: '100%', position: 'relative' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <img
              src={import.meta.env.BASE_URL + 'carta-image-1.jpeg'}
              alt="Nosotros"
              style={{
                width: '100%',
                height: 200,
                display: 'block',
                objectFit: 'cover',
              }}
            />
            <div className="card-image-glow" />
          </motion.div>

          {/* Inner content */}
          <div className="card-content">
            {/* Subtitle */}
            <motion.div
              style={{ marginBottom: 16, color: '#fda4af', fontSize: '0.75rem', letterSpacing: '0.5em', textTransform: 'uppercase', fontWeight: 300 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              ~ Para alguien muy especial ~
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-script"
              style={{ fontSize: 'clamp(1.6rem, 6vw, 2.8rem)', color: '#e11d48', marginBottom: 0, lineHeight: 1.3 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              Hola, mi corazoncito
              <br />
              de fresa 🍓
            </motion.h1>

            {/* Decorative divider */}
            <motion.div
              style={{ margin: '24px 0 28px' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
            >
              <div className="card-divider" />
            </motion.div>

            {/* Message */}
            <motion.p
              style={{ color: '#fb7185', fontSize: 'clamp(0.95rem, 3.5vw, 1.25rem)', fontWeight: 300, lineHeight: 1.7, marginBottom: 16, maxWidth: 280 }}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              Quiero que estés conmigo
              <br />
              este sábado de San Valentín 💝
            </motion.p>

            {/* Extra detail */}
            <motion.p
              style={{ color: '#fda4af', fontSize: 'clamp(0.8rem, 3vw, 0.95rem)', fontWeight: 300, lineHeight: 1.6, marginBottom: 12, maxWidth: 260 }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              Preparé algo especial para los dos 🌹
              <br />
              <span style={{ opacity: 0.8 }}>Solo necesito que abras esto...</span>
            </motion.p>

            {/* Date badge */}
            <motion.div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 16px',
                background: 'rgba(253, 164, 175, 0.15)',
                borderRadius: 20,
                fontSize: '0.75rem',
                color: '#e11d48',
                fontWeight: 500,
                letterSpacing: '0.05em',
                marginBottom: 32,
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              📅 Sábado 14 de febrero
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={onContinue}
              className="btn-primary-valentine"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Abrir <span className="btn-heart-icon">🤍</span>
            </motion.button>

            {/* Signature */}
            <motion.p
              className="card-signature"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 2.0, duration: 0.8 }}
            >
              by Jorge
            </motion.p>
          </div>

          {/* Decorative bottom border */}
          <div className="card-ornament-bottom" />
        </motion.div>
      </div>

      {/* Scroll indicator for small screens */}
      <ScrollIndicator />
    </motion.div>
  )
}
