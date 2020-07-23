import React from 'react'
import { useBotState } from 'react-conversation'

const BotStateIndicator = () => {
  const botState = useBotState()

  if (botState === 'idle') {
    return null
  }

  return (
    <div
      style={{
        alignSelf: 'flex-end',
        padding: '0 16px',
        fontWeight: 'bold',
        letterSpacing: '0.05rem',
      }}
    >
      🤔 Bot is thinking ...
    </div>
  )
}

export default React.memo(BotStateIndicator)
