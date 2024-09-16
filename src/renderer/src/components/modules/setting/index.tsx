import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@renderer/components/ui/dialog'
import { useAtom } from 'jotai'

import { settingDialogAtom } from './hooks'

export const SettingDialog = () => {
  const [open, setOpen] = useAtom(settingDialogAtom)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>正在编写中</DialogTitle>
          <DialogDescription>正在编写中</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
