import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { FaUser, FaLock, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa'
import styles from './Auth.module.css'

interface ValidationErrors {
  username?: string
  password?: string
  licenseKey?: string
}

const Auth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [licenseKey, setLicenseKey] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<{ username: boolean; password: boolean; licenseKey: boolean }>({
    username: false,
    password: false,
    licenseKey: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { login, register } = useAuth()

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

    if (mode === 'register' && !licenseKey.trim()) {
      newErrors.licenseKey = 'License key is required'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setTouched({ username: true, password: true, licenseKey: true })
      return
    }

    setIsLoading(true)

    try {
      if (mode === 'login') {
        await login(username.trim(), password)
      } else {
        await register(username.trim(), password, licenseKey.trim())
        // Switch to login mode after successful registration
        setMode('login')
        setPassword('')
        setLicenseKey('')
      }
    } catch (error) {
      // Error is handled by AuthContext with toast
    } finally {
      setIsLoading(false)
    }
  }

  const handleBlur = (field: 'username' | 'password' | 'licenseKey') => {
    setTouched({ ...touched, [field]: true })
    setErrors(validate())
  }

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setErrors({})
    setTouched({ username: false, password: false, licenseKey: false })
  }

  React.useEffect(() => {
    document.title = mode === 'login' ? 'Login - ani-web' : 'Register - ani-web'
  }, [mode])

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.glowFrame} />
        
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.logoContainer}>
              <div className={styles.logo}>📺</div>
            </div>
            <h1 className={styles.title}>ANI-WEB</h1>
            <p className={styles.subtitle}>
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Username */}
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <FaUser className={styles.inputIcon} />
                <input
                  type="text"
                  className={`${styles.input} ${touched.username && errors.username ? styles.inputError : ''}`}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => handleBlur('username')}
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>
              {touched.username && errors.username && (
                <p className={styles.error}>{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`${styles.input} ${touched.password && errors.password ? styles.inputError : ''}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  disabled={isLoading}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
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

            {/* License Key (register only) */}
            {mode === 'register' && (
              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <FaKey className={styles.inputIcon} />
                  <input
                    type="text"
                    className={`${styles.input} ${touched.licenseKey && errors.licenseKey ? styles.inputError : ''}`}
                    placeholder="License Key"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    onBlur={() => handleBlur('licenseKey')}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </div>
                {touched.licenseKey && errors.licenseKey && (
                  <p className={styles.error}>{errors.licenseKey}</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : mode === 'login' ? 'LOGIN' : 'REGISTER'}
            </button>

            {/* Toggle Mode */}
            <div className={styles.toggleMode}>
              <p>
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                {' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className={styles.toggleLink}
                  disabled={isLoading}
                >
                  {mode === 'login' ? 'Register' : 'Login'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth
