import { render, act } from '@testing-library/react'
import mockDate from 'mockdate'
import { useSendMessage } from './useSendMessage'
import { ConversationProvider } from './context'
import { useMessages } from './useMessages'
import { useDeleteMessage } from './useDeleteMessage'
import { Message, MessageCollection, MessageUser } from './utils/message'

describe('useDeleteMessage', () => {
  it('clears a single message', () => {
    let messages: MessageCollection<unknown, Message<unknown>> | undefined
    let send: ((message: Message<unknown>) => void) | undefined
    let deleteMsg: ((timestamp: number) => void) | undefined

    const Component = () => {
      messages = useMessages()
      send = useSendMessage()
      deleteMsg = useDeleteMessage()

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
      if (!deleteMsg) {
        throw new Error('Check the correct usage of "useClearMessages"!')
      }

      deleteMsg(3)
    })

    expect(Object.keys(messages || {})).toHaveLength(3)
    expect(messages).toEqual({
      1: testUserMessage,
      2: testUserMessage,
      4: testUserMessage,
    })
  })
})
