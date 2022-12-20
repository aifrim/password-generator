import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client'
import type { AppRouter } from './router'

// create the client, export it
export const client = createTRPCProxyClient<AppRouter>({
  links: [loggerLink(), httpBatchLink({ url: 'http://localhost:3000/trpc' })]
})
