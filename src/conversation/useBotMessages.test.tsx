import React from 'react'
import { render } from '@testing-library/react'
import {
  Conversation,
  ConversationContext,
  MessageCollection,
  MessageBot,
} from './context'
import useBotMessages from './useBotMesssages'

const unorderedConversation: Conversation<unknown> = {
  botMessages: {
    2: {
      type: 'bot',
      text: 'second',
    },
    1: {
      type: 'bot',
      text: 'first',
    },
  },
  userMessages: {
    4: {
      type: 'user',
      text: 'second',
    },
    3: {
      type: 'user',
      text: 'first',
    },
  },
}

const TestProvider = ({ children }: React.PropsWithChildren<unknown>) => (
  <ConversationContext.Provider
    value={{ conversation: unorderedConversation, dispatch: () => null }}
  >
    {children}
  </ConversationContext.Provider>
)

describe('useBotMessages', () => {
  it('gets the bot messages in the correct order', () => {
    let botMessages: MessageCollection<unknown, MessageBot<unknown>> | undefined

    const Component = () => {
      botMessages = useBotMessages()

      return null
    }

    render(
      <TestProvider>
        <Component />
      </TestProvider>,
    )

    expect(Object.keys(botMessages || {})).toEqual(['1', '2'])
    expect(Object.values(botMessages || {})).toEqual([
      {
        type: 'bot',
        text: 'first',
      },
      {
        type: 'bot',
        text: 'second',
      },
    ])
  })
})
