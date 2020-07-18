import React from 'react'
import { ConversationContext, Message, MessageCollection } from './context'

export default function useMessages<T>(): MessageCollection<T, Message<T>> {
  const {
    conversation: { botMessages, userMessages },
  } = React.useContext(ConversationContext)

  const allMessages = {
    ...botMessages,
    ...userMessages,
  }

  return Object.keys(allMessages)
    .sort()
    .reduce((previous, current) => {
      return {
        ...previous,
        [current]: allMessages[current],
      }
    }, {})
}
