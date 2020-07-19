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

interface ClearMessageRange {
  range: { start: number; end?: number }
}

export type MessageClearPayload = ClearMessageRange | { timestamp: number }

function isTimestampRange(
  payload: MessageClearPayload,
): payload is ClearMessageRange {
  return (payload as ClearMessageRange).range !== undefined
}

function getMessageClearFilterFn(payload: MessageClearPayload) {
  if (isTimestampRange(payload)) {
    const {
      range: { start, end },
    } = payload

    return (ts: string) => {
      const numericTs = +ts

      if (end) {
        return numericTs < start || numericTs > end
      }

      return numericTs < start
    }
  }

  return (ts: string) => +ts !== payload.timestamp
}

interface MessageClearAction {
  type: 'messageClear'
  payload: MessageClearPayload
}

type ConversationAction<T> =
  | MessageSendAction<T>
  | MessageEditAction<T>
  | MessageClearAction

function getNextFreeTimestamp(
  botMessages: MessageCollection<unknown, MessageBot<unknown>>,
  userMessages: MessageCollection<unknown, MessageUser<unknown>>,
): number {
  const now = new Date()

  let currentTimestamp = now.valueOf()

  let message: Message<unknown> | undefined =
    userMessages[currentTimestamp] || botMessages[currentTimestamp]

  if (!message) {
    return currentTimestamp
  }

  while (message) {
    now.setMilliseconds(now.getMilliseconds() + 1)
    currentTimestamp = now.valueOf()

    message = userMessages[currentTimestamp] || botMessages[currentTimestamp]
  }

  return currentTimestamp
}

function ConversationProvider<T>({
  children,
}: React.PropsWithChildren<unknown>) {
  const [conversation, dispatch] = React.useReducer(
    (state: Conversation<T>, action: ConversationAction<T>) => {
      switch (action.type) {
        case 'messageSend':
          const { message } = action.payload
          const ts = getNextFreeTimestamp(state.botMessages, state.userMessages)

          if (message.type === 'bot') {
            return {
              userMessages: state.userMessages,
              botMessages: {
                ...state.botMessages,
                [ts]: message,
              },
            }
          }

          return {
            botMessages: state.botMessages,
            userMessages: {
              ...state.userMessages,
              [ts]: message,
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
        case 'messageClear':
          const filterFunc = getMessageClearFilterFn(action.payload)

          return {
            botMessages: Object.keys(state.botMessages)
              .filter(filterFunc)
              .reduce((previous, current) => {
                return {
                  ...previous,
                  [current]: state.botMessages[current],
                }
              }, {}),
            userMessages: Object.keys(state.userMessages)
              .filter(filterFunc)
              .reduce((previous, current) => {
                return {
                  ...previous,
                  [current]: state.userMessages[current],
                }
              }, {}),
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
