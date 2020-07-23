import React from 'react'
import { ConversationContext, ConversationBotState } from './context'

export function useSetBotState() {
  const { dispatch } = React.useContext(ConversationContext)

  return (state: ConversationBotState) =>
    dispatch({
      type: 'setBotState',
      payload: state,
    })
}
