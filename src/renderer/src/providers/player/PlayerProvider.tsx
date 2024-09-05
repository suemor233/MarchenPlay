import { LoadingDanmuProgressAtom, LoadingStatus, useClearPlayingVideo, videoAtom } from '@renderer/atoms/player'
import { LoadingDanmuTimeLine } from '@renderer/components/modules/player/Timeline'
import { apiClient } from '@renderer/request'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const VideoProvider: FC<PropsWithChildren> = ({ children }) => {
  const { hash, size, name, url } = useAtomValue(videoAtom)
  const location = useLocation()
  const [loadingProgress, setLoadingProgress] = useAtom(LoadingDanmuProgressAtom)
  const clearPlayingVideo = useClearPlayingVideo()
  const { data: matchData } = useQuery({
    queryKey: [apiClient.match.Matchkeys, url],
    queryFn: () => apiClient.match.postVideoEpisodeId({ fileSize: size, fileHash: hash, fileName: name }),
    enabled: !!hash,
  })

  const { data: danmuData } = useQuery({
    queryKey: [apiClient.comment.Commentkeys, url],
    queryFn: () => {
      if (!matchData?.matches) {
        return null
      }
      return apiClient.comment.getDanmu(matchData?.matches[0]?.episodeId.toString())
    },
    enabled: !!matchData,
  })

  useEffect(() => {
    if (matchData) {
      setLoadingProgress(LoadingStatus.MARCH_ANIME)
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

  useEffect(() => () => {
    clearPlayingVideo()
  // eslint-disable-next-line react-compiler/react-compiler
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  if (loadingProgress !== null && loadingProgress < LoadingStatus.START_PLAY) {
    return <LoadingDanmuTimeLine />
  }
  return children
}
