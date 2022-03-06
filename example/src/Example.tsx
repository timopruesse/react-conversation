import {
  useMessages,
  MessageBot,
  useOnBotMessage,
  useOnUserMessage,
  MessageUser,
} from 'react-conversation'
import { memo, useState } from 'react'
import UserMessage from './UserMessage'
import BotMessage from './BotMessage'
import SendForm from './SendForm'
import EditForm from './EditForm'
import { MessageMetadata } from '.'
import BotStateIndicator from './BotStateIndicator'

const Example = memo(() => {
  const messages = useMessages<MessageMetadata>()

  const [lastBotMessage, setLastBotMessage] =
    useState<MessageBot<MessageMetadata> | null>(null)

  const [lastUserMessage, setLastUserMessage] =
    useState<MessageUser<MessageMetadata> | null>(null)

  useOnBotMessage(setLastBotMessage)
  useOnUserMessage(setLastUserMessage)

  return (
    <div style={{ padding: 22, backgroundColor: '#E8E8E8' }}>
      <h1>Example Chat</h1>
      <div
        style={{
          minHeight: 500,
          backgroundColor: '#F8F8F8',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {Object.entries(messages).map(([time, message]) => {
          if (message.type === 'user') {
            return (
              <UserMessage
                key={`user-message-${time}`}
                message={message}
                timestamp={+time}
              />
            )
          }

          return (
            <BotMessage
              key={`bot-message-${time}`}
              message={message}
              timestamp={+time}
            />
          )
        })}
        <BotStateIndicator />
      </div>
      <div style={{ padding: '16px 0' }}>
        <SendForm />
      </div>
      <div style={{ padding: '16px 0' }}>
        <EditForm />
      </div>
      <div
        style={{
          backgroundColor: '#282828',
          color: '#85e085',
          marginBottom: 16,
          fontWeight: 'bold',
          padding: 16,
        }}
      >
        <div>Last Bot Message: "{lastBotMessage?.text || 'N/A'}"</div>
        <div style={{ paddingBottom: 8 }}>
          Last User Message: "{lastUserMessage?.text || 'N/A'}"
        </div>
      </div>
      <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid' }}>
        <div>
          Icons used in this example are from:
          <ul>
            <li>
              User Icon -{' '}
              <a
                href="https://www.flaticon.com/authors/vitaly-gorbachev"
                title="Vitaly Gorbachev"
              >
                Vitaly Gorbachev
              </a>
            </li>
            <li>
              Bot Icon -{' '}
              <a
                href="https://www.flaticon.com/authors/freepik"
                title="Freepik"
              >
                Freepik
              </a>
            </li>
          </ul>
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
    </div>
  )
})

Example.displayName = 'Example'

export default Example
