import {
  currentMatchedVideoAtom,
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
import { useResetAtom } from 'jotai/utils'
import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const VideoProvider: FC<PropsWithChildren> = ({ children }) => {
  const { hash, size, name, url } = useAtomValue(videoAtom)
  const location = useLocation()
  const [currentMatchedVideo, setCurrentMatchedVideo] = useAtom(currentMatchedVideoAtom)
  const [loadingProgress, setLoadingProgress] = useAtom(loadingDanmuProgressAtom)
  const clearPlayingVideo = useClearPlayingVideo()
  const resetCurrentMatchedVideo = useResetAtom(currentMatchedVideoAtom)
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
      if (!currentMatchedVideo) {
        return null
      }
      return apiClient.comment.getDanmu(+currentMatchedVideo.episodeId)
    },
    enabled: !!currentMatchedVideo.episodeId,
  })

  useEffect(() => {
    if (matchData) {
      setLoadingProgress(LoadingStatus.MARCH_ANIME)
      if (matchData.isMatched && matchData.matches) {
        const matchedVideo = matchData.matches[0]
        setCurrentMatchedVideo({
          episodeId: matchedVideo.episodeId,
          animeTitle: `${matchedVideo.animeTitle} - ${matchedVideo.episodeTitle}`,
        })
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
    resetCurrentMatchedVideo()
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
          matchData={currentMatchedVideo.episodeId ? undefined : matchData}
          onSelected={(id, title) =>
            setCurrentMatchedVideo({
              episodeId: id,
              animeTitle: title,
            })
          }
          onClosed={clearPlayingVideo}
        />
      </>
    )
  }
  return children
}
