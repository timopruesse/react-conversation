import { render, act } from '@testing-library/react'
import mockDate from 'mockdate'
import { useSendMessage } from './useSendMessage'
import { ConversationProvider, MessageUpdate } from './context'
import { useEditMessage } from './useEditMessage'
import { useMessages } from './useMessages'
import { Message, MessageCollection, MessageUser } from './utils/message'

describe('useEditMessage', () => {
  it('updates message', () => {
    const timestamp = 1337

    mockDate.set(timestamp)

    let messages: MessageCollection<unknown, Message<unknown>> | undefined
    let send: ((message: Message<unknown>) => void) | undefined
    let edit: ((ts: number, update: MessageUpdate<unknown>) => void) | undefined

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
  })
})
