import React from 'react'
import ReactDOM from 'react-dom'
import { ConversationProvider } from 'react-conversation'
import Example from './example'

ReactDOM.render(
  <ConversationProvider>
    <Example />
  </ConversationProvider>,
  document.getElementById('exampleApp'),
)
