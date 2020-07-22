import React from 'react'
import { render, act } from '@testing-library/react'
import { useSendMessage } from './useSendMessage'
import {
  Message,
  MessageBot,
  ConversationProvider,
  MessageUser,
} from './context'
import { useOnBotMessage } from './useOnBotMessage'

describe('useOnBotMessage', () => {
  it('listens to bot messages', () => {
    let send: ((message: Message<unknown>) => void) | undefined

    const onBotMessage = jest.fn()

    const Component = () => {
      send = useSendMessage()
      useOnBotMessage(onBotMessage)

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

    expect(onBotMessage).toHaveBeenCalledWith(testBotMessage)
  })

  it('does not listen to user messages', () => {
    let send: ((message: Message<unknown>) => void) | undefined

    const onBotMessage = jest.fn()

    const Component = () => {
      send = useSendMessage()
      useOnBotMessage(onBotMessage)

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

    expect(onBotMessage).not.toHaveBeenCalledWith(testUserMessage)
  })
})
