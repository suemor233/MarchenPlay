import { Player } from '@renderer/components/modules/player'
import { usePlayer } from '@renderer/components/modules/player/hooks'
import { VideoProvider } from '@renderer/providers/player/PlayerProvider'

export default function VideoPlayer() {
  const { handleDragOver, handleDrop, url } = usePlayer()

  return (
    <VideoProvider>
      <div onDrop={handleDrop} onDragOver={handleDragOver} className="flex size-full items-center justify-center ">
        {url ? (
          <Player url={url} />
        ) : (
          <p className="text-gray-500">将视频文件拖放到此处播放</p>
        )}
      </div>
    </VideoProvider>
  )
}

// {
//   "isMatched": true,
//   "matches": [
//     {
//       "episodeId": 180860007,
//       "animeId": 18086,
//       "animeTitle": "我推的孩子 第二季",
//       "episodeTitle": "第18话 太阳",
//       "type": "tvseries",
//       "typeDescription": "TV动画",
//       "shift": 0
//     }
//   ],
//   "errorCode": 0,
//   "success": true,
//   "errorMessage": ""
// }
