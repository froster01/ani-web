import React, { useEffect, useMemo, useCallback } from 'react'
import AnimeSection from '../components/anime/AnimeSection'
import CompactSpotlight from '../components/anime/CompactSpotlight'
import TopTenList from '../components/anime/TopTenList'
import TodayStrip from '../components/anime/TodayStrip'
import QueueRail from '../components/player/QueueRail'
import {
  useInfiniteLatestReleases,
  usePopularAnime,
  useQueue,
  useRemoveFromQueue,
  useClearQueue,
  useReorderQueue,
} from '../hooks/useAnimeData'
import styles from './Home.module.css'

const Home: React.FC = () => {
  const { data: queueData = [] } = useQueue()
  const removeQueue = useRemoveFromQueue()
  const clearQueue = useClearQueue()
  const reorderQueue = useReorderQueue()

  useEffect(() => {
    document.title = 'Home - ani-web'
  }, [])

  const {
    data: latestInfinite,
    isLoading: loadingLatestInfinite,
    fetchNextPage: fetchMoreLatest,
    hasNextPage: hasMoreLatest,
    isFetchingNextPage: fetchingMoreLatest,
  } = useInfiniteLatestReleases(14)

  const latestList = useMemo(() => {
    return latestInfinite?.pages.flatMap((page) => page) || []
  }, [latestInfinite])

  const handleLatestScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (!hasMoreLatest || fetchingMoreLatest || loadingLatestInfinite) return
      const { scrollLeft, clientWidth, scrollWidth } = e.currentTarget
      if (scrollLeft + clientWidth > scrollWidth * 0.7) {
        fetchMoreLatest()
      }
    },
    [hasMoreLatest, fetchingMoreLatest, loadingLatestInfinite, fetchMoreLatest]
  )

  const { data: popularWeekly } = usePopularAnime('weekly')

  return (
    <div className={styles.homeRoot}>
      <section className={styles.dashboardTop}>
        <div className={styles.dashboardLeft}>
          <CompactSpotlight animeList={popularWeekly || []} />

          {queueData.length > 0 && (
            <QueueRail
              title="Continue Watching"
              items={queueData}
              onRemove={(item) =>
                removeQueue.mutate({ showId: item.showId, episodeNumber: item.episodeNumber })
              }
              showClearAll
              onClear={() => clearQueue.mutate()}
              onReorder={(items) =>
                reorderQueue.mutate(
                  items.map((item) => ({
                    id: item.id,
                    showId: item.showId,
                    episodeNumber: item.episodeNumber,
                  }))
                )
              }
            />
          )}
        </div>

        <TopTenList animeList={popularWeekly || []} limit={10} />
      </section>

      <TodayStrip />

      <AnimeSection
        title="Latest Releases"
        animeList={latestList}
        loading={loadingLatestInfinite}
        carousel
        onScroll={handleLatestScroll}
        isFetchingNextPage={fetchingMoreLatest}
      />
    </div>
  )
}

export default Home
