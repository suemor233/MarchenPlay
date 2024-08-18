import { tipcClient } from '@renderer/libs/client'
import { useQuery } from '@tanstack/react-query'

export const Titlebar = () => {
  const { data, refetch } = useQuery({
    queryKey: ['windowIsmaximized'],
    queryFn: () => tipcClient?.getWindowIsMaximized(),
  })

  // eslint-disable-next-line no-console
  console.log(data, '=====')

  return (
    <div>
      <button onClick={() => refetch()}>max</button>
    </div>
  )
}
