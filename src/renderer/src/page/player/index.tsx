import { Player } from '@renderer/components/modules/player'
import { useVideo } from '@renderer/components/modules/player/hooks'
import { cn } from '@renderer/libs/utils'
import { VideoProvider } from '@renderer/providers/player/PlayerProvider'
import { useMemo, useRef } from 'react'

export default function VideoPlayer() {
  const { handleDragOver, handleNewVideo, url, showAddVideoTips } = useVideo()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const content = useMemo(() => url ? <Player url={url} /> : <DragTips />, [url])
  return (
    <VideoProvider>
      <div
        onDrop={handleNewVideo}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className={cn('flex size-full items-center justify-center ', showAddVideoTips && 'cursor-pointer')}
      >
        {content}
        {showAddVideoTips && (
          <input
            type="file"
            accept="video/mp4, video/x-matroska"
            ref={fileInputRef}
            onChange={handleNewVideo}
            className="hidden"
          />
        )}
      </div>
    </VideoProvider>
  )
}

const DragTips = () => (
  <div className="flex flex-col items-center gap-2 text-gray-500">
    <i className="icon-[mingcute--video-line] text-6xl " />
    <p className="text-xl">点击或拖拽动漫到此处播放</p>
  </div>
)
