import { render, act } from '@testing-library/react'
import { ConversationProvider, ConversationBotState } from './context'
import { useOnBotStateChange } from './useOnBotStateChange'
import { useSetBotState } from './useSetBotState'

describe('useOnUserMessage', () => {
  it('listens to user messages', () => {
    let setState: ((state: ConversationBotState) => void) | undefined

    const onStateChange = jest.fn()

    function Component() {
      setState = useSetBotState()
      useOnBotStateChange(onStateChange)

      return null
    }

    act(() => {
      render(
        <ConversationProvider>
          <Component />
        </ConversationProvider>,
      )

      if (!setState) {
        throw new Error('Check the correct usage of "useSendMessage"!')
      }

      setState('reacting')
    })

    expect(onStateChange).toHaveBeenCalledWith('reacting')
  })
})
