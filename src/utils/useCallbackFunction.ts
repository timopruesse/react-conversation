import { useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-function
function NOOP() {}

export function useCallbackFunction<T>(method: T) {
  const methodCallback = useRef<T>((NOOP as unknown) as T)
  methodCallback.current = method

  return methodCallback
}
