import { MessageUser } from 'react-conversation'
import { memo } from 'react'
import UserIcon from './user.svg'
import { MessageMetadata } from '.'

interface Props {
  timestamp: number
  message: MessageUser<MessageMetadata>
}

const BotMessage = memo(({ timestamp, message: { text, meta } }: Props) => (
  <div
    style={{
      alignSelf: 'flex-start',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      margin: 16,
      padding: 16,
      borderRadius: 8,
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    }}
  >
    <img src={UserIcon} alt="User icon" style={{ height: 80 }} />
    <div style={{ padding: 16 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <span
          style={{
            fontWeight: 'bold',
            borderBottom: '1px dotted',
            marginBottom: 4,
          }}
        >
          {new Date(timestamp).toLocaleString()}
        </span>{' '}
        <span style={{ fontStyle: 'italic', marginBottom: 4 }}>
          *{meta?.mood}*
        </span>{' '}
        "{text}"
      </div>
    </div>
  </div>
))

BotMessage.displayName = 'BotMessage'

export default BotMessage
