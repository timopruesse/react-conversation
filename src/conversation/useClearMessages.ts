import { useContext } from 'react'
import { ConversationContext } from './context'

export function useClearMessages() {
  const { dispatch } = useContext(ConversationContext)

  return (start: number, end?: number) =>
    dispatch({
      type: 'messageClear',
      payload: {
        start,
        end,
      },
    })
}
