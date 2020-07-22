import { Conversation } from '../context'

// eslint-disable-next-line import/prefer-default-export
export function filterConversation<T>(
  { botMessages, userMessages }: Conversation<T>,
  filterFn: (timestamp: string) => boolean,
): Conversation<T> {
  return {
    botMessages: Object.keys(botMessages)
      .filter(filterFn)
      .reduce((previous, current) => {
        return {
          ...previous,
          [current]: botMessages[current],
        }
      }, {}),
    userMessages: Object.keys(userMessages)
      .filter(filterFn)
      .reduce((previous, current) => {
        return {
          ...previous,
          [current]: userMessages[current],
        }
      }, {}),
  }
}
