import classNames from 'classnames'

export default function Footer() {
  return (
    <div
      class={classNames(
        'flex justify-end gap-2 justify-between items-center',
        'my-4'
      )}
    >
      <div
        class={classNames('flex justify-center gap-1 items-center', 'text-sm')}
      >
        <span>build with</span>

        <span
          class={classNames(
            'material-symbols-rounded',
            'ease-linear duration-200',
            'text-red-600',
            'dark:text-red-300'
          )}
        >
          favorite
        </span>

        <span>
          and{' '}
          <a
            class='underline underline-offset-4'
            target='_blank'
            href='https://www.solidjs.com/'
          >
            solid
          </a>
        </span>
      </div>

      <div class='flex items-center gap-2'>
        <a target='_blank' href='https://github.com/aifrim/password-generator'>
          <img
            src='/github-mark.svg'
            class={classNames(
              'h-[24px] dark:invert',
              'ease-linear duration-200'
            )}
          />
        </a>

        <a target='_blank' href='https://aifrim.com'>
          <img
            src='https://en.gravatar.com/userimage/25737532/91d0e8c879a3c411c4c7b0c1bba9e8d4.png'
            class={classNames('h-[24px]', 'rounded-md')}
          />
        </a>
      </div>
    </div>
  )
}
