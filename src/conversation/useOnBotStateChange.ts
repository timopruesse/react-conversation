import React from 'react'
import { useBotState } from './useBotState'
import { ConversationBotState } from './context'

type OnBotStateChange = (state: ConversationBotState) => void

export function useOnBotStateChange(onBotStateChange: OnBotStateChange) {
  const botState = useBotState()

  React.useEffect(
    () => {
      onBotStateChange(botState)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [botState],
  )
}
