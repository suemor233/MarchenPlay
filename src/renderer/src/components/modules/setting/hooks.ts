import { jotaiStore } from '@renderer/atoms/store'
import { atom } from 'jotai'

export const settingDialogAtom = atom(false)

export const showSettingDialog = () => jotaiStore.set(settingDialogAtom, true)
