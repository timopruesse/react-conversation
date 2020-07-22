import React from 'react'
import { MessageReactionContext } from './context'

export default function useRemoveMessageReaction() {
  const { dispatch } = React.useContext(MessageReactionContext)

  return (key: string, reactionKey: React.Key) =>
    dispatch({
      type: 'messageReactionRemove',
      payload: {
        key,
        reaction: {
          key: reactionKey,
        },
      },
    })
}
