import { A } from 'solid-start'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <main class='w-full h-full flex items-center justify-center text-center mx-auto text-gray-700 p-4'>
      <div>
        <h1 class='max-6-xs text-6xl text-sky-700 uppercase my-16'>
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
