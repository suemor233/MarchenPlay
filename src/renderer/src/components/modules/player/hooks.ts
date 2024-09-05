import { LoadingDanmuProgressAtom, LoadingStatus, useClearPlayingVideo, videoAtom } from '@renderer/atoms/player'
import { calculateFileHash } from '@renderer/libs/calc-file-hash'
import { tipcClient } from '@renderer/libs/client'
import { isWeb } from '@renderer/libs/utils'
import { useAtom, useSetAtom } from 'jotai'
import type { ChangeEvent, DragEvent } from 'react'
import { toast } from 'react-toastify'
import type { IPlayerOptions } from 'xgplayer'
import { Danmu } from 'xgplayer'

export const useVideo = () => {
  const [video, setVideo] = useAtom(videoAtom)
  const setProgress = useSetAtom(LoadingDanmuProgressAtom)
  const clearPlayingVideo = useClearPlayingVideo()
  const handleNewVideo = async (e: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setProgress(LoadingStatus.IMPORT_VIDEO)
    let file: File | undefined
    if (e.type === 'drop') {
      const dragEvent = e as DragEvent<HTMLDivElement>
      file = dragEvent.dataTransfer?.files[0]
    } else if (e.type === 'change') {
      const changeEvent = e as ChangeEvent<HTMLInputElement>
      file = changeEvent.target?.files?.[0]
    }

    if (!file || !file?.type.startsWith('video/')) {
      clearPlayingVideo()
      if (isWeb) {
        return toast.error('请导入视频文件')
      }
      return tipcClient?.showErrorDialog({ title: '格式错误', content: '请导入视频文件' })
    }

    const url = URL.createObjectURL(file)
    const { size, name } = file
    const fileName = name.slice(0, Math.max(0, name.lastIndexOf('.'))) || name
    try {
      const hash = await calculateFileHash(file)
      setVideo({ url, hash, size, name: fileName })
      setProgress(LoadingStatus.CALC_HASH)
    } catch (error) {
      console.error('Failed to calculate file hash:', error)
      clearPlayingVideo()
      if (isWeb) {
        return toast.error('计算视频 hash 值出现异常，请重试')
      }
      return tipcClient?.showErrorDialog({ title: '播放失败', content: '计算视频 hash 值出现异常，请重试' })
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return {
    handleNewVideo,
    handleDragOver,
    url: video.url,
    showAddVideoTips: !video.url,
  }
}

// export const usePlayer = (url: string) => {
//   const matchedVideo = useAtomValue(matchedVideoAtom)

//   const { data: danmuData } = useQuery({
//     queryKey: [apiClient.comment.Commentkeys, url],
//     queryFn: () => {
//       if (!matchedVideo?.matches) {
//         return null
//       }
//       return apiClient.comment.getDanmu(matchedVideo?.matches[0]?.episodeId.toString())
//     },
//     enabled: !!matchedVideo,
//   })

//   return {
//     playerBaseConfig,
//     danmuData,
//   } as const
// }

export const playerBaseConfig = {
  height: '100%',
  width: '100%',
  lang: 'zh',
  autoplay: true,
  volume: 1,
  miniprogress: true,
  screenShot: true,
  pip: true,
  rotate: true,
  download: true,

  plugins: [Danmu],
  danmu: {
    fontSize: 25,
    ext: {
      mouseControl: true,
      mouseControlPause: true,
    },

  },
} satisfies IPlayerOptions
