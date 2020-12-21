import { useContext } from 'react'
import { MessageReactionContext } from './context'

export function useRemoveMessageReaction() {
  const { dispatch } = useContext(MessageReactionContext)

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
