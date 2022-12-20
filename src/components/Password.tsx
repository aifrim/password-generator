import classNames from 'classnames'
import { Accessor } from 'solid-js'

type PasswordProps = {
  password: Accessor<string>
  placeholder: string
}

export default function Password({ password, placeholder }: PasswordProps) {
  return (
    <div
      class={classNames(
        'flex justify-between items-center text-4xl',
        'overflow-hidden',
        'mt-1 block w-full px-3 py-2 bg-sky-100 border',
        'border-sky-500 rounded-md text-sm shadow-sm placeholder-slate-400',
        'hover:outline-none hover:border-sky-500 hover:ring-1 hover:ring-sky-500',
        'focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
      )}
    >
      <input
        class={classNames(
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
          'text-indigo-500 hover:text-indigo-900'
        )}
      >
        content_copy
      </span>
    </div>
  )
}
