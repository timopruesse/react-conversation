import React from 'react'
import { render, act } from '@testing-library/react'
import { useSendMessage } from './useSendMessage'
import {
  Message,
  MessageUser,
  MessageBot,
  ConversationProvider,
} from './context'
import { useOnUserMessage } from './useOnUserMessage'

describe('useOnUserMessage', () => {
  it('listens to user messages', () => {
    let send: ((message: Message<unknown>) => void) | undefined

    const onUserMessage = jest.fn()

    const Component = () => {
      send = useSendMessage()
      useOnUserMessage(onUserMessage)

      return null
    }

    const testUserMessage: MessageUser<unknown> = {
      type: 'user',
      text: 'test',
      meta: {
        test: 'meta',
      },
    }

    act(() => {
      render(
        <ConversationProvider>
          <Component />
        </ConversationProvider>,
      )

      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      send(testUserMessage)
    })

    expect(onUserMessage).toHaveBeenCalledWith(testUserMessage, 'idle')
  })

  it('does not listen to bot messages', () => {
    let send: ((message: Message<unknown>) => void) | undefined

    const onUserMessage = jest.fn()

    const Component = () => {
      send = useSendMessage()
      useOnUserMessage(onUserMessage)

      return null
    }

    const testBotMessage: MessageBot<unknown> = {
      type: 'bot',
      text: 'test',
      meta: {
        test: 'meta',
      },
    }

    act(() => {
      render(
        <ConversationProvider>
          <Component />
        </ConversationProvider>,
      )

      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      send(testBotMessage)
    })

    expect(onUserMessage).not.toHaveBeenCalledWith(testBotMessage)
  })
})
