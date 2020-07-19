/* eslint-disable no-console */
import React from 'react'
import { render, act } from '@testing-library/react'
import mockDate from 'mockdate'
import {
  ConversationContext,
  MessageCollection,
  Message,
  MessageUser,
  ConversationProvider,
  MessageBot,
} from './context'
import useMessages from './useMessages'
import useSendMessage from './useSendMessage'

describe('context', () => {
  it('throws error when not provider is defined', () => {
    const originalError = console.error
    console.error = jest.fn()

    const Component = () => {
      const { dispatch } = React.useContext(ConversationContext)

      React.useEffect(() => {
        dispatch({
          type: 'messageSend',
          payload: {
            message: {
              type: 'bot',
              text: 'test',
            },
          },
        })
      }, [dispatch])

      return null
    }

    expect(() => render(<Component />)).toThrowError(
      new Error('ConversationContext: Provider is missing!'),
    )

    console.error = originalError
  })

  it('does not overwrite timestamps', () => {
    let messages: MessageCollection<unknown, Message<unknown>> | undefined
    let send: ((message: Message<unknown>) => void) | undefined

    const Component = () => {
      messages = useMessages()
      send = useSendMessage()

      return null
    }

    const testUserMessage: MessageUser<unknown> = {
      type: 'user',
      text: 'test',
    }

    const testBotMessage: MessageBot<unknown> = {
      type: 'bot',
      text: 'test',
    }

    act(() => {
      render(
        <ConversationProvider>
          <Component />
        </ConversationProvider>,
      )
    })

    act(() => {
      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      mockDate.set(100)
      send(testUserMessage)
    })

    act(() => {
      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      mockDate.set(100)
      send(testUserMessage)
    })

    act(() => {
      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      mockDate.set(100)
      send(testBotMessage)
    })

    expect(Object.keys(messages || {})).toHaveLength(3)
    expect(messages).toEqual({
      100: testUserMessage,
      101: testUserMessage,
      102: testBotMessage,
    })
  })
})
