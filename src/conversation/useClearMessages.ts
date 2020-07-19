import React from 'react'
import { ConversationContext } from './context'

export default function useClearMessages() {
  const { dispatch } = React.useContext(ConversationContext)

  return (timestamp: number) =>
    dispatch({
      type: 'messageClear',
      payload: {
        timestamp,
      },
    })
}
