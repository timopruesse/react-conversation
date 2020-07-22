import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import image from '@rollup/plugin-image'
import { dependencies, peerDependencies } from './package.json'

const external = [
  ...Object.keys(dependencies || {}),
  ...Object.keys(peerDependencies || {}),
]

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: {
    main: 'src/index.ts',
    conversation: 'src/conversation/context.tsx',
    conversation_bot_msgs: 'src/conversation/useBotMesssages.ts',
    conversation_user_msgs: 'src/conversation/useUserMessages.ts',
    conversation_msgs: 'src/conversation/useMessages.ts',
    conversation_clear_msgs: 'src/conversation/useClearMessages.ts',
    conversation_del_msg: 'src/conversation/useDeleteMessage.ts',
    conversation_edit_msg: 'src/conversation/useEditMessage.ts',
    conversation_bot_msg_event: 'src/conversation/useOnBotMessage.ts',
    conversation_user_msg_event: 'src/conversation/useOnUserMessage.ts',
    conversation_send_msg: 'src/conversation/useSendMessage.ts',
    reactions: 'src/reactions/context.tsx',
    reactions_add: 'src/reactions/useAddMessageReaction.ts',
    reactions_remove: 'src/reactions/useRemoveMessageReaction.ts',
  },
  output: [
    {
      dir: 'dist/esm',
      format: 'es',
      sourcemap: true,
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  external,
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: 'runtime',
      include: ['src/**'],
      sourceMaps: true,
      compact: true,
      minified: true,
      comments: false,
    }),
    image(),
    terser(),
    filesize(),
  ],
}
