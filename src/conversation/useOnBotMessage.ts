import React from 'react'
import { ConversationContext, MessageBot } from './context'

type OnBotMessage<T> = (message: MessageBot<T>) => void

export default function useOnBotMessage<T>(onBotMessage: OnBotMessage<T>) {
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
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation.botMessages])
}
