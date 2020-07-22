import React from 'react'
import { MessageCollection, ConversationContext, MessageUser } from './context'

export function useUserMessages<T>(): MessageCollection<T, MessageUser<T>> {
  const {
    conversation: { userMessages },
  } = React.useContext(ConversationContext)

  return Object.keys(userMessages)
    .sort()
    .reduce((previous, current) => {
      return {
        ...previous,
        [current]: userMessages[current],
      }
    }, {})
}
