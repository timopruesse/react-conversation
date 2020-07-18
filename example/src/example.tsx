import React from 'react'
import {
  useMessages,
  ConversationContext,
  MessageType,
} from 'react-conversation'

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

  const onSend = React.useCallback(() => {
    dispatch({
      type: 'messagePush',
      message: {
        text,
        type,
      },
    })
  }, [dispatch, text, type])

  return (
    <div>
      <div>
        {Object.entries(messages).map(([time, message]) => {
          return (
            <div key={`message-${time}`}>
              <div>{message.type}</div>
              <div>
                <span>{time}:</span> {message.text}
              </div>
            </div>
          )
        })}
      </div>
      <div>
        <input type="text" value={text} onChange={onChangeText} />{' '}
        <select onChange={onChangeType}>
          <option value="user">User</option>
          <option value="bot">Bot</option>
        </select>
        <button type="button" onClick={onSend}>
          Send
        </button>
      </div>
    </div>
  )
}

export default React.memo(Example)
