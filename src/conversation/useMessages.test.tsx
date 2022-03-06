import { render } from '@testing-library/react'
import { useMemo } from 'react'
import { useMessages } from './useMessages'
import { Conversation, ConversationContext } from './context'
import { Message, MessageCollection } from './utils/message'

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

function TestProvider({ children }: React.PropsWithChildren<unknown>) {
  const value = useMemo(
    () => ({ conversation: unorderedConversation, dispatch: () => null }),
    [],
  )

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  )
}

describe('useMessages', () => {
  it('gets all of the messages in the correct order', () => {
    let messages: MessageCollection<unknown, Message<unknown>> | undefined

    function Component() {
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
