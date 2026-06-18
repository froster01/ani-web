import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa'
import styles from './Auth.module.css'

interface ValidationErrors {
  username?: string
  password?: string
}

const Auth: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<{ username: boolean; password: boolean }>({
    username: false,
    password: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const validate = (): ValidationErrors => {
    const newErrors: ValidationErrors = {}

    if (username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    } else if (username.trim().length > 50) {
      newErrors.username = 'Username must be less than 50 characters'
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    } else if (password.length > 100) {
      newErrors.password = 'Password must be less than 100 characters'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setTouched({ username: true, password: true })
      return
    }

    setIsLoading(true)

    try {
      await login(username.trim(), password)
    } catch (error) {
      // Error is handled by AuthContext with toast
    } finally {
      setIsLoading(false)
    }
  }

  const handleBlur = (field: 'username' | 'password') => {
    setTouched({ ...touched, [field]: true })
    setErrors(validate())
  }

  React.useEffect(() => {
    document.title = 'Login - ani-web'
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.logoContainer}>
              <img src="/logo.png" alt="Rynix Logo" className={styles.logo} />
            </div>
            <h1 className={styles.title}>
              Welcome <span className={styles.titleAccent}>Back</span>
            </h1>
            <p className={styles.subtitle}>Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Username */}
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <div className={styles.inputWrapper}>
                <FaUser className={styles.inputIcon} />
                <input
                  id="username"
                  type="text"
                  className={`${styles.input} ${touched.username && errors.username ? styles.inputError : ''}`}
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => handleBlur('username')}
                  disabled={isLoading}
                  autoComplete="username"
                  autoFocus
                />
              </div>
              {touched.username && errors.username && (
                <p className={styles.error}>{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`${styles.input} ${touched.password && errors.password ? styles.inputError : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
              <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth
