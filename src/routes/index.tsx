import classNames from 'classnames'
import { createEffect, createResource, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import CheckboxGroup from '~/components/CheckboxGroup'
import Estimation from '~/components/Estimation'
import Footer from '~/components/Footer'
import Password from '~/components/Password'
import RadioGroup from '~/components/RadioGroup'
import Range from '~/components/Range'
import generateMnemonicPassword from '~/libs/generate-mnemonic-password'
import generateRandomPassword, {
  RandomPasswordCharacters,
  RandomPasswordStructure
} from '~/libs/generate-random-password'

type PasswordType = 'random' | 'mnemonic'

const defaultOptions: { key: keyof RandomPasswordCharacters; title: string }[] =
  [
    { key: 'uppercase', title: 'Uppsercase' },
    { key: 'lowercase', title: 'Lowercase' },
    { key: 'numbers', title: 'Numbers' },
    { key: 'symbols', title: 'Symbols' }
  ]

export default function Home() {
  const [type, setType] = createSignal<PasswordType>('random')

  const [size, setSize] = createSignal(16)
  const [words, setWords] = createSignal(2)

  const [structure, setStructure] =
    createSignal<RandomPasswordStructure>('easy-to-read')

  const [characters, setCharacters] = createStore<RandomPasswordCharacters>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  })

  const [options, setOptions] = createSignal(defaultOptions)

  const generate = async () => {
    if (type() === 'random') {
      return generateRandomPassword(size(), {
        structure: structure(),
        ...characters
      })
    } else {
      return generateMnemonicPassword(words())
    }
  }

  const [password, { mutate }] = createResource(generate)

  const update = async () => mutate(await generate())

  // FIXME: figure out a way so that this effect is not called again after load
  // because the resource has data already
  createEffect(update)

  createEffect(() => {
    switch (structure()) {
      case 'easy-to-say': {
        setOptions(() =>
          defaultOptions.filter(({ key }) =>
            ['lowercase', 'uppercase'].includes(key)
          )
        )
        setCharacters({
          uppercase: true,
          lowercase: true,
          numbers: false,
          symbols: false
        })
        break
      }
      case 'easy-to-read':
      case 'all': {
        setOptions(defaultOptions)
        setCharacters({
          uppercase: true,
          lowercase: true,
          numbers: true,
          symbols: true
        })
        break
      }
    }
  })

  const toggleTheme = () => {
    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark')
    } else {
      document.body.classList.add('dark')
    }
  }

  return (
    <main
      class={classNames(
        'w-screen h-screen',
        'flex items-center justify-center',
        'mx-auto  p-4',
        'text-gray-700 bg-slate-50'
      )}
    >
      <div class='max-w-full w-[900px]'>
        <div class='flex justify-between items-center'>
          <h1 class={classNames('text-2xl text-red-700 font-bolder', 'my-4')}>
            [draft] Password Generator
          </h1>

          <span
            class={classNames(
              'material-symbols-rounded',
              'text-3xl',
              'cursor-pointer',
              'px-1',
              'rounded-md',
              'ease-linear duration-200',
              'hover:text-amber-500'
            )}
            onClick={toggleTheme}
          >
            dark_mode
          </span>
        </div>

        <div class='flex flex-col gap-2'>
          <Password password={password} placeholder='Waiting for password' />

          <Estimation password={password} />

          <div
            class={classNames(
              'block w-full',
              'px-3 py-2',
              'bg-white border border-slate-200',
              'rounded-md'
            )}
          >
            <h2 class={classNames('mb-2', 'text-xl text-sky-700 font-bolder')}>
              Customize your password
            </h2>

            <div class='flex gap-2 justify-between'>
              <div>
                <RadioGroup<PasswordType>
                  name='pwd-type'
                  title='Password type'
                  value={type}
                  onSelect={setType}
                  options={[
                    { value: 'random', title: 'Random' },
                    { value: 'mnemonic', title: 'Mnemonic' }
                  ]}
                />

                <div>
                  <h4 class='font-bold my-1'>
                    {type() === 'random'
                      ? 'Password length'
                      : 'Number of words'}
                  </h4>

                  {type() === 'random' ? (
                    <Range min={8} max={64} value={size} onChange={setSize} />
                  ) : (
                    <Range min={1} max={8} value={words} onChange={setWords} />
                  )}
                </div>
              </div>

              {type() === 'random' ? (
                <div class='flex gap-4'>
                  <RadioGroup<RandomPasswordStructure>
                    name='pwd-struc'
                    value={structure}
                    onSelect={setStructure}
                    options={[
                      { value: 'easy-to-say', title: 'Easy to say' },
                      { value: 'easy-to-read', title: 'Easy to read' },
                      { value: 'all', title: 'All' }
                    ]}
                  />

                  <CheckboxGroup<keyof RandomPasswordCharacters>
                    name='characters-type'
                    value={characters}
                    onSelect={setCharacters}
                    options={options}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div class='flex justify-between'>
            <button
              onclick={update}
              class={classNames(
                'px-4 py-2',
                'font-semibold text-sm',
                'text-white rounded-md',
                'bg-cyan-500 shadow-sm',
                'hover:bg-cyan-700 hover:shadow-inner',
                'ease-linear duration-200'
              )}
            >
              Generate
            </button>
            <button
              class={classNames(
                'flex gap-1 items-center',
                'px-4 py-2',
                'font-semibold text-sm',
                'text-white rounded-md',
                'bg-indigo-500 shadow-sm',
                'hover:bg-indigo-700',
                'ease-linear duration-200'
              )}
            >
              <span class='material-symbols-rounded'>electric_bolt</span>
              Try it out
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
