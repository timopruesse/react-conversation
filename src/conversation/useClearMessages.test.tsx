import React from 'react'
import { render, act } from '@testing-library/react'
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

    const originalDateNow = Date.now

    act(() => {
      render(
        <ConversationProvider>
          <Component />
        </ConversationProvider>,
      )

      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      let tsCounter = 0
      Date.now = () => {
        tsCounter += 1

        return tsCounter
      }

      send(testUserMessage) // ts === 4
      send(testUserMessage) // ts === 5
      send(testUserMessage) // ts === 6
      send(testUserMessage) // ts === 7
    })

    expect(Object.keys(messages || {})).toHaveLength(4)
    expect(messages).toEqual({
      4: testUserMessage,
      5: testUserMessage,
      6: testUserMessage,
      7: testUserMessage,
    })

    act(() => {
      if (!clear) {
        throw new Error('Check the correct usage of "useClearMessages"!')
      }

      clear({ timestamp: 6 })
    })

    expect(Object.keys(messages || {})).toHaveLength(3)
    expect(messages).toEqual({
      4: testUserMessage,
      5: testUserMessage,
      7: testUserMessage,
    })

    Date.now = originalDateNow
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

    const originalDateNow = Date.now

    act(() => {
      render(
        <ConversationProvider>
          <Component />
        </ConversationProvider>,
      )

      if (!send) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      let tsCounter = 0
      Date.now = () => {
        tsCounter += 1

        return tsCounter
      }

      send(testUserMessage) // ts === 4
      send(testUserMessage) // ts === 5
      send(testUserMessage) // ts === 6
      send(testUserMessage) // ts === 7
    })

    expect(Object.keys(messages || {})).toHaveLength(4)
    expect(messages).toEqual({
      4: testUserMessage,
      5: testUserMessage,
      6: testUserMessage,
      7: testUserMessage,
    })

    act(() => {
      if (!clear) {
        throw new Error('Check the correct usage of "useClearMessages"!')
      }

      clear({ range: { start: 5, end: 6 } })
    })

    expect(Object.keys(messages || {})).toHaveLength(2)
    expect(messages).toEqual({
      4: testUserMessage,
      7: testUserMessage,
    })

    Date.now = originalDateNow
  })
})
