import React from 'react'
import { Message, ConversationContext } from './context'

export default function useSendMessage<T>() {
  const { dispatch } = React.useContext(ConversationContext)

  return (message: Message<T>) =>
    dispatch({
      type: 'messageSend',
      message,
    })
}
