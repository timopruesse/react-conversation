import React from 'react'

export type MessageType = 'bot' | 'user'

export interface MessageBase<T> {
  text: string
  meta?: T
}

export interface MessageBot<T> extends MessageBase<T> {
  type: 'bot'
}

export interface MessageUser<T> extends MessageBase<T> {
  type: 'user'
}

export type Message<T> = MessageBot<T> | MessageUser<T>

export interface MessageCollection<T, M extends MessageBase<T>> {
  [timestamp: number]: M
}

export interface Conversation<T = unknown> {
  botMessages: MessageCollection<T, MessageBot<T>>
  userMessages: MessageCollection<T, MessageUser<T>>
}

interface ConversationContextType<T> {
  conversation: Conversation<T>
  dispatch: React.Dispatch<ConversationAction<T>>
}

function throwProviderError() {
  throw new Error('ConversationContext: Provider is missing!')
}

export const ConversationContext = React.createContext<
  ConversationContextType<unknown>
>({
  conversation: {
    botMessages: {},
    userMessages: {},
  },
  dispatch: throwProviderError,
})

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

type ConversationAction<T> = MessageSendAction<T> | MessageEditAction<T>

function ConversationProvider<T>({
  children,
}: React.PropsWithChildren<unknown>) {
  const [conversation, dispatch] = React.useReducer(
    (state: Conversation<T>, action: ConversationAction<T>) => {
      switch (action.type) {
        case 'messageSend':
          const { message } = action.payload

          if (message.type === 'bot') {
            return {
              userMessages: state.userMessages,
              botMessages: {
                ...state.botMessages,
                [Date.now()]: message,
              },
            }
          }

          return {
            botMessages: state.botMessages,
            userMessages: {
              ...state.userMessages,
              [Date.now()]: message,
            },
          }
        case 'messageEdit':
          const { timestamp, update } = action.payload
          const currentMessage = (state.botMessages[timestamp] ||
            state.userMessages[timestamp]) as Message<T>

          if (currentMessage.type === 'bot') {
            return {
              userMessages: state.userMessages,
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
            botMessages: state.botMessages,
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
        default:
          /* istanbul ignore next */
          return state
      }
    },
    { botMessages: {}, userMessages: {} },
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

const MemoizedConversationProvider = React.memo(
  ConversationProvider,
) as typeof ConversationProvider

export { MemoizedConversationProvider as ConversationProvider }
