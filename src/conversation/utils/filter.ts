import { Conversation } from '../context'

export function filterConversation<T>(
  { botMessages, userMessages, botState }: Conversation<T>,
  filterFn: (timestamp: string) => boolean,
): Conversation<T> {
  return {
    botState,
    botMessages: Object.keys(botMessages)
      .filter(filterFn)
      .reduce(
        (previous, current) => ({
          ...previous,
          [current]: botMessages[current],
        }),
        {},
      ),
    userMessages: Object.keys(userMessages)
      .filter(filterFn)
      .reduce(
        (previous, current) => ({
          ...previous,
          [current]: userMessages[current],
        }),
        {},
      ),
  }
}
