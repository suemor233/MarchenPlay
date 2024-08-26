import type { MatchResponseV2 } from '@renderer/request/models/match'
import { atom } from 'jotai'

export const videoAtom = atom({
  url: '',
  hash: '',
  size: 0,
  name: '',
})

export const matchedVideoAtom = atom<MatchResponseV2 | null>(null)
