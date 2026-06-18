import React from 'react'
import AnimeCard from './AnimeCard'
import AnimeCardSkeleton from './AnimeCardSkeleton'
import { useTodaySchedule } from '../../hooks/useAnimeData'
import styles from './TodayStrip.module.css'

interface TodayStripProps {
  date?: string
}

const formatToday = (dateString: string): string => {
  const d = new Date(dateString + 'T00:00:00')
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
  }).format(d)
}

const TodayStrip: React.FC<TodayStripProps> = ({ date }) => {
  const targetDate = date ?? new Date().toISOString().split('T')[0]
  const { data: items = [], isLoading, isError } = useTodaySchedule(targetDate)

  const todayLabel = formatToday(targetDate)

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.heading}>Today's Episodes</h2>
        <span className={styles.dateLabel}>{todayLabel}</span>
      </header>

      {isError ? (
        <div className={styles.empty}>
          Couldn't load today's schedule. Try again later.
        </div>
      ) : items.length === 0 && !isLoading ? (
        <div className={styles.empty}>No new episodes airing today.</div>
      ) : (
        <div className={styles.scroll}>
          {isLoading
            ? Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className={styles.cardSlot}>
                  <AnimeCardSkeleton layout="vertical" />
                </div>
              ))
            : items.map((anime) => (
                <div key={anime._id} className={styles.cardSlot}>
                  <AnimeCard anime={anime} layout="vertical" />
                </div>
              ))}
        </div>
      )}
    </section>
  )
}

export default TodayStrip
