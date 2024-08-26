import { matchedVideoAtom, videoAtom } from '@renderer/atoms/player'
import { calculateFileHash } from '@renderer/libs/calc-file-hash'
import { tipcClient } from '@renderer/libs/client'
import { useAtom, useSetAtom } from 'jotai'
import type { DragEvent } from 'react'

export const usePlayer = () => {
  const [video, setVideo] = useAtom(videoAtom)
  const setMatchVideo = useSetAtom(matchedVideoAtom)
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setMatchVideo(null)
    const file = e?.dataTransfer?.files[0]
    if (!file || !file?.type.startsWith('video/')) {
      tipcClient?.showErrorDialog({ title: '格式错误', content: '请拖放视频文件' })
      return
    }

    const url = URL.createObjectURL(file)
    const { size, name } = file
    const fileName = name.slice(0, Math.max(0, name.lastIndexOf('.'))) || name
    try {
      const hash = await calculateFileHash(file)
      setVideo({ url, hash, size, name: fileName })
    } catch (error) {
      console.error('Failed to calculate file hash:', error)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return {
    handleDrop,
    handleDragOver,
    url: video.url,
  }
}
