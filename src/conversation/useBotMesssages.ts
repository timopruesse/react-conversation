import React from 'react'
import { MessageCollection, MessageBot, ConversationContext } from './context'

export default function useBotMessages<T>(): MessageCollection<
  T,
  MessageBot<T>
> {
  const {
    conversation: { botMessages },
  } = React.useContext(ConversationContext)

  return Object.keys(botMessages)
    .sort()
    .reduce((previous, current) => {
      return {
        ...previous,
        [current]: botMessages[current],
      }
    }, {})
}
