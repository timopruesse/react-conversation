import React from 'react'
import { ConversationContext } from './context'

export default function useClearMessages() {
  const { dispatch } = React.useContext(ConversationContext)

  return (start: number, end?: number) =>
    dispatch({
      type: 'messageClear',
      payload: {
        start,
        end,
      },
    })
}
