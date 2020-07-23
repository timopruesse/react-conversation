import React from 'react'
import { render } from '@testing-library/react'
import { useBotState } from './useBotState'
import { ConversationProvider, ConversationBotState } from './context'

const TestProvider = ({ children }: React.PropsWithChildren<unknown>) => (
  <ConversationProvider>{children}</ConversationProvider>
)

describe('useBotState', () => {
  it('gets correct state', () => {
    let botState: ConversationBotState | undefined

    const Component = () => {
      botState = useBotState()

      return null
    }

    render(
      <TestProvider>
        <Component />
      </TestProvider>,
    )

    expect(botState).toBe('idle')
  })
})
