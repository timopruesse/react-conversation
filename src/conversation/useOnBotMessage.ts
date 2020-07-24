import React from 'react'
import {
  ConversationContext,
  MessageBot,
  ConversationBotState,
} from './context'

type OnBotMessage<T> = (
  message: MessageBot<T>,
  botState: ConversationBotState,
) => void

export function useOnBotMessage<T>(onBotMessage: OnBotMessage<T>) {
  const { conversation } = React.useContext(ConversationContext)

  React.useEffect(() => {
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
