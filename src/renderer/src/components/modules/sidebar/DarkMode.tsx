import { Tabs, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import type { AppTheme } from '@renderer/hooks/theme'
import { useAppTheme } from '@renderer/hooks/theme'

export const DarkModeToggle = () => {
  const { toggleMode, theme } = useAppTheme()
  return (
    <div className="mb-5 mr-5 text-center">
      <Tabs
        className="w-full"
        defaultValue={theme}
        onValueChange={(value: string) => toggleMode(value as AppTheme)}
      >
        <TabsList>
          <TabsTrigger value="system">系统</TabsTrigger>
          <TabsTrigger value="cmyk">白天</TabsTrigger>
          <TabsTrigger value="dark">夜间</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
