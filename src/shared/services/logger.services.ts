import { env } from '@/config/env'

export const loggerServices = {
  info: (...args: unknown[]) => console.info('[INFO]', ...args),
  debug: (...args: unknown[]) => {
    if (env.nodeEnv) console.debug('[DEBUG]', ...args)
  },
  warn: (...args: unknown[]) => console.warn('[WARN]', ...args),
  error: (msg: string, err?: unknown) => console.error('[ERROR]', msg, err),
  log: (...args: unknown[]) => console.log('[LOG]', ...args),
}
