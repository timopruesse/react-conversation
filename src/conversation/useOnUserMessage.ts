import React from 'react'
import {
  ConversationContext,
  MessageUser,
  ConversationBotState,
} from './context'

type OnUserMessage<T> = (
  message: MessageUser<T>,
  botState: ConversationBotState,
) => void

export function useOnUserMessage<T>(onUserMessage: OnUserMessage<T>) {
  const { conversation } = React.useContext(ConversationContext)

  React.useEffect(() => {
    const userMessageCount = Object.keys(conversation.userMessages).length

    if (userMessageCount === 0) {
      return
    }

    onUserMessage(
      Object.values(conversation.userMessages)[
        userMessageCount - 1
      ] as MessageUser<T>,
      conversation.botState,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation.userMessages])
}
