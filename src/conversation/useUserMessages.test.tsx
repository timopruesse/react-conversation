import React from 'react'
import { render } from '@testing-library/react'
import {
  Conversation,
  ConversationContext,
  MessageCollection,
  MessageUser,
} from './context'
import { useUserMessages } from './useUserMessages'

const unorderedConversation: Conversation<unknown> = {
  botState: 'idle',
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

describe('useUserMessages', () => {
  it('gets the user messages in the correct order', () => {
    let userMessages:
      | MessageCollection<unknown, MessageUser<unknown>>
      | undefined

    const Component = () => {
      userMessages = useUserMessages()

      return null
    }

    render(
      <TestProvider>
        <Component />
      </TestProvider>,
    )

    expect(Object.keys(userMessages || {})).toEqual(['3', '4'])
    expect(Object.values(userMessages || {})).toEqual([
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
