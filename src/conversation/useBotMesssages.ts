import { useContext } from 'react'
import { ConversationContext } from './context'
import { MessageBot, MessageCollection } from './utils/message'

export function useBotMessages<T>(): MessageCollection<T, MessageBot<T>> {
  const {
    conversation: { botMessages },
  } = useContext(ConversationContext)

  return Object.keys(botMessages)
    .sort()
    .reduce(
      (previous, current) => ({
        ...previous,
        [current]: botMessages[current],
      }),
      {},
    )
}
