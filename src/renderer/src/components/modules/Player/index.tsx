import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import XgPlayer from 'xgplayer'

interface PlayerProps {
  url: string
}

export const Player: FC<PlayerProps> = (props) => {
  const { url } = props
  const playerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (playerRef.current) {
      new XgPlayer({
        el: playerRef.current,
        url,
        height: '100%',
        width: '100%',
        lang: 'zh',
        autoplay: true,
        volume: 1,
      })
    }
  }, [playerRef, url])

  return <div ref={playerRef} />
}
