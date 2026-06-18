import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { FaStar } from 'react-icons/fa'
import { Button } from '../common/Button'
import type { Anime } from '../../hooks/useAnimeData'
import { fixThumbnailUrl } from '../../lib/utils'
import styles from './CompactSpotlight.module.css'
import { useTitlePreference } from '../../contexts/TitlePreferenceContext'

interface CompactSpotlightProps {
  animeList: Anime[]
}

interface ShowMeta {
  description?: string
  bannerImage?: string
  thumbnail?: string
  season?: { title?: string }
  score?: number
  status?: string
  type?: string
  episodeCount?: number
  rating?: string
}

const fetchShowMeta = async (id: string): Promise<ShowMeta> => {
  const res = await fetch(`/api/anime/show-meta/${id}`, { credentials: 'include' })
  if (!res.ok) return {}
  return res.json()
}

const CompactSpotlight: React.FC<CompactSpotlightProps> = ({ animeList }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplayResetKey, setAutoplayResetKey] = useState(0)
  const [lastScrollTime, setLastScrollTime] = useState(0)
  const { titlePreference } = useTitlePreference()
  const navigate = useNavigate()
  const top4 = animeList.slice(0, 4)

  const getTitle = (anime: Anime) => {
    switch (titlePreference) {
      case 'nativeName':
        return anime.nativeName || anime.name
      case 'englishName':
        return anime.englishName || anime.name
      default:
        return anime.name
    }
  }

  const resetAutoplay = useCallback(() => {
    setAutoplayResetKey((k) => k + 1)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % top4.length)
  }, [top4.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + top4.length) % top4.length)
  }, [top4.length])

  useEffect(() => {
    if (top4.length === 0) return
    const timer = setTimeout(nextSlide, 10000)
    return () => clearTimeout(timer)
  }, [currentIndex, nextSlide, top4.length, autoplayResetKey])

  const metaQueries = useQueries({
    queries: top4.map((anime) => ({
      queryKey: ['compact-spotlight-meta', anime._id],
      queryFn: () => fetchShowMeta(anime._id),
      enabled: !!anime._id,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    })),
  })

  if (top4.length === 0) return null

  const anime = top4[currentIndex]
  const meta: ShowMeta = metaQueries[currentIndex]?.data ?? {}

  const bannerSrc = meta.bannerImage
    ? fixThumbnailUrl(meta.bannerImage, 1280, 800)
    : fixThumbnailUrl(anime.thumbnail, 1280, 800)

  const handleWatch = () => {
    navigate(`/watch/${anime._id}`)
  }

  const handleDetails = () => {
    navigate(`/anime/${anime._id}`)
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 5) {
      e.preventDefault()
      e.stopPropagation()
      const now = Date.now()
      if (now - lastScrollTime < 300) return
      setLastScrollTime(now)
      resetAutoplay()
      if (e.deltaY > 0) nextSlide()
      else prevSlide()
    }
  }

  const metadata = [
    meta.type || 'Anime',
    meta.status,
    meta.episodeCount ? `${meta.episodeCount} Episode${meta.episodeCount === 1 ? '' : 's'}` : undefined,
  ].filter(Boolean)

  return (
    <div className={styles.compactSpotlight} onWheel={handleWheel}>
      <img
        key={`${currentIndex}-${autoplayResetKey}`}
        src={bannerSrc}
        alt={getTitle(anime)}
        className={styles.posterImage}
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <span className={styles.featuredLabel}>Featured</span>

        <h1 className={styles.title} onClick={handleDetails}>
          {getTitle(anime)}
        </h1>

        <div className={styles.metaLine}>
          {meta.score !== undefined && (
            <div className={styles.rating}>
              <FaStar size={12} />
              <span>{meta.score}</span>
            </div>
          )}
          {meta.score !== undefined && metadata.length > 0 && <div className={styles.divider} />}
          {metadata.map((item, idx) => (
            <React.Fragment key={idx}>
              <span>{item}</span>
              {idx < metadata.length - 1 && <div className={styles.divider} />}
            </React.Fragment>
          ))}
        </div>

        <div className={styles.actions}>
          <Button variant="primary" size="md" onClick={handleWatch}>
            Watch Now
          </Button>
          <button className={styles.detailsLink} onClick={handleDetails}>
            Details →
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompactSpotlight
