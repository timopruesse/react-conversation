import { render } from '@testing-library/react'
import { useMemo } from 'react'
import { useSendMessage } from './useSendMessage'
import { Conversation, ConversationContext } from './context'
import { Message, MessageBot, MessageUser } from './utils/message'

const emptyConversation: Conversation<unknown> = {
  botState: 'idle',
  botMessages: {},
  userMessages: {},
}

const messageDispatcher = jest.fn()

function TestProvider({ children }: React.PropsWithChildren<unknown>) {
  const value = useMemo(
    () => ({ conversation: emptyConversation, dispatch: messageDispatcher }),
    [],
  )

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  )
}

describe('useSendMessage', () => {
  beforeEach(() => {
    messageDispatcher.mockClear()
  })

  it('sends message', () => {
    let send: ((message: Message<unknown>) => void) | undefined

    function Component() {
      send = useSendMessage()

      return null
    }

    render(
      <TestProvider>
        <Component />
      </TestProvider>,
    )

    if (!send) {
      throw new Error('Check the correct usage of "useSendMessage"!')
    }

    const testBotMessage: MessageBot<unknown> = {
      type: 'bot',
      text: 'test',
      meta: {
        test: 'meta',
      },
    }

    send(testBotMessage)
    expect(messageDispatcher).toHaveBeenCalledWith({
      type: 'messageSend',
      payload: {
        message: testBotMessage,
      },
    })

    const testUserMessage: MessageUser<unknown> = {
      type: 'user',
      text: 'test',
      meta: {
        test: 'meta',
      },
    }

    send(testUserMessage)
    expect(messageDispatcher).toHaveBeenCalledWith({
      type: 'messageSend',
      payload: {
        message: testUserMessage,
      },
    })
  })
})
