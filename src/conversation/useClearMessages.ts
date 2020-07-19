import React from 'react'
import { ConversationContext } from './context'

export default function useClearMessages() {
  const { dispatch } = React.useContext(ConversationContext)

  return (timestampStart: number, timestampEnd?: number) =>
    dispatch({
      type: 'messageClear',
      payload: {
        timestampStart,
        timestampEnd,
      },
    })
}
