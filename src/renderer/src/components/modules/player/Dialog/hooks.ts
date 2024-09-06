import { jotaiStore } from '@renderer/atoms/store'
import { atomWithReset } from 'jotai/utils'

export const showMatchAnimeDialogAtom = atomWithReset(false)

export const showMatchAnimeDialog = () => jotaiStore.set(showMatchAnimeDialogAtom, true)
