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

export function getNextFreeTimestamp(
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
