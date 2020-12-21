import { memo, useCallback, useState } from 'react'
import {
  useEditMessage,
  useMessages,
  useClearMessages,
} from 'react-conversation'
import { MessageMetadata } from '.'

const EditForm = () => {
  const messages = useMessages<MessageMetadata>()
  const editMessage = useEditMessage<MessageMetadata>()
  const clearMessages = useClearMessages()

  const [text, setText] = useState('')
  const onChangeText = useCallback((event) => {
    setText(event.target.value)
  }, [])

  const [selectedTimestamp, setSelectedTimestamp] = useState<number | null>(
    null,
  )
  const onChangeMessage = useCallback((event) => {
    setSelectedTimestamp(event.target.value)
  }, [])

  const [mood, setMood] = useState<MessageMetadata['mood']>('happy')
  const onChangeMood = useCallback((event) => {
    setMood(event.target.value)
  }, [])

  const onEdit = useCallback(
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

  const onDelete = useCallback(() => {
    if (!selectedTimestamp) {
      return
    }

    clearMessages(+selectedTimestamp)
  }, [clearMessages, selectedTimestamp])

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
      <button
        type="button"
        style={{
          marginLeft: 8,
          padding: '8px 16px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
        onClick={onDelete}
      >
        Delete
      </button>
    </form>
  )
}

export default memo(EditForm)
