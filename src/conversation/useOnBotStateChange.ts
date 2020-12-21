import { useEffect } from 'react'
import { useBotState } from './useBotState'
import { ConversationBotState } from './context'
import { useCallbackFunction } from '../utils/useCallbackFunction'

type OnBotStateChange = (state: ConversationBotState) => void

export function useOnBotStateChange(onBotStateChange: OnBotStateChange) {
  const botState = useBotState()
  const onChange = useCallbackFunction(onBotStateChange)

  useEffect(() => {
    onChange.current(botState)
  }, [botState, onChange])
}
