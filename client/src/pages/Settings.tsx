import React, { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../components/common/Button'
import TitlePreferenceToggle from '../components/common/TitlePreferenceToggle'
import styles from './Settings.module.css'
import WatchlistSettings from '../components/settings/WatchlistSettings'
import { FaCog, FaDatabase, FaList } from 'react-icons/fa'
import { useLowEndMode } from '../contexts/LowEndModeContext'
import ToggleSwitch from '../components/common/ToggleSwitch'
import {
  getVirtualKeyboardEnabled,
  VIRTUAL_KEYBOARD_ENABLED_CHANGE_EVENT,
  VIRTUAL_KEYBOARD_ENABLED_KEY,
} from '../hooks/useVirtualKeyboard'
import { useSetting, useUpdateSetting } from '../hooks/useSettings'

type SettingsTab = 'general' | 'watchlist' | 'database'

const Settings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') as SettingsTab | null
  const [activeTab, setActiveTab] = useState<SettingsTab>(
    initialTab && ['general', 'watchlist', 'database'].includes(initialTab)
      ? initialTab
      : 'general'
  )
  const [statusMessage, setStatusMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { lowEndMode, setLowEndMode } = useLowEndMode()
  const [virtualKeyboardEnabled, setVirtualKeyboardEnabled] = useState(getVirtualKeyboardEnabled)

  const [discordEnabled, setDiscordEnabled] = useState(true)
  const { data: discordSetting } = useSetting('discordRPCEnabled')
  const updateSetting = useUpdateSetting()

  useEffect(() => {
    if (discordSetting !== undefined) {
      setDiscordEnabled(
        discordSetting === 'true' || discordSetting === true || discordSetting === null
      )
    }
  }, [discordSetting])

  const toggleDiscord = (enabled: boolean) => {
    setDiscordEnabled(enabled)
    updateSetting.mutate({ key: 'discordRPCEnabled', value: String(enabled) })
  }

  const toggleVirtualKeyboard = (enabled: boolean) => {
    setVirtualKeyboardEnabled(enabled)
    localStorage.setItem(VIRTUAL_KEYBOARD_ENABLED_KEY, String(enabled))
    window.dispatchEvent(new CustomEvent(VIRTUAL_KEYBOARD_ENABLED_CHANGE_EVENT))
  }

  React.useEffect(() => {
    document.title = 'Settings - ani-web'
  }, [])

  React.useEffect(() => {
    const tab = searchParams.get('tab') as SettingsTab | null
    if (tab && ['general', 'watchlist', 'database'].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const selectTab = (tab: SettingsTab) => {
    setActiveTab(tab)
    setSearchParams(tab === 'general' ? {} : { tab })
  }

  const handleBackup = async () => {
    setStatusMessage('Backing up database...')
    try {
      const response = await fetch('/api/anime/backup-db', { credentials: 'include' })
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'ani-web-backup.db'
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
        setStatusMessage('Database backup successful!')
      } else {
        const errorData = await response.json()
        setStatusMessage(`Backup failed: ${errorData.error}`)
      }
    } catch (_error) {
      setStatusMessage('Backup failed: An unexpected error occurred.')
    }
  }

  const handleRestore = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setStatusMessage('Restoring database...')
    const formData = new FormData()
    formData.append('dbfile', file)

    try {
      const response = await fetch('/api/anime/restore-db', {
        credentials: 'include',
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setStatusMessage(result.message || 'Database restored successfully!')
        setTimeout(() => window.location.reload(), 2000)
      } else {
        setStatusMessage(`Restore failed: ${result.error}`)
      }
    } catch (_error) {
      setStatusMessage('Restore failed: An unexpected error occurred.')
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className={styles.tabContent}>
            <div className={styles.sectionCard}>
              <h3>Appearance & Preferences</h3>
              <p>Configure how titles are displayed and other general preferences.</p>
              <div className={styles.settingItem}>
                <TitlePreferenceToggle />
              </div>
              <div className={styles.settingItem} style={{ marginTop: '1.5rem' }}>
                <div className={styles.settingRow}>
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>Low End Mode</h4>
                    <p
                      style={{
                        margin: '0.25rem 0 0',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      Disables animations and heavy visual effects for better performance on older
                      hardware.
                    </p>
                  </div>
                  <ToggleSwitch
                    isChecked={lowEndMode}
                    onChange={(e) => setLowEndMode(e.target.checked)}
                    id="low-end-mode"
                  />
                </div>
              </div>

              <div className={styles.settingItem} style={{ marginTop: '1.5rem' }}>
                <div className={styles.settingRow}>
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>Virtual Keyboard</h4>
                    <p
                      style={{
                        margin: '0.25rem 0 0',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      Shows an on-screen keyboard when text search fields are focused.
                    </p>
                  </div>
                  <ToggleSwitch
                    isChecked={virtualKeyboardEnabled}
                    onChange={(e) => toggleVirtualKeyboard(e.target.checked)}
                    id="virtual-keyboard-enabled"
                  />
                </div>
              </div>

              <div className={styles.settingItem} style={{ marginTop: '1.5rem' }}>
                <div className={styles.settingRow}>
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>Discord Rich Presence</h4>
                    <p
                      style={{
                        margin: '0.25rem 0 0',
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      Show your current anime and watch progress on your Discord profile status.
                    </p>
                  </div>
                  <ToggleSwitch
                    isChecked={discordEnabled}
                    onChange={(e) => toggleDiscord(e.target.checked)}
                    id="discord-rpc-enabled"
                  />
                </div>
              </div>

              {localStorage.getItem('agreedToViewMature') === 'true' && (
                <div className={styles.settingItem} style={{ marginTop: '1.5rem' }}>
                  <div className={styles.settingRow}>
                    <div style={{ minWidth: 0 }}>
                      <h4 style={{ margin: 0, fontSize: '1rem' }}>Mature Content</h4>
                      <p
                        style={{
                          margin: '0.25rem 0 0',
                          fontSize: '0.85rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        You have previously agreed to view 18+ content. Toggle this off to re-enable
                        the blur gate and filtering.
                      </p>
                    </div>
                    <ToggleSwitch
                      isChecked={true}
                      onChange={(e) => {
                        if (!e.target.checked) {
                          localStorage.removeItem('agreedToViewMature')
                          window.location.reload()
                        }
                      }}
                      id="mature-content-enabled"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      case 'watchlist':
        return (
          <div className={styles.tabContent}>
            <WatchlistSettings />
          </div>
        )
      case 'database':
        return (
          <div className={styles.tabContent}>
            <div className={styles.sectionCard}>
              <h3>Database Management</h3>
              <p>Download a backup of your current database or restore from an existing file.</p>
              <div className={styles.controls}>
                <Button onClick={handleBackup}>Backup Database</Button>
                <Button variant="secondary" onClick={triggerFileSelect}>
                  Restore Database
                </Button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleRestore}
                style={{ display: 'none' }}
                accept=".db"
              />
              {statusMessage && <p className={styles.status}>{statusMessage}</p>}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="page-container">
      <div className={styles.settingsHeader}>
        <h1 className={styles.pageTitle}>Settings</h1>
        <p className={styles.pageSubtitle}>Manage your preferences</p>
      </div>

      <div className={styles.settingsLayout}>
        <aside className={styles.sidebar}>
          <button
            className={`${styles.sidebarItem} ${activeTab === 'general' ? styles.active : ''}`}
            onClick={() => selectTab('general')}
          >
            <FaCog /> <span>General</span>
          </button>
          <button
            className={`${styles.sidebarItem} ${activeTab === 'watchlist' ? styles.active : ''}`}
            onClick={() => selectTab('watchlist')}
          >
            <FaList /> <span>Watchlist</span>
          </button>
          <button
            className={`${styles.sidebarItem} ${activeTab === 'database' ? styles.active : ''}`}
            onClick={() => selectTab('database')}
          >
            <FaDatabase /> <span>Database</span>
          </button>
        </aside>

        <main className={styles.mainContent}>{renderTabContent()}</main>
      </div>
    </div>
  )
}

export default Settings
