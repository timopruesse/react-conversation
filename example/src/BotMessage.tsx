import { MessageBot } from 'react-conversation'
import { memo } from 'react'
import BotIcon from './bot.svg'
import { MessageMetadata } from '.'

interface Props {
  timestamp: number
  message: MessageBot<MessageMetadata>
}

const BotMessage = ({ timestamp, message: { text, meta } }: Props) => (
  <div
    style={{
      alignSelf: 'flex-end',
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
    <div style={{ padding: 16 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
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
        </span>
        <span style={{ fontStyle: 'italic' }}>*{meta?.mood}*</span>"{text}"
      </div>
    </div>
    <img src={BotIcon} alt="Bot icon" style={{ height: 80 }} />
  </div>
)

export default memo(BotMessage)
