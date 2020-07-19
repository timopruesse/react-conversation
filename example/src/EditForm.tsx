import React from 'react'
import {
  MessageType,
  useEditMessage,
  useMessages,
  Message,
} from 'react-conversation'
import { MessageMetadata } from './Example'

const EditForm = () => {
  const messages = useMessages<MessageMetadata>()
  const editMessage = useEditMessage<MessageMetadata>()

  const [text, setText] = React.useState('')
  const onChangeText = React.useCallback((event) => {
    setText(event.target.value)
  }, [])

  const [selectedTimestamp, setSelectedTimestamp] = React.useState<
    number | null
  >(null)
  const onChangeMessage = React.useCallback((event) => {
    setSelectedTimestamp(event.target.value)
  }, [])

  const [mood, setMood] = React.useState<MessageMetadata['mood']>('happy')
  const onChangeMood = React.useCallback((event) => {
    setMood(event.target.value)
  }, [])

  const onEdit = React.useCallback(
    (event) => {
      event.preventDefault()

      if (!selectedTimestamp) {
        return
      }

      editMessage(selectedTimestamp, {
        text,
        meta: {
          mood,
        },
      })
    },
    [selectedTimestamp, editMessage, text, mood],
  )

  return (
    <form onSubmit={onEdit}>
      <div>Edit a message</div>
      <select
        onChange={onChangeMessage}
        style={{ padding: 4, marginRight: 16 }}
      >
        <option>- no message selected -</option>
        {Object.entries(messages).map(([timestamp, message], index) => (
          <option key={timestamp} value={timestamp}>
            {`${index + 1}. [${message.type}] ${message.text}`}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={text}
        onChange={onChangeText}
        style={{ padding: 4, marginRight: 16 }}
      />{' '}
      <select onChange={onChangeMood} style={{ padding: 4, marginRight: 16 }}>
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
        Update
      </button>
    </form>
  )
}

export default React.memo(EditForm)
