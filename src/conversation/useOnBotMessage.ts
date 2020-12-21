import { useContext, useEffect } from 'react'
import { ConversationContext, ConversationBotState } from './context'
import { MessageBot } from './utils/message'

type OnBotMessage<T> = (
  message: MessageBot<T>,
  botState: ConversationBotState,
) => void

export function useOnBotMessage<T>(onBotMessage: OnBotMessage<T>) {
  const { conversation } = useContext(ConversationContext)

  useEffect(() => {
    const botMessageCount = Object.keys(conversation.botMessages).length
    if (botMessageCount === 0) {
      return
    }

    onBotMessage(
      Object.values(conversation.botMessages)[
        botMessageCount - 1
      ] as MessageBot<T>,
      conversation.botState,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation.botMessages])
}
