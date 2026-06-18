import React from 'react'
import styles from './Logo.module.css'

interface LogoProps {
  className?: string
  compact?: boolean
}

const Logo: React.FC<LogoProps> = ({ className, compact }) => {
  return (
    <div className={`${styles.logoLockup} ${compact ? styles.compact : ''} ${className || ''}`}>
      <img
        src="/logo.png"
        alt="Rynix Tsuki"
        className={styles.logoImage}
        width="48"
        height="48"
      />
      <span className={styles.logoText}>
        <span className={styles.logoName}>Rynix</span>
        <span className={styles.logoSeparator}>•</span>
        <span className={styles.logoSubtitle}>Tsuki</span>
      </span>
    </div>
  )
}

export default Logo
