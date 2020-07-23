import React from 'react'
import { ConversationContext } from './context'

export function useBotState() {
  const {
    conversation: { botState },
  } = React.useContext(ConversationContext)

  return botState
}
