import { render } from '@testing-library/react'
import { useMemo } from 'react'
import { Conversation, ConversationContext } from './context'
import { useUserMessages } from './useUserMessages'
import { MessageCollection, MessageUser } from './utils/message'

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

describe('useUserMessages', () => {
  it('gets the user messages in the correct order', () => {
    let userMessages:
      | MessageCollection<unknown, MessageUser<unknown>>
      | undefined

    function Component() {
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
