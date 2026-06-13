import { useEffect, Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'
import ScrollToTopButton from './components/common/ScrollToTopButton'
import VirtualKeyboard from './components/common/VirtualKeyboard'
import { useVirtualKeyboard } from './hooks/useVirtualKeyboard'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

const Home = lazy(() => import('./pages/Home'))
const Watchlist = lazy(() => import('./pages/Watchlist'))
const Settings = lazy(() => import('./pages/Settings'))
const Player = lazy(() => import('./pages/Player'))
const Search = lazy(() => import('./pages/Search'))
const MAL = lazy(() => import('./pages/MAL'))
const Insights = lazy(() => import('./pages/Insights'))
const AnimeInfoPage = lazy(() => import('./pages/AnimeInfoPage'))
const Auth = lazy(() => import('./pages/Auth'))

import { useSidebar } from './hooks/useSidebar'
import { Toaster } from 'react-hot-toast'
import TopProgressBar from './components/common/TopProgressBar'
import ErrorBoundary from './components/common/ErrorBoundary'

const PlayerRedirect = () => {
  const { id, episodeNumber } = useParams()
  return <Navigate to={episodeNumber ? `/watch/${id}/${episodeNumber}` : `/watch/${id}`} replace />
}

function App() {
  const { isOpen, setIsOpen } = useSidebar()
  const virtualKeyboard = useVirtualKeyboard()

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.body.classList.add('sidebar-open')
    } else {
      document.body.classList.remove('sidebar-open')
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
      document.body.classList.remove('sidebar-open')
    }
  }, [isOpen, setIsOpen])

  return (
    <AuthProvider>
      <div className="app-container">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#262829',
              color: '#fff',
              border: '1px solid #444',
            },
            success: {
              style: {
                background: 'var(--accent)',
                color: '#fff',
              },
              iconTheme: {
                primary: '#fff',
                secondary: 'var(--accent)',
              },
            },
            error: {
              style: {
                background: '#992a2a',
                color: '#fff',
              },
            },
          }}
        />
        <Header />
        <Sidebar />
        <main>
          <ErrorBoundary>
            <Suspense fallback={<TopProgressBar />}>
              <Routes>
                {/* Public route */}
                <Route path="/auth" element={<Auth />} />
                
                {/* Protected routes */}
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/watchlist/:filter?" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/mal" element={<ProtectedRoute><MAL /></ProtectedRoute>} />
                <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
                <Route path="/anime/:id" element={<ProtectedRoute><AnimeInfoPage /></ProtectedRoute>} />
                <Route path="/watch/:id" element={<ProtectedRoute><Player /></ProtectedRoute>} />
                <Route path="/watch/:id/:episodeNumber" element={<ProtectedRoute><Player /></ProtectedRoute>} />
                <Route path="/player/:id" element={<PlayerRedirect />} />
                <Route path="/player/:id/:episodeNumber" element={<PlayerRedirect />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
        <ScrollToTopButton />
        <VirtualKeyboard
          activeInputRef={virtualKeyboard.activeInputRef}
          isVisible={virtualKeyboard.isVisible}
          onClose={virtualKeyboard.hide}
        />
      </div>
    </AuthProvider>
  )
}

export default App
