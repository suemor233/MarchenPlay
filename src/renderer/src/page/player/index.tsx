import { useEffect, useRef } from 'react'
import Player from 'xgplayer'

export default function VideoPlayer() {
  const playerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (playerRef.current) {
      new Player({
        el: playerRef.current,
        url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
        height: '100%',
        width: '100%',
        lang: 'zh',
      })
    }
  }, [playerRef])
  return <div ref={playerRef} />
}
