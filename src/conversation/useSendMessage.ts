import { useContext } from 'react'
import { ConversationContext } from './context'
import { Message } from './utils/message'

export function useSendMessage<T>() {
  const { dispatch } = useContext(ConversationContext)

  return (message: Message<T>) =>
    dispatch({
      type: 'messageSend',
      payload: {
        message,
      },
    })
}
