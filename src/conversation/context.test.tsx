/* eslint-disable no-console */
import React from 'react'
import { render } from '@testing-library/react'
import { ConversationContext } from './context'

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
})
