import { APIEvent } from 'solid-start/api'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '~/libs/trpc/router'

const handler = (event: APIEvent) =>
  fetchRequestHandler({
    endpoint: '/trpc',
    req: event.request,
    router: appRouter,
    createContext: () => ({})
  })

export const GET = handler
export const POST = handler
