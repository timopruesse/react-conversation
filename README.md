# react-conversation

[![NPM](https://img.shields.io/npm/v/react-conversation.svg)](https://www.npmjs.com/package/react-conversation)

> This package only includes react hooks that you can use in your own components.  
> There are no UI components in here.  
> Check out the example app for some 'inspiration' 😁

---

## Installation

### Yarn

```bash
yarn add @chroma91/react-conversation
```

### NPM

```bash
npm install @chroma91/react-conversation
```

---

### Usage

#### Setup

Add the `ConversationProvider`:

```tsx
ReactDOM.render(
  <ConversationProvider>
    <MyApp />
  </ConversationProvider>,
  document.getElementById('root'),
)
```

---

#### General message structure

```ts
// a message looks like this
const message = {
  type: 'bot', // or 'user'
  text: 'Hello world!',
  meta: {
    /* optional */
    someKey: 'some value',
  },
}
```

#### Message timestamps

The timestamps of the messages are unique and also serve as their identifier.  
If you send multiple messages at the same time, the timestamp of subsequent messages will be increased by one millisecond.

##### Example

If three messages get sent at `1595441078505` their timestamps will be the following:

| Message No. |         Timestamp |
| :---------: | ----------------: |
|      1      | 159544107850**5** |
|      2      | 159544107850**6** |
|      3      | 159544107850**7** |

---

#### Metadata

The messages can carry any form of metadata.  
In the examples `MessageMetadata` will be used as a placeholder.

---

#### Get a collection of all the messages

> The messages are sorted by their respective timestamps.

```ts
const messages = useMessages<MessageMetadata>()

// the returned message collection is defined as follows
const messages = {
  // timestamp
  1595110300625: {
    /* message */
  },
  // timestamp
  1595110400845: {
    /* message */
  },
}
```

##### Only get bot messages

```ts
const botMessages = useBotMessages<MessageMetadata>()
```

##### Only get user messages

```ts
const userMessages = useUserMessages<MessageMetadata>()
```

---

#### Send a message

```ts
const sendMessage = useSendMessage<MessageMetadata>()

// send a bot message
sendMessage({
  type: 'bot',
  text: 'Hello human!',
  meta: {
    /* optional */
  },
})

// send a user message
sendMessage({
  type: 'user',
  text: 'Hello bot!',
  meta: {
    /* optional */
  },
})
```

---

#### Listen for messages

```ts
// listen for bot messages
useOnBotMessage(
  (message: MessageBot<MessageMetadata>, botState: ConversationBotState) => {
    // do something with the message
  },
)

// listen for user messages
useOnUserMessage(
  (message: MessageUser<MessageMetadata>, botState: ConversationBotState) => {
    // do something with the message
  },
)
```

---

#### Edit a message

It is possible to update the text or the metadata of a message (or both at the same time).  
You need to provide the timestamp of the message you want to edit.

```ts
const editMessage = useEditMessage<MessageMetadata>()

// update a message
editMessage(
  /* timestamp of the message you want to edit */
  1337,
  /* Partial message data */
  {
    text: 'Hello world!' /* optional */,
    meta: {
      /* optional */
    },
  },
)
```

---

#### React to user messages

> The bot will only trigger one reaction at once.

The following is an example for a message reaction:

```tsx
interface FieldMetaData {
  name: string
}

const reactToZipCode = async ({ text, meta }: Message<FieldMetaData>) => {
  const cityName = await fetchCity(text)

  if (!cityName) {
    return undefined
  }

  return {
    text: `Do you live in ${cityName}?`,
    meta: {
      suggestedCity: cityName,
    },
  }
}

const messageReactions: MessageReactionCollection<FieldMetaData> = {
  // observe the property `meta.name`
  'meta.name': {
    // react when the value of that property is zipCode
    zipCode: reactToZipCode,
  },
  // You can also observe the message text directly
  text: {
    'hello bot': () => {
      return {
        text: 'hello human',
      }
    },
  },
}

ReactDOM.render(
  <ConversationProvider>
    <MessageReactionProvider reactions={messageReactions}>
      <MyApp />
    </MessageReactionProvider>
  </ConversationProvider>,
  document.getElementById('root'),
)
```

##### Add reactions programatically

```ts
const addReaction = useAddMessageReaction()

addReaction('meta.name', 'zipCode', reactToZipCode)
```

##### Remove reactions programatically

```ts
const removeReaction = useRemoveMessageReaction()

removeReaction('meta.name', 'zipCode')
```

---

#### Handle bot states

At the moment it is possible for the bot to be in one of two states: `idle` or `reacting`.

|   State    |                                                                                                                                        Description |
| :--------: | -------------------------------------------------------------------------------------------------------------------------------------------------: |
|   `idle`   |                                                                      This is the default state of the bot. Nothing is being done in the background |
| `reacting` | This state gets triggered as soon as the bot is reacting to a user message. The bot will return to the `idle` state when the reaction is finished. |

In general you should **never** send other bot messages when the bot is in any other state than `idle`. Otherwise, the order of the bot messages might be confusing.

##### Get the current state

```ts
const botState = useBotState()
```

##### React to state changes

```ts
useOnBotStateChange((state: ConversationBotState) => {
  // Do something when the state changed..
})
```

---

#### Delete messages

##### Delete a single message

```ts
const deleteMessage = useDeleteMessage()

// delete the message with the timestamp '1337'
deleteMessage(1337)
```

##### Delete a range of messages

```ts
const clearMessages = useClearMessages()

// delete messages starting at the timestamp '10' and ending with timestamp '50' (inclusively)
clearMessages(10, 50)

// delete messages starting at the timestamp '100' and ending with the latest message (inclusively)
clearMessages(100)
```

---

### Example app

There is a small example app where you can see the hooks in action.  
Feel free to check out the source code to see how it works.

1. Execute `yarn build` in the root directory
2. `cd example`
3. Execute `yarn start`
4. Open `localhost:5000` in any browser

> Try to send a user message with an angry tone ;)
