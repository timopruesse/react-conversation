// eslint-disable-next-line import/no-unresolved
import { pick } from 'dot-object'
import { createContext, memo, useMemo, useReducer } from 'react'
import { ConversationBotState } from '../conversation/context'
import { useOnUserMessage } from '../conversation/useOnUserMessage'
import { useSendMessage } from '../conversation/useSendMessage'
import { useSetBotState } from '../conversation/useSetBotState'
import { MessageBot, MessageUser } from '../conversation/utils/message'

export type MessageReaction<T> = (
  message: MessageUser<T>,
) => Promise<MessageBot<T> | undefined>

type MessageReactions<T> = Record<React.Key, MessageReaction<T>>

export interface MessageReactionCollection<T> {
  [reactionKey: string]: MessageReactions<T>
}

export type MessageReactionsCreator<T> = (key: string) => MessageReactions<T>

interface MessageReactionAdd<T> {
  type: 'messageReactionAdd'
  payload: {
    key: string
    reaction: {
      key: React.Key
      handler: MessageReaction<T>
    }
  }
}

interface MessageReactionRemove {
  type: 'messageReactionRemove'
  payload: {
    key: string
    reaction: {
      key: React.Key
    }
  }
}

type MessageReactionAction<T> = MessageReactionAdd<T> | MessageReactionRemove

function throwProviderError() {
  throw new Error('MessageReactionContext: Provider is missing!')
}

interface MessageReactionContextType<T> {
  reactions: MessageReactionCollection<T>
  dispatch: React.Dispatch<MessageReactionAction<T>>
}

export const MessageReactionContext = createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MessageReactionContextType<any>
>({
  reactions: {},
  dispatch: throwProviderError,
})

function MessageReactionProvider<T>({
  children,
  reactions: initialReactions = {},
}: React.PropsWithChildren<{ reactions?: MessageReactionCollection<T> }>) {
  const [reactions, dispatch] = useReducer(
    (state: MessageReactionCollection<T>, action: MessageReactionAction<T>) => {
      switch (action.type) {
        case 'messageReactionAdd':
          const { key: addKey, reaction: addReaction } = action.payload

          return {
            ...state,
            [addKey]: {
              ...state[addKey],
              [addReaction.key]: addReaction.handler,
            },
          }

        case 'messageReactionRemove':
          const { key: removeKey, reaction: removeReaction } = action.payload
          const subState = state[removeKey]

          return {
            ...state,
            [removeKey]: {
              ...Object.keys(subState)
                .filter((currentKey) => currentKey !== removeReaction.key)
                .reduce(
                  (previous, current) => ({
                    ...previous,
                    [current]: subState[current],
                  }),
                  {},
                ),
            },
          }

        default:
          return state
      }
    },
    initialReactions,
  )

  const sendMessage = useSendMessage<T>()
  const setBotState = useSetBotState()

  useOnUserMessage<T>(
    async (message: MessageUser<T>, botState: ConversationBotState) => {
      if (botState === 'reacting') {
        return
      }

      for (const reactionKey of Object.keys(reactions)) {
        const messageValue = pick(reactionKey, message)

        const reaction = Object.keys(reactions[reactionKey]).find(
          (o) => o === messageValue,
        )

        if (!reaction) {
          continue
        }

        setBotState('reacting')

        try {
          const botMessage = await reactions[reactionKey][messageValue](message)
          if (!botMessage) {
            return
          }

          sendMessage(botMessage)

          return
        } finally {
          setBotState('idle')
        }
      }
    },
  )

  const value = useMemo(
    () => ({
      reactions,
      dispatch,
    }),
    [reactions, dispatch],
  )

  return (
    <MessageReactionContext.Provider value={value}>
      {children}
    </MessageReactionContext.Provider>
  )
}

const MemoizedMessageReactionProvider = memo(
  MessageReactionProvider,
) as typeof MessageReactionProvider

export { MemoizedMessageReactionProvider as MessageReactionProvider }
