export type RandomPasswordCharacters = Record<
  'uppercase' | 'lowercase' | 'numbers' | 'symbols',
  boolean
>

export type RandomPasswordStructure = 'easy-to-say' | 'easy-to-read' | 'all'

export type RandomePasswordConfig = RandomPasswordCharacters & {
  structure: RandomPasswordStructure
}

const uppercase = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]

const lowercase = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
]

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const symbols = [
  '`',
  '[',
  ']',
  '\\',
  ';',
  "'",
  ',',
  '.',
  '/',
  '~',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '_',
  '+',
  '{',
  '}',
  '|',
  ':',
  '"',
  '<',
  '>',
  '?'
]

export default function generateRandomPassword(
  size: number,
  cfg: RandomePasswordConfig
): string {
  let alphabet = []

  if (cfg.lowercase) alphabet.push(...lowercase)
  if (cfg.uppercase) alphabet.push(...uppercase)
  if (cfg.numbers) alphabet.push(...numbers)
  if (cfg.symbols) alphabet.push(...symbols)

  if (cfg.structure === 'easy-to-read') {
    alphabet = alphabet.filter(
      (w) => !['!', '1', 'I', 'l', '0', 'O', '|', '+', '\\', '/'].includes(w)
    )
  }

  const pwd: string[] = []

  while (pwd.length < size) {
    const pos = Math.floor(
      (Math.random() * alphabet.length * 10) % (alphabet.length - 1)
    )

    pwd.push(alphabet[pos])
  }

  return pwd.join('')
}
