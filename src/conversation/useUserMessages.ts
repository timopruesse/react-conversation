import { useContext } from 'react'
import { ConversationContext } from './context'
import { MessageCollection, MessageUser } from './utils/message'

export function useUserMessages<T>(): MessageCollection<T, MessageUser<T>> {
  const {
    conversation: { userMessages },
  } = useContext(ConversationContext)

  return Object.keys(userMessages)
    .sort()
    .reduce(
      (previous, current) => ({
        ...previous,
        [current]: userMessages[current],
      }),
      {},
    )
}
