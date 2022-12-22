import classNames from 'classnames'
import { Resource } from 'solid-js'

type PasswordProps = {
  password: Resource<string>
  placeholder: string
}

export default function Password({ password, placeholder }: PasswordProps) {
  return (
    <div
      class={classNames(
        'flex justify-between items-center text-4xl',
        'overflow-hidden',
        'mt-1 block w-full px-3 py-2 border rounded-md text-sm shadow-sm',
        'ease-linear duration-200',
        'bg-sky-100 dark:bg-sky-800',
        'border-sky-500 placeholder-slate-400',
        'dark:border-sky-400 placeholder-slate-500',
        'hover:outline-none hover:border-sky-500 hover:ring-1 hover:ring-sky-500',
        'dark:hover:border-sky-400 dark:hover:ring-sky-400',
        'focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500',
        'dark:focus:border-sky-400 dark:focus:ring-sky-400'
      )}
    >
      <input
        class={classNames(
          'pwd',
          'grow',
          'bg-transparent',
          'outline-none',
          'text-ellipsis'
        )}
        readOnly
        value={password()}
        placeholder={placeholder}
      />

      <span
        class={classNames(
          'material-symbols-rounded',
          'cursor-pointer',
          'ease-linear duration-200',
          'text-indigo-500 hover:text-indigo-900',
          'dark:text-indigo-400 dark:hover:text-indigo-100'
        )}
      >
        content_copy
      </span>
    </div>
  )
}
