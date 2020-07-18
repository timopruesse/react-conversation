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
  message: Message<T>
}

type ConversationAction<T> = MessageSendAction<T>

function ConversationProvider<T>({
  children,
}: React.PropsWithChildren<unknown>) {
  const [conversation, dispatch] = React.useReducer(
    (state: Conversation<T>, action: ConversationAction<T>) => {
      switch (action.type) {
        case 'messageSend':
          if (action.message.type === 'bot') {
            return {
              userMessages: state.userMessages,
              botMessages: {
                ...state.botMessages,
                [Date.now()]: action.message,
              },
            }
          }

          return {
            botMessages: state.botMessages,
            userMessages: {
              ...state.userMessages,
              [Date.now()]: action.message,
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
