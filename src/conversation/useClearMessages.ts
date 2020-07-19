import React from 'react'
import { ConversationContext, MessageClearPayload } from './context'

export default function useClearMessages() {
  const { dispatch } = React.useContext(ConversationContext)

  return (payload: MessageClearPayload) =>
    dispatch({
      type: 'messageClear',
      payload,
    })
}
