import React from 'react'
import { MessageReactionContext, MessageReaction } from './context'

export function useAddMessageReaction<T>() {
  const { dispatch } = React.useContext(MessageReactionContext)

  return (key: string, reactionKey: React.Key, handler: MessageReaction<T>) =>
    dispatch({
      type: 'messageReactionAdd',
      payload: {
        key,
        reaction: {
          key: reactionKey,
          handler: handler as MessageReaction<unknown>,
        },
      },
    })
}
