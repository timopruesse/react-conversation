import React from 'react'
import { ConversationContext } from './context'

export function useDeleteMessage() {
  const { dispatch } = React.useContext(ConversationContext)

  return (timestamp: number) =>
    dispatch({
      type: 'messageDelete',
      payload: { timestamp },
    })
}
