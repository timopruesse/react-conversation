import { render, act } from '@testing-library/react'
import { ConversationProvider, ConversationBotState } from './context'
import { useSetBotState } from './useSetBotState'
import { useBotState } from './useBotState'

function TestProvider({ children }: React.PropsWithChildren<unknown>) {
  return <ConversationProvider>{children}</ConversationProvider>
}

describe('useSetBotState', () => {
  it('sets correct bot state', () => {
    let state: ConversationBotState | undefined
    let setState: ((s: ConversationBotState) => void) | undefined

    function Component() {
      state = useBotState()
      setState = useSetBotState()

      return null
    }

    act(() => {
      render(
        <TestProvider>
          <Component />
        </TestProvider>,
      )
    })

    expect(state).toBe('idle')

    act(() => {
      if (!setState) {
        throw new Error('Check the correct usage of "useSetBotState"!')
      }

      setState('reacting')
    })

    expect(state).toBe('reacting')
  })
})
