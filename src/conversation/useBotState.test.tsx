import { render } from '@testing-library/react'
import { useBotState } from './useBotState'
import { ConversationProvider, ConversationBotState } from './context'

function TestProvider({ children }: React.PropsWithChildren<unknown>) {
  return <ConversationProvider>{children}</ConversationProvider>
}

describe('useBotState', () => {
  it('gets correct state', () => {
    let botState: ConversationBotState | undefined

    function Component() {
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
