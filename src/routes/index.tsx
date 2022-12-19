import { createEffect, createSignal } from 'solid-js'
import Footer from '~/components/Footer'
import Password from '~/components/Password'
import RadioGroup from '~/components/RadioGroup'
import Range from '~/components/Range'

type PasswordType = 'random' | 'mnemonic'

export default function Home() {
  const [password, setPassword] = createSignal('this is the password')
  const [type, setType] = createSignal<PasswordType>('random')

  const [size, setSize] = createSignal(16)
  const [words, setWords] = createSignal(6)

  return (
    <main class='w-screen h-screen flex items-center justify-center mx-auto text-gray-700 bg-slate-50 p-4'>
      <div class='max-w-full w-[900px]'>
        <h1 class='text-2xl text-red-700 font-bolder my-4'>
          [draft] Password Generator
        </h1>

        <div class='flex gap-2 flex-col'>
          <Password password={password} />

          <div class='block w-full px-3 py-2 bg-white border border-slate-200 rounded-md'>
            <h2 class='text-xl text-sky-700 font-bolder mb-2'>
              Customize your password
            </h2>

            <RadioGroup<PasswordType>
              title='Password type'
              name='pwd-type'
              value={type}
              values={[
                { value: 'random', title: 'Random' },
                { value: 'mnemonic', title: 'Mnemonic' }
              ]}
              onSelect={setType}
            />

            <div>
              <h4 class='font-bold my-1'>
                {type() === 'random' ? 'Password length' : 'Number of words'}
              </h4>
              {type() === 'random' ? (
                <div>
                  <Range min={8} max={64} value={size} onChange={setSize} />
                </div>
              ) : (
                <div>
                  <Range min={4} max={8} value={words} onChange={setWords} />
                </div>
              )}
            </div>
          </div>
          <div>
            <button class='px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-md shadow-sm'>
              Generate
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}