# react-conversation

> This package only includes react hooks that you can use in your own components.  
> There are no UI components in here.  
> Check out the example app for some 'inspiration' 😁

## Prerequisite

Add `@chroma91:registry=https://npm.pkg.github.com/` to your `.npmrc`.

## Installation

### Yarn

```bash
yarn add @chroma91/react-conversation
```

### NPM

```bash
npm install @chroma91/react-conversation
```

### Usage

#### General Message Structure

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

#### Metadata

The messages can carry any form of metadata.  
In the examples `MessageMetadata` will be used as a placeholder.

#### Get a collection of all the messages

> The messages are sorted by their timestamp.

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

#### Listen for messages

```ts
// listen for bot messages
useOnBotMessage((message: MessageBot<MessageMetadata>) => {
  // do something with the message
})

// listen for user messages
useOnUserMessage((message: MessageUser<MessageMetadata>) => {
  // do something with the message
})
```

### Example

There is a small example app where you can see the hooks in action.  
Feel free to check out the source code to see how it works.

1. Execute `yarn start` in the root directory
2. Open another terminal session
   1. `cd example`
   2. Execute `yarn start`
3. Open `localhost:5000` in any browser
