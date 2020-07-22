import React from 'react'
import { render } from '@testing-library/react'
import { useMessages } from './useMessages'
import {
  Conversation,
  ConversationContext,
  MessageCollection,
  Message,
} from './context'

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

describe('useMessages', () => {
  it('gets all of the messages in the correct order', () => {
    let messages: MessageCollection<unknown, Message<unknown>> | undefined

    const Component = () => {
      messages = useMessages()

      return null
    }

    render(
      <TestProvider>
        <Component />
      </TestProvider>,
    )

    expect(Object.keys(messages || {})).toEqual(['1', '2', '3', '4'])
    expect(Object.values(messages || {})).toEqual([
      {
        type: 'bot',
        text: 'first',
      },
      {
        type: 'bot',
        text: 'second',
      },
      {
        type: 'user',
        text: 'first',
      },
      {
        type: 'user',
        text: 'second',
      },
    ])
  })
})
