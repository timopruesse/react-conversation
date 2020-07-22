import React from 'react'
import { Message, ConversationContext } from './context'

export function useSendMessage<T>() {
  const { dispatch } = React.useContext(ConversationContext)

  return (message: Message<T>) =>
    dispatch({
      type: 'messageSend',
      payload: {
        message,
      },
    })
}
