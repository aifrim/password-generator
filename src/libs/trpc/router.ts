import { readFile } from 'fs'
import wordListPath from 'word-list'
import { z } from 'zod'
import { procedure, router } from '~/libs/trpc/init'

function read(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err)
      }

      resolve(data)
    })
  })
}

export const appRouter = router({
  getMnemonics: procedure
    .input(
      z.object({
        size: z.number()
      })
    )
    .query(async ({ input }) => {
      const data = await read(wordListPath)
      const words = data.split('\n').filter((word) => word.length > 3)

      const output: string[] = []

      while (output.length !== input.size) {
        const newPos = Math.floor(
          (Math.random() * words.length * 10) % (words.length - 1)
        )

        const newWord = words[newPos]

        if (!output.includes(newWord)) {
          output.push(newWord)
        }
      }

      return output
    })
})

export type AppRouter = typeof appRouter
