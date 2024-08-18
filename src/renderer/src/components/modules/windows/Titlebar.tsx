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
      <button type="button" onClick={() => refetch()}>ismax?</button>
      <p>{`${data}`}</p>
      <button
        type="button"
        onClick={() => {
          tipcClient?.windowAction({ action: 'maximum' })
        }}
      >
        to max
      </button>
    </div>
  )
}
