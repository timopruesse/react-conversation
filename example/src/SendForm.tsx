import { memo, useCallback, useState } from 'react'
import { MessageType, useSendMessage } from 'react-conversation'
import { MessageMetadata } from '.'

const SendForm = memo(() => {
  const sendMessage = useSendMessage<MessageMetadata>()

  const [text, setText] = useState('')
  const onChangeText = useCallback((event) => {
    setText(event.target.value)
  }, [])

  const [type, setType] = useState<MessageType>('user')
  const onChangeType = useCallback((event) => {
    setType(event.target.value)
  }, [])

  const [mood, setMood] = useState<MessageMetadata['mood']>('happy')
  const onChangeMood = useCallback((event) => {
    setMood(event.target.value)
  }, [])

  const onSend = useCallback(
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

  return (
    <form onSubmit={onSend}>
      <div>Send a message</div>
      <input
        type="text"
        value={text}
        onChange={onChangeText}
        style={{ padding: 4, marginRight: 16 }}
      />{' '}
      <select onChange={onChangeType} style={{ padding: 4, marginRight: 16 }}>
        <option value="user">User</option>
        <option value="bot">Bot</option>
      </select>
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
        Send
      </button>
    </form>
  )
})

SendForm.displayName = 'SendForm'

export default SendForm
