import React from 'react'
import { render } from '@testing-library/react'
import { useSendMessage } from './useSendMessage'
import {
  Conversation,
  ConversationContext,
  Message,
  MessageBot,
  MessageUser,
} from './context'

const emptyConversation: Conversation<unknown> = {
  botMessages: {},
  userMessages: {},
}

const messageDispatcher = jest.fn()

const TestProvider = ({ children }: React.PropsWithChildren<unknown>) => (
  <ConversationContext.Provider
    value={{ conversation: emptyConversation, dispatch: messageDispatcher }}
  >
    {children}
  </ConversationContext.Provider>
)

describe('useSendMessage', () => {
  beforeEach(() => {
    messageDispatcher.mockClear()
  })

  it('sends message', () => {
    let send: ((message: Message<unknown>) => void) | undefined

    const Component = () => {
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
