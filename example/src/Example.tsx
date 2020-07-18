import React from 'react'
import {
  useMessages,
  MessageType,
  useSendMessage,
  MessageBot,
  useOnBotMessage,
  useOnUserMessage,
  MessageUser,
} from 'react-conversation'
import UserMessage from './UserMessage'
import BotMessage from './BotMessage'

export interface MessageMetadata {
  mood: 'happy' | 'angry' | 'tired'
}

const Example = () => {
  const messages = useMessages<MessageMetadata>()
  const sendMessage = useSendMessage<MessageMetadata>()

  const [text, setText] = React.useState('')
  const onChangeText = React.useCallback((event) => {
    setText(event.target.value)
  }, [])

  const [type, setType] = React.useState<MessageType>('user')
  const onChangeType = React.useCallback((event) => {
    setType(event.target.value)
  }, [])

  const [mood, setMood] = React.useState<MessageMetadata['mood']>('happy')
  const onChangeMood = React.useCallback((event) => {
    setMood(event.target.value)
  }, [])

  const onSend = React.useCallback(
    (event) => {
      event.preventDefault()

      sendMessage({
        text,
        type,
        meta: {
          mood,
        },
      })
    },
    [sendMessage, text, type, mood],
  )

  const [lastBotMessage, setLastBotMessage] = React.useState<MessageBot<
    MessageMetadata
  > | null>(null)
  const [lastUserMessage, setLastUserMessage] = React.useState<MessageUser<
    MessageMetadata
  > | null>(null)

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
      </div>
      <div style={{ padding: '16px 0' }}>
        <form onSubmit={onSend}>
          <input
            type="text"
            value={text}
            onChange={onChangeText}
            style={{ padding: 4, marginRight: 16 }}
          />{' '}
          <select
            onChange={onChangeType}
            style={{ padding: 4, marginRight: 16 }}
          >
            <option value="user">User</option>
            <option value="bot">Bot</option>
          </select>
          <select
            onChange={onChangeMood}
            style={{ padding: 4, marginRight: 16 }}
          >
            <option value="happy">Happy</option>
            <option value="angry">Angry</option>
            <option value="tired">Tired</option>
          </select>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            Send
          </button>
        </form>
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
}

export default React.memo(Example)
