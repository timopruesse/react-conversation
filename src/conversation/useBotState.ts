import { useContext } from 'react'
import { ConversationContext } from './context'

export function useBotState() {
  const {
    conversation: { botState },
  } = useContext(ConversationContext)

  return botState
}
