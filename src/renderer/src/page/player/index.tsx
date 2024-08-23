import { Player } from '@renderer/components/modules/Player'
import { tipcClient } from '@renderer/libs/client'
import type { DragEvent } from 'react'
import { useState } from 'react'

export default function VideoPlayer() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e?.dataTransfer?.files[0]
    if (!file || !file?.type.startsWith('video/')) {
      tipcClient?.showErrorDialog({ title: '格式错误', content: '请拖放视频文件' })
      return
    }

    const videoURL = URL.createObjectURL(file)
    setVideoSrc(videoURL)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }
  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="flex size-full items-center justify-center ">
      {videoSrc ? (
        <Player url={videoSrc} />
      ) : (
        <p className="text-gray-500">将视频文件拖放到此处播放</p>
      )}
    </div>
  )
}
