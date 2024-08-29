import { Player } from '@renderer/components/modules/player'
import { useVideo } from '@renderer/components/modules/player/hooks'
import { VideoProvider } from '@renderer/providers/player/PlayerProvider'
import { useTheme } from 'next-themes'
import { useMemo } from 'react'

export default function VideoPlayer() {
  const { handleDragOver, handleDrop, url } = useVideo()
  const { theme, setTheme } = useTheme()
  const content = useMemo(() => url ? <Player url={url} /> : <DragTips />, [url])
  return (
    <VideoProvider>
      The current theme is:
      {theme}
      <br />
      <button onClick={() => setTheme('cmyk')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setTheme('system')}>system Mode</button>

      <div onDrop={handleDrop} onDragOver={handleDragOver} className="flex size-full items-center justify-center ">
        {content}
      </div>
    </VideoProvider>
  )
}

const DragTips = () => (
  <div className="flex flex-col items-center gap-2 text-gray-500">
    <i className="icon-[mingcute--video-line] text-6xl " />
    <p className="text-xl">将视频文件拖放到此处播放</p>
  </div>
)
