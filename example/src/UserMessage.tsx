import React from 'react'
import UserIcon from './user.svg'
import { MessageBot } from '../../dist'

interface Props {
  timestamp: number
  message: MessageBot<unknown>
}

const BotMessage = ({ timestamp, message: { text } }: Props) => {
  return (
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
      <img src={UserIcon} alt="User icon" style={{ height: 48 }} />
      <div style={{ padding: 16 }}>
        <span style={{ fontWeight: 'bold', marginRight: 4 }}>
          {new Date(timestamp).toLocaleString()}
        </span>{' '}
        "{text}"
      </div>
    </div>
  )
}

export default React.memo(BotMessage)
