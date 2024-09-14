import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@renderer/components/ui/accordion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@renderer/components/ui/dialog'
import { ScrollArea } from '@renderer/components/ui/scrollArea'
import { useToast } from '@renderer/components/ui/toast'
import type { MatchResponseV2, MatchResultV2 } from '@renderer/request/models/match'
import { useAtom } from 'jotai'
import type { FC } from 'react'
import { useEffect, useMemo } from 'react'

import { showMatchAnimeDialogAtom } from './hooks'

interface MatchAnimeDialogProps {
  matchData?: MatchResponseV2
  onSelected?: (episodeId: number) => void
  onClosed?: () => void
}

export const MatchAnimeDialog: FC<MatchAnimeDialogProps> = (props) => {
  const { matchData, onSelected, onClosed } = props
  const [showMatchAnimeDialog, setShowMatchAnimeDialog] = useAtom(showMatchAnimeDialogAtom)
  const { toast } = useToast()
  useEffect(() => {
    if (matchData && !matchData.isMatched) {
      setShowMatchAnimeDialog(true)
    }
    return () => setShowMatchAnimeDialog(false)
  }, [matchData, setShowMatchAnimeDialog])
  // const aa = [[
  //   {},
  // ], [{}]]

  const accordionData = useMemo(() => {
    if (!matchData?.matches) return []

    const groupMatches = matchData.matches.reduce(
      (acc, match) => {
        if (!acc[match.animeId]) {
          acc[match.animeId] = []
        }

        acc[match.animeId].push(match)
        return acc
      },
      {} as Record<number, MatchResultV2[]>,
    )
    return Object.values(groupMatches)
  }, [matchData])

  return (
    <Dialog open={showMatchAnimeDialog} onOpenChange={(open) => setShowMatchAnimeDialog(open)}>
      <DialogContent
        className="sm:max-w-[725px]"
        onClosed={onClosed}
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">请手动选择弹幕库</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[600px] rounded-md border px-4">
          <Accordion type="single" collapsible className="w-full">
            {accordionData?.map((match) => {
              const { animeId, animeTitle } = match[0]

              return (
                <AccordionItem key={animeId} value={`${animeId}`}>
                  <AccordionTrigger>{animeTitle}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="mt-2 space-y-5 ">
                      {match.map((item) => (
                        <li
                          key={item.episodeId}
                          onClick={() => {
                            onSelected && onSelected(item.episodeId)
                            setShowMatchAnimeDialog(false)
                            toast({
                              title: '已选择弹幕库',
                              description: `已选择 ${animeTitle} ${item.episodeTitle}`,
                            })
                          }}
                          className="cursor-pointer hover:text-info"
                        >
                          {item.episodeTitle}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
