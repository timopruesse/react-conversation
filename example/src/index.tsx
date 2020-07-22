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

const exampleReactions: MessageReactionCollection<MessageMetadata> = {
  'meta.mood': {
    angry: () => {
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
