import classNames from 'classnames'
import { A } from 'solid-start'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <main
      class={classNames(
        'w-full h-full',
        'flex items-center justify-center text-center',
        'mx-auto p-4',
        'text-gray-700'
      )}
    >
      <div>
        <h1
          class={classNames(
            'max-6-xs my-16',
            'text-6xl text-sky-700 uppercase'
          )}
        >
          ¯\_(ツ)_/¯
        </h1>

        <p class='my-4'>
          <A href='/' class='text-sky-600 hover:underline'>
            Go home
          </A>
        </p>

        <Footer />
      </div>
    </main>
  )
}
