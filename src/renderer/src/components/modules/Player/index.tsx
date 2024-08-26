import { matchedVideoAtom } from '@renderer/atoms/player'
import { intToHexColor } from '@renderer/libs/color'
import { apiClient } from '@renderer/request'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import XgPlayer, { Danmu } from 'xgplayer'

interface PlayerProps {
  url: string
}

export const Player: FC<PlayerProps> = (props) => {
  const { url } = props
  const matchedVideo = useAtomValue(matchedVideoAtom)

  const { data: danmuData } = useQuery({
    queryKey: [apiClient.comment.Commentkeys, url],
    queryFn: () => {
      if (!matchedVideo?.matches) {
        return null
      }
      return apiClient.comment.getDanmu(matchedVideo?.matches[0]?.episodeId.toString())
    },
    enabled: !!matchedVideo,
  })
  const playerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (playerRef.current && danmuData) {
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
          // comments: [
          //   {
          //     duration: 15000, // 弹幕持续显示时间,毫秒(最低为5000毫秒)
          //     id: '1', // 弹幕id，需唯一
          //     start: 1000, // 弹幕出现时间，毫秒
          //     txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', // 弹幕文字内容
          //     mode: 'top',
          //     style: {
          //       color: '#fff',
          //     },
          //   },
          // ],
          comments: danmuData.comments.map((comment) => {
            const start = Number.parseInt(comment.p.split(',')[0]) * 1000
            const postition = Number.parseInt(comment.p.split(',')[1])
            const color = Number.parseInt(comment.p.split(',')[2])

            const mode = getDanmuPosition(postition)
            // 示例用法

            // console.log(color,intToHexColor(color));
            return {
              duration: 10000, // 弹幕持续显示时间,毫秒(最低为5000毫秒)
              id: comment.cid, // 弹幕id，需唯一
              start, // 弹幕出现时间，毫秒
              txt: comment.m, // 弹幕文字内容
              mode,
              style: {
                color: intToHexColor(color),
              },
            }
          }),
          fontSize: 25,
          ext: {
            mouseControl: true,
            mouseControlPause: true,
          },

        },
      })
    }
  }, [playerRef, danmuData, url])

  return <div ref={playerRef} />
}

const getDanmuPosition = (position: number): string | undefined => {
  switch (position) {
    case 1: {
      return 'scroll'
    }
    case 4: {
      return 'bottom'
    }
    case 5: {
      return 'top'
    }
    default: {
      return undefined
    } // 或者返回一个默认值，例如 'unknown'
  }
}
