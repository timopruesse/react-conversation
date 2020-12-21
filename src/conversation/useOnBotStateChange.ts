import { useEffect } from 'react'
import { useBotState } from './useBotState'
import { ConversationBotState } from './context'

type OnBotStateChange = (state: ConversationBotState) => void

export function useOnBotStateChange(onBotStateChange: OnBotStateChange) {
  const botState = useBotState()

  useEffect(() => {
    onBotStateChange(botState)
  }, [botState, onBotStateChange])
}
