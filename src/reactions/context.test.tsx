import React from 'react'
import { render, act } from '@testing-library/react'
import { useAddMessageReaction } from './useAddMessageReaction'
import { MessageReactionProvider, MessageReaction } from './context'
import {
  ConversationProvider,
  MessageBot,
  Message,
  MessageUser,
} from '../conversation/context'
import { useSendMessage } from '../conversation/useSendMessage'

const TestProvider = ({ children }: React.PropsWithChildren<unknown>) => (
  <ConversationProvider>
    <MessageReactionProvider>{children}</MessageReactionProvider>
  </ConversationProvider>
)

describe('Message Reactions', () => {
  it('reacts to messages correctly', () => {
    const botTestMessage: MessageBot<{ triggered: boolean }> = {
      type: 'bot',
      text: 'reacted',
      meta: {
        triggered: true,
      },
    }

    let send: ((message: Message<{ test: string }>) => void) | undefined
    let addReaction:
      | ((
          key: string,
          reactionKey: React.Key,
          handler: MessageReaction<unknown>,
        ) => void)
      | undefined

    const messageHandler = jest.fn(() => {
      return botTestMessage
    })

    const Component = () => {
      send = useSendMessage()
      addReaction = useAddMessageReaction()

      return null
    }

    render(
      <TestProvider>
        <Component />
      </TestProvider>,
    )

    const testUserMessage: MessageUser<{ test: string }> = {
      type: 'user',
      text: 'hello',
      meta: {
        test: 'trigger',
      },
    }

    act(() => {
      if (!send || !addReaction) {
        throw new Error('Hooks are not working correctly!')
      }

      addReaction('meta.test', 'trigger', messageHandler)

      send(testUserMessage)
    })

    expect(messageHandler).toHaveBeenCalledWith(testUserMessage)
    expect(messageHandler).toHaveReturnedWith(botTestMessage)
  })
})
