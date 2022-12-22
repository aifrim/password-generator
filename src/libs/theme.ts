import { createSignal } from 'solid-js'

type Theme = 'dark' | 'light'

const [theme, setThemeSetter] = createSignal<Theme>()

const setTheme = (theme: Theme) => {
  localStorage.setItem('theme', theme)
  setThemeSetter(theme)
}

export { theme, setTheme }
