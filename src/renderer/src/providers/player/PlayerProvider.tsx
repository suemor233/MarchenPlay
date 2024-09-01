import { matchedVideoAtom, videoAtom } from '@renderer/atoms/player'
import { apiClient } from '@renderer/request'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const VideoProvider: FC<PropsWithChildren> = ({ children }) => {
  const { hash, size, name, url } = useAtomValue(videoAtom)
  const location = useLocation()
  const setVideo = useSetAtom(videoAtom)
  const setMatchedVideo = useSetAtom(matchedVideoAtom)
  const { data, isLoading } = useQuery({
    queryKey: [apiClient.match.Matchkeys, url],
    queryFn: () => apiClient.match.postVideoEpisodeId({ fileSize: size, fileHash: hash, fileName: name }),
    enabled: !!hash,
  })

  useEffect(() => {
    if (data) {
      setMatchedVideo(data)
    }
  }, [data, setMatchedVideo])

  useEffect(() => () => {
    setMatchedVideo(null)
    setVideo({
      url: '',
      hash: '',
      size: 0,
      name: '',
    })
  }, [location.pathname])
  if (isLoading) {
    return <div>loading...</div>
  }
  return children
}
