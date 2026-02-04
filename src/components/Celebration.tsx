import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function Celebration() {
  useEffect(() => {
    // Initial big burst
    const burst = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#d4a574', '#fff1f2'],
      })
    }

    burst()

    // Side cannons
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fda4af', '#fb7185', '#f43f5e', '#d4a574'],
      })
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fda4af', '#fb7185', '#f43f5e', '#d4a574'],
      })
    }, 500)

    // Continuous gentle confetti
    const interval = setInterval(() => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 40,
        origin: { x: 0, y: 0.5 },
        colors: ['#fda4af', '#fb7185', '#d4a574'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 40,
        origin: { x: 1, y: 0.5 },
        colors: ['#fda4af', '#fb7185', '#d4a574'],
      })
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
      style={{ minHeight: '100dvh' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Circular image with glow */}
      <motion.div
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid rgba(253, 164, 175, 0.5)',
          boxShadow: '0 6px 28px rgba(251, 113, 133, 0.3), 0 0 0 6px rgba(253, 164, 175, 0.1)',
          marginBottom: 16,
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

      {/* Sparkles */}
      <motion.div
        className="select-none"
        style={{ fontSize: 'clamp(1rem, 3.5vw, 1.4rem)', marginBottom: 8, letterSpacing: '0.4em' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        ✨🌹✨
      </motion.div>

      {/* Title */}
      <motion.h2
        className="font-script drop-shadow-sm"
        style={{ fontSize: 'clamp(2.5rem, 10vw, 4.5rem)', color: '#e11d48', marginBottom: 12, lineHeight: 1.2 }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        ¡Feliz San Valentín!
      </motion.h2>

      {/* Decorative divider */}
      <motion.div
        style={{ marginBottom: 20 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
      >
        <div className="card-divider" />
      </motion.div>

      {/* Love message */}
      <motion.p
        style={{ color: '#fb7185', fontSize: 'clamp(1rem, 4vw, 1.5rem)', fontWeight: 300, lineHeight: 1.8, marginBottom: 12, maxWidth: 340 }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        Sabía que dirías que sí 🥰
        <br />
        Este día es especial contigo.
      </motion.p>

      {/* Sweet extra message */}
      <motion.p
        className="font-script"
        style={{ color: '#e11d48', fontSize: 'clamp(1.1rem, 4.5vw, 1.6rem)', marginBottom: 28, opacity: 0.85 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.85 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        Te quiero mucho, corazoncito 🍓
      </motion.p>

      {/* Animated hearts row */}
      <motion.div
        className="select-none"
        style={{ display: 'flex', gap: 12, fontSize: 'clamp(1.6rem, 6vw, 2.5rem)', marginBottom: 20 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        {['💕', '💗', '💖', '💗', '💕'].map((heart, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          >
            {heart}
          </motion.span>
        ))}
      </motion.div>

      {/* Big heart at the end */}
      <motion.div
        className="select-none"
        style={{ fontSize: 'clamp(4rem, 15vw, 7rem)', lineHeight: 1 }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ delay: 1.7, duration: 0.8, times: [0, 0.6, 1] }}
      >
        💖
      </motion.div>

      {/* Subtle date + signature */}
      <motion.div
        style={{ position: 'absolute', bottom: 24, textAlign: 'center' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <p style={{ color: '#fda4af', fontSize: '0.85rem', fontWeight: 300, marginBottom: 4 }}>
          14 de febrero 💝 Juntos
        </p>
        <p className="card-signature" style={{ opacity: 0.5, paddingTop: 2 }}>
          by Jorge
        </p>
      </motion.div>
    </motion.div>
  )
}
