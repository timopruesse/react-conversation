import React from 'react'
import { render, act } from '@testing-library/react'
import useSendMessage from './useSendMessage'
import {
  Message,
  MessageUser,
  ConversationProvider,
  MessageUpdate,
  MessageCollection,
} from './context'
import useEditMessage from './useEditMessage'
import useMessages from './useMessages'

describe('useEditMessage', () => {
  it('updates message', () => {
    const timestamp = 1337
    const originalDateNow = Date.now
    Date.now = () => timestamp

    let messages: MessageCollection<unknown, Message<unknown>> | undefined
    let send: ((message: Message<unknown>) => void) | undefined
    let edit:
      | ((timestamp: number, update: MessageUpdate<unknown>) => void)
      | undefined

    const Component = () => {
      messages = useMessages()
      send = useSendMessage()
      edit = useEditMessage()

      return null
    }

    const testUserMessage: MessageUser<unknown> = {
      type: 'user',
      text: 'Hello world!',
      meta: {
        test: 'initial',
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

    expect(messages).toEqual({
      [timestamp]: testUserMessage,
    })

    act(() => {
      if (!edit) {
        throw new Error('Check the correct usage of "useEditMessage"!')
      }

      edit(timestamp, {
        text: 'Hallo Welt!',
        meta: { test: 'updated' },
      })
    })

    expect(messages).toEqual({
      [timestamp]: {
        type: testUserMessage.type,
        text: 'Hallo Welt!',
        meta: { test: 'updated' },
      },
    })

    Date.now = originalDateNow
  })
})
