import React from 'react'
import { render, act } from '@testing-library/react'
import mockDate from 'mockdate'
import useSendMessage from './useSendMessage'
import {
  Message,
  MessageUser,
  ConversationProvider,
  MessageCollection,
  MessageClearPayload,
} from './context'
import useMessages from './useMessages'
import useClearMessages from './useClearMessages'

describe('useClearMessages', () => {
  it('clears a single message', () => {
    let messages: MessageCollection<unknown, Message<unknown>> | undefined
    let send: ((message: Message<unknown>) => void) | undefined
    let clear: ((payload: MessageClearPayload) => void) | undefined

    const Component = () => {
      messages = useMessages()
      send = useSendMessage()
      clear = useClearMessages()

      return null
    }

    const testUserMessage: MessageUser<unknown> = {
      type: 'user',
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

      mockDate.set(1)
      send(testUserMessage)
    })

    act(() => {
      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      mockDate.set(2)
      send(testUserMessage)
    })

    act(() => {
      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      mockDate.set(3)
      send(testUserMessage)
    })

    act(() => {
      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      mockDate.set(4)
      send(testUserMessage)
    })

    expect(Object.keys(messages || {})).toHaveLength(4)
    expect(messages).toEqual({
      1: testUserMessage,
      2: testUserMessage,
      3: testUserMessage,
      4: testUserMessage,
    })

    act(() => {
      if (!clear) {
        throw new Error('Check the correct usage of "useClearMessages"!')
      }

      clear({ timestamp: 3 })
    })

    expect(Object.keys(messages || {})).toHaveLength(3)
    expect(messages).toEqual({
      1: testUserMessage,
      2: testUserMessage,
      4: testUserMessage,
    })
  })

  it('clears range of messages', () => {
    let messages: MessageCollection<unknown, Message<unknown>> | undefined
    let send: ((message: Message<unknown>) => void) | undefined
    let clear: ((payload: MessageClearPayload) => void) | undefined

    const Component = () => {
      messages = useMessages()
      send = useSendMessage()
      clear = useClearMessages()

      return null
    }

    const testUserMessage: MessageUser<unknown> = {
      type: 'user',
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

      mockDate.set(1)
      send(testUserMessage)
    })

    act(() => {
      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      mockDate.set(2)
      send(testUserMessage)
    })

    act(() => {
      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      mockDate.set(3)
      send(testUserMessage)
    })

    act(() => {
      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      mockDate.set(4)
      send(testUserMessage)
    })

    expect(Object.keys(messages || {})).toHaveLength(4)
    expect(messages).toEqual({
      1: testUserMessage,
      2: testUserMessage,
      3: testUserMessage,
      4: testUserMessage,
    })

    act(() => {
      if (!clear) {
        throw new Error('Check the correct usage of "useClearMessages"!')
      }

      clear({ range: { start: 2, end: 3 } })
    })

    expect(Object.keys(messages || {})).toHaveLength(2)
    expect(messages).toEqual({
      1: testUserMessage,
      4: testUserMessage,
    })
  })
})
