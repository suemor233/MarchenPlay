import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import XgPlayer, { Danmu } from 'xgplayer'

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
        miniprogress: true,
        screenShot: true,
        pip: true,

        plugins: [Danmu],
        danmu: {
          comments: [
            {
              duration: 15000, // 弹幕持续显示时间,毫秒(最低为5000毫秒)
              id: '1', // 弹幕id，需唯一
              start: 1000, // 弹幕出现时间，毫秒
              txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', // 弹幕文字内容
              mode: 'top',
              style: {
                color: '#fff',
              },
            },
          ],
          fontSize: 25,
          ext: {
            mouseControl: true,
            mouseControlPause: true,
          },

        },
      })
    }
  }, [playerRef, url])

  return <div ref={playerRef} />
}
