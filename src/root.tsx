// @refresh reload
import classNames from 'classnames'
import { onMount, Suspense } from 'solid-js'
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title
} from 'solid-start'
import { setTheme, theme } from '~/libs/theme'

import './root.css'

export default function Root() {
  onMount(() => {
    const storage = localStorage.getItem('theme')

    if (
      storage === 'dark' ||
      (!storage && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  })

  return (
    <Html lang='en'>
      <Head>
        <Title>[draft] Password Generator - aifrim</Title>
        <Meta charset='utf-8' />
        <Meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
        />
      </Head>
      <Body class={classNames('w-screen h-screen', theme())}>
        {theme() ? (
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        ) : null}
        <Scripts />
      </Body>
    </Html>
  )
}
