import React from 'react'
import { render, act, waitFor } from '@testing-library/react'
import { useAddMessageReaction } from './useAddMessageReaction'
import { MessageReactionProvider, MessageReaction } from './context'
import {
  ConversationProvider,
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
    let send: ((message: Message<{ test: string }>) => void) | undefined
    let addReaction:
      | ((
          key: string,
          reactionKey: React.Key,
          handler: MessageReaction<unknown>,
        ) => void)
      | undefined

    const testUserMessage: MessageUser<{ test: string }> = {
      type: 'user',
      text: 'hello',
      meta: {
        test: 'trigger',
      },
    }

    act(() => {
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
    })

    const messageHandler = jest.fn()

    act(() => {
      if (!addReaction) {
        throw new Error('Check the correct usage of "useAddMessageReaction"!')
      }

      addReaction('meta.test', 'trigger', messageHandler)
    })

    act(() => {
      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      send(testUserMessage)
    })

    // Reaction needs to be processed
    waitFor(() => {}, { timeout: 1 })

    expect(messageHandler).toHaveBeenCalledWith(testUserMessage)
  })
})
