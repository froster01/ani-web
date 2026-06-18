import React from 'react'
import { Link } from 'react-router-dom'
import type { Anime } from '../../hooks/useAnimeData'
import { fixThumbnailUrl } from '../../lib/utils'
import { useTitlePreference } from '../../contexts/TitlePreferenceContext'
import styles from './TopTenList.module.css'

interface TopTenListProps {
  animeList: Anime[]
  limit?: number
  title?: string
}

const pad2 = (n: number) => String(n).padStart(2, '0')

const TopTenList: React.FC<TopTenListProps> = ({
  animeList,
  limit = 10,
  title = 'Trending Top 10',
}) => {
  const { titlePreference } = useTitlePreference()
  const items = animeList.slice(0, limit)

  if (items.length === 0) return null

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

  const getMeta = (anime: Anime) => {
    const parts: string[] = []
    if (anime.type) parts.push(anime.type)
    if (anime.episodeCount) parts.push(`${anime.episodeCount} ep`)
    if (anime.status) parts.push(anime.status)
    return parts.slice(0, 2).join(' · ')
  }

  const [featured, ...rest] = items
  const featuredTitle = getTitle(featured)
  const featuredMeta = getMeta(featured)
  const featuredThumb = fixThumbnailUrl(featured.thumbnail, 600, 600)

  return (
    <section className={styles.container} aria-label={title}>
      <Link to={`/anime/${featured._id}`} className={styles.featured}>
        <img
          src={featuredThumb}
          alt=""
          className={styles.featuredImg}
          loading="eager"
          decoding="async"
        />
        <div className={styles.featuredOverlay} />

        <div className={styles.featuredOverlayInner}>
          <header className={styles.header}>
            <h2 className={styles.heading}>{title}</h2>
            <span className={styles.sublabel}>This week</span>
          </header>

          <div className={styles.featuredContent}>
            <span className={styles.featuredRank} aria-hidden="true">
              {pad2(1)}
            </span>
            <div className={styles.featuredInfo}>
              <div className={styles.featuredTitle} title={featuredTitle}>
                {featuredTitle}
              </div>
              {featuredMeta && <div className={styles.featuredMeta}>{featuredMeta}</div>}
            </div>
          </div>
        </div>
      </Link>

      <ol className={styles.list}>
        {rest.map((anime, index) => {
          const rank = index + 2
          const meta = getMeta(anime)
          return (
            <li key={anime._id} className={styles.listItem}>
              <Link to={`/anime/${anime._id}`} className={styles.row}>
                <span className={styles.rank} aria-hidden="true">
                  {pad2(rank)}
                </span>
                <div className={styles.thumbWrap}>
                  <img
                    src={fixThumbnailUrl(anime.thumbnail, 96, 140)}
                    alt=""
                    className={styles.thumb}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.info}>
                  <div className={styles.title} title={getTitle(anime)}>
                    {getTitle(anime)}
                  </div>
                  {meta && <div className={styles.meta}>{meta}</div>}
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default TopTenList
