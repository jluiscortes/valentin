import { motion } from 'framer-motion'

interface HeroProps {
  onContinue: () => void
}

export default function Hero({ onContinue }: HeroProps) {
  return (
    <motion.div
      className="relative z-10 flex items-center justify-center"
      style={{ minHeight: '100dvh', padding: '40px 20px 20px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      {/* Card wrapper for seal positioning */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 360, margin: '0 auto' }}>
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
    </motion.div>
  )
}
