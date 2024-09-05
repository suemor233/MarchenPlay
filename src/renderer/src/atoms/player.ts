import { useSetAtom } from 'jotai'
import { atomWithReset, useResetAtom } from 'jotai/utils'

export const videoAtom = atomWithReset({
  url: '',
  hash: '',
  size: 0,
  name: '',
})

export enum LoadingStatus {
  IMPORT_VIDEO = 0,
  CALC_HASH = 1,
  MARCH_ANIME = 2,
  GET_DANMU = 3,
  READY_PLAY = 4,
  START_PLAY = 5,
}

export const LoadingDanmuProgressAtom = atomWithReset<LoadingStatus | null>(null)

export const useSetLoadingDanmuProgress = () => useSetAtom(LoadingDanmuProgressAtom)

export const useClearPlayingVideo = () => {
  const resetVideo = useResetAtom(videoAtom)
  const resetProgress = useResetAtom(LoadingDanmuProgressAtom)

  return () => {
    resetVideo()
    resetProgress()
  }
}
