import { createContext, memo, useReducer } from 'react'
import { filterConversation } from './utils/filter'
import {
  getNextFreeTimestamp,
  Message,
  MessageBot,
  MessageCollection,
  MessageUser,
} from './utils/message'

export type ConversationBotState = 'idle' | 'reacting'

interface ConversationBotStateSetAction {
  type: 'setBotState'
  payload: ConversationBotState
}

export interface Conversation<T = unknown> {
  botState: ConversationBotState
  botMessages: MessageCollection<T, MessageBot<T>>
  userMessages: MessageCollection<T, MessageUser<T>>
}

interface MessageSendAction<T> {
  type: 'messageSend'
  payload: {
    message: Message<T>
  }
}

export type MessageUpdate<T> = DeepPartial<Omit<Message<T>, 'type'>>

interface MessageEditAction<T> {
  type: 'messageEdit'
  payload: {
    timestamp: number
    update: MessageUpdate<T>
  }
}

interface MessageDeleteAction {
  type: 'messageDelete'
  payload: {
    timestamp: number
  }
}

interface MessageClearAction {
  type: 'messageClear'
  payload: {
    start: number
    end?: number
  }
}

type ConversationAction<T> =
  | MessageSendAction<T>
  | MessageEditAction<T>
  | MessageDeleteAction
  | MessageClearAction
  | ConversationBotStateSetAction

interface ConversationContextType<T> {
  conversation: Conversation<T>
  dispatch: React.Dispatch<ConversationAction<T>>
}

function throwProviderError() {
  throw new Error('ConversationContext: Provider is missing!')
}

export const ConversationContext = createContext<
  ConversationContextType<unknown>
>({
  conversation: {
    botState: 'idle',
    botMessages: {},
    userMessages: {},
  },
  dispatch: throwProviderError,
})

function ConversationProvider<T>({
  children,
}: React.PropsWithChildren<unknown>) {
  const [conversation, dispatch] = useReducer(
    (state: Conversation<T>, action: ConversationAction<T>) => {
      switch (action.type) {
        case 'messageSend':
          const { message } = action.payload
          const ts = getNextFreeTimestamp(state.botMessages, state.userMessages)

          if (message.type === 'bot') {
            return {
              ...state,
              botMessages: {
                ...state.botMessages,
                [ts]: message,
              },
            }
          }

          return {
            ...state,
            userMessages: {
              ...state.userMessages,
              [ts]: message,
            },
          }
        case 'messageEdit':
          const { timestamp, update } = action.payload
          const currentMessage = (state.botMessages[timestamp] ||
            state.userMessages[timestamp]) as Message<T> | undefined

          if (!currentMessage) {
            return state
          }

          if (currentMessage.type === 'bot') {
            return {
              ...state,
              botMessages: {
                ...state.botMessages,
                [`${timestamp}`]: {
                  type: currentMessage.type,
                  text: update.text || currentMessage.text,
                  meta: {
                    ...currentMessage.meta,
                    ...update.meta,
                  },
                },
              },
            }
          }

          return {
            ...state,
            userMessages: {
              ...state.userMessages,
              [`${timestamp}`]: {
                type: currentMessage.type,
                text: update.text || currentMessage.text,
                meta: {
                  ...currentMessage.meta,
                  ...update.meta,
                },
              },
            },
          }
        case 'messageDelete':
          return filterConversation(
            state,
            (tsToDelete: string) => +tsToDelete !== action.payload.timestamp,
          )
        case 'messageClear':
          const { start, end } = action.payload

          return filterConversation(state, (tsToClear: string) => {
            const numericTs = +tsToClear

            if (end) {
              return numericTs < start || numericTs > end
            }

            return numericTs < start
          })
        case 'setBotState':
          return {
            ...state,
            botState: action.payload,
          }
        default:
          /* istanbul ignore next */
          return state
      }
    },
    { botState: 'idle', botMessages: {}, userMessages: {} },
  )

  const value = {
    conversation,
    dispatch,
  }

  return (
    <ConversationContext.Provider
      value={value as ConversationContextType<unknown>}
    >
      {children}
    </ConversationContext.Provider>
  )
}

const MemoizedConversationProvider = memo(
  ConversationProvider,
) as typeof ConversationProvider

export { MemoizedConversationProvider as ConversationProvider }
