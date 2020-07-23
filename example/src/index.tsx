import React from 'react'
import ReactDOM from 'react-dom'
import {
  ConversationProvider,
  MessageReactionProvider,
  MessageReactionCollection,
} from 'react-conversation'
import Example from './Example'

export interface MessageMetadata {
  mood: 'happy' | 'angry' | 'tired'
}

const someCoolApiCall = (msDuration: number) => {
  return new Promise((resolve) => setTimeout(resolve, msDuration))
}

const exampleReactions: MessageReactionCollection<MessageMetadata> = {
  'meta.mood': {
    angry: async () => {
      await someCoolApiCall(2000)

      return {
        type: 'bot',
        text: "Don't yell at me human!",
        meta: {
          mood: 'angry',
        },
      }
    },
  },
}

ReactDOM.render(
  <ConversationProvider>
    <MessageReactionProvider reactions={exampleReactions}>
      <Example />
    </MessageReactionProvider>
  </ConversationProvider>,
  document.getElementById('exampleApp'),
)
