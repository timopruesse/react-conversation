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

interface ConversationContextType {
  conversation: Conversation
  dispatch: React.Dispatch<ConversationAction>
}

const defaultContext: ConversationContextType = {
  conversation: {
    botMessages: {},
    userMessages: {},
  },
  dispatch: () => {
    throw new Error('ConversationContext: Provider is missing!')
  },
}

export const ConversationContext = React.createContext<ConversationContextType>(
  defaultContext,
)

interface MessagePushAction<T = unknown> {
  type: 'messagePush'
  message: Message<T>
}

type ConversationAction = MessagePushAction

const conversationReducer: React.Reducer<Conversation, ConversationAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'messagePush':
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
      return state
  }
}

const ConversationProvider = React.memo(
  ({ children }: React.PropsWithChildren<unknown>) => {
    const [conversation, dispatch] = React.useReducer(
      conversationReducer,
      defaultContext.conversation,
    )

    return (
      <ConversationContext.Provider
        value={{
          conversation,
          dispatch,
        }}
      >
        {children}
      </ConversationContext.Provider>
    )
  },
)

ConversationProvider.displayName = 'ConversationProvider'

export { ConversationProvider }
