import { Tabs, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import type { AppTheme } from '@renderer/hooks/theme'
import { useSetTheme } from '@renderer/hooks/theme'

export const DarkModeToggle = () => {
  const toggleMode = useSetTheme()
  return (
    <Tabs defaultValue="account" className="w-[400px]" onValueChange={(value: string) => toggleMode(value as AppTheme)}>
      <TabsList>
        <TabsTrigger value="system">系统</TabsTrigger>
        <TabsTrigger value="cmyk">白天</TabsTrigger>
        <TabsTrigger value="dark">夜间</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
