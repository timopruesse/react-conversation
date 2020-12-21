import { useContext } from 'react'
import { ConversationContext } from './context'

export function useDeleteMessage() {
  const { dispatch } = useContext(ConversationContext)

  return (timestamp: number) =>
    dispatch({
      type: 'messageDelete',
      payload: { timestamp },
    })
}
