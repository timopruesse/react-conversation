import React from 'react'
import { ConversationProvider } from 'react-conversation'

const Example = () => {
  return (
    <ConversationProvider>
      <div>EXAMPLE</div>
    </ConversationProvider>
  )
}

export default React.memo(Example)
