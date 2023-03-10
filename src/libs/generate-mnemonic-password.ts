import { client } from '~/libs/trpc/client'

export default async function generateMnemonicPassword(
  size: number
): Promise<string> {
  const words = await client.getMnemonics.query({ size })

  return words.join(' ')
}
