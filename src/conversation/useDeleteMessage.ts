import React from 'react'
import { ConversationContext } from './context'

export default function useDeleteMessage() {
  const { dispatch } = React.useContext(ConversationContext)

  return (timestamp: number) =>
    dispatch({
      type: 'messageDelete',
      payload: { timestamp },
    })
}
