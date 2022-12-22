import classNames from 'classnames'
import { setTheme, theme } from '~/libs/theme'

export default function ThemeToggler() {
  const toggleTheme = () => {
    if (theme() === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
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
  )
}
