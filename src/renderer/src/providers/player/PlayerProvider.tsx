import {
  loadingDanmuProgressAtom,
  LoadingStatus,
  useClearPlayingVideo,
  videoAtom,
} from '@renderer/atoms/player'
import { MatchAnimeDialog } from '@renderer/components/modules/player/Dialog/MatchAnimeDialog'
import { LoadingDanmuTimeLine } from '@renderer/components/modules/player/Timeline'
import { apiClient } from '@renderer/request'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import type { FC, PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const VideoProvider: FC<PropsWithChildren> = ({ children }) => {
  const { hash, size, name, url } = useAtomValue(videoAtom)
  const location = useLocation()
  const [currentEpisodeId, setCurrentEpisodeId] = useState<number | null>(null)
  const [loadingProgress, setLoadingProgress] = useAtom(loadingDanmuProgressAtom)
  const clearPlayingVideo = useClearPlayingVideo()
  const { data: matchData } = useQuery({
    queryKey: [apiClient.match.Matchkeys, url],
    queryFn: () =>
      apiClient.match.postVideoEpisodeId({ fileSize: size, fileHash: hash, fileName: name }),
    enabled: !!hash,
  })
  const { data: danmuData } = useQuery({
    queryKey: [apiClient.comment.Commentkeys, url],
    queryFn: () => {
      if (!matchData?.matches) {
        return null
      }
      if (!currentEpisodeId) {
        return null
      }
      return apiClient.comment.getDanmu(currentEpisodeId)
    },
    enabled: !!currentEpisodeId,
  })

  useEffect(() => {
    if (matchData) {
      setLoadingProgress(LoadingStatus.MARCH_ANIME)
      if (matchData.isMatched && matchData.matches) {
        setCurrentEpisodeId(matchData?.matches[0]?.episodeId)
      }
    }
  }, [matchData, setLoadingProgress])

  useEffect(() => {
    if (danmuData) {
      setLoadingProgress(LoadingStatus.READY_PLAY)
      setTimeout(() => {
        setLoadingProgress(LoadingStatus.START_PLAY)
      }, 100)
    }
  }, [danmuData, setLoadingProgress])

  useEffect(() => {
    setCurrentEpisodeId(null)
  }, [url])

  useEffect(
    () => () => {
      clearPlayingVideo()
    },
    [location.pathname],
  )
  if (loadingProgress !== null && loadingProgress < LoadingStatus.START_PLAY) {
    return (
      <>
        <LoadingDanmuTimeLine />
        <MatchAnimeDialog
          matchData={currentEpisodeId ? undefined : matchData}
          onSelected={(id) => setCurrentEpisodeId(id)}
          onClosed={clearPlayingVideo}
        />
      </>
    )
  }
  return children
}
