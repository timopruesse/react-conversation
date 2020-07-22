import React from 'react'
import { MessageUpdate, ConversationContext } from './context'

export function useEditMessage<T>() {
  const { dispatch } = React.useContext(ConversationContext)

  return (timestamp: number, update: MessageUpdate<T>) =>
    dispatch({
      type: 'messageEdit',
      payload: {
        timestamp,
        update,
      },
    })
}
