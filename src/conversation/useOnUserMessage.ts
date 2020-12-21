import { useContext, useEffect } from 'react'
import { ConversationContext, ConversationBotState } from './context'
import { MessageUser } from './utils/message'

type OnUserMessage<T> = (
  message: MessageUser<T>,
  botState: ConversationBotState,
) => void

export function useOnUserMessage<T>(onUserMessage: OnUserMessage<T>) {
  const { conversation } = useContext(ConversationContext)

  useEffect(() => {
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
