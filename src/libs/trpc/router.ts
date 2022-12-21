import { close, fstat, open, readSync } from 'fs'
import wordListPath from 'word-list'
import { z } from 'zod'
import { procedure, router } from '~/libs/trpc/init'

let size = 0

function getRandom(): number {
  return Math.floor(
    (Math.random() * Math.pow(10, size.toString().length)) % size
  )
}

function getSize(path: string): Promise<number> {
  return new Promise((resolve, reject) => {
    open(path, 'r', function (err, fd) {
      if (err) reject(err)

      fstat(fd, function (err, stats) {
        if (err) reject(err)

        close(fd)
        resolve(stats.size)
      })
    })
  })
}

function getFd(path: string): Promise<number> {
  return new Promise((resolve, reject) => {
    open(path, 'r', function (err, fd) {
      if (err) reject(err)

      resolve(fd)
    })
  })
}

function getWord(
  fd: number,
  size: number,
  offset: number
): Promise<string | null> {
  return new Promise((resolve) => {
    let position = offset
    let char = ' '
    let word: string[] = []

    const buffer = Buffer.alloc(8)

    while (char.charCodeAt(0) >= 32 && position <= size) {
      position += readSync(fd, buffer, 0, 1, position)

      char = buffer.toString('utf-8')
    }

    char = ' '

    if (position === size) {
      resolve(null)
    }

    while (char.charCodeAt(0) >= 32 && position <= size) {
      position += readSync(fd, buffer, 0, 1, position)

      char = buffer.toString('utf-8')

      if (char.charCodeAt(0) >= 32) {
        word.push(char[0])
      }
    }

    resolve(word.join(''))
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
      if (!size) {
        size = await getSize(wordListPath)
      }

      const output: string[] = []
      const fd = await getFd(wordListPath)

      while (output.length !== input.size) {
        const newWord = await getWord(fd, size, getRandom())

        if (newWord === null) {
          continue
        }

        if (!output.includes(newWord)) {
          output.push(newWord)
        }
      }

      close(fd)

      return output
    })
})

export type AppRouter = typeof appRouter
