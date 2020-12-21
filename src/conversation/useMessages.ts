import { useContext } from 'react'
import { ConversationContext } from './context'
import { Message, MessageCollection } from './utils/message'

export function useMessages<T>(): MessageCollection<T, Message<T>> {
  const {
    conversation: { botMessages, userMessages },
  } = useContext(ConversationContext)

  const allMessages = {
    ...botMessages,
    ...userMessages,
  }

  return Object.keys(allMessages)
    .sort()
    .reduce(
      (previous, current) => ({
        ...previous,
        [current]: allMessages[current],
      }),
      {},
    )
}
