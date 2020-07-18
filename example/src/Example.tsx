import React from 'react'
import {
  useMessages,
  ConversationContext,
  MessageType,
} from 'react-conversation'
import UserMessage from './UserMessage'
import BotMessage from './BotMessage'

const Example = () => {
  const { dispatch } = React.useContext(ConversationContext)
  const messages = useMessages()

  const [text, setText] = React.useState('')
  const onChangeText = React.useCallback((event) => {
    setText(event.target.value)
  }, [])

  const [type, setType] = React.useState<MessageType>('user')
  const onChangeType = React.useCallback((event) => {
    setType(event.target.value)
  }, [])

  const onSend = React.useCallback(
    (event) => {
      event.preventDefault()

      dispatch({
        type: 'messagePush',
        message: {
          text,
          type,
        },
      })
    },
    [dispatch, text, type],
  )

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
      <div>
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
