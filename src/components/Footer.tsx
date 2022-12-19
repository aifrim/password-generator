export default function Footer() {
  return (
    <div class='flex justify-end gap-2 justify-between items-center my-4'>
      <div class='flex justify-center gap-1 items-center text-sm'>
        <span>build with</span>

        <span class='material-symbols-rounded text-red-600'>favorite</span>

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
          <img src='/github-mark.svg' class='h-[24px]' />
        </a>
        <a target='_blank' href='https://aifrim.com'>
          <img
            src='https://en.gravatar.com/userimage/25737532/91d0e8c879a3c411c4c7b0c1bba9e8d4.png'
            class='h-[24px] rounded-md'
          />
        </a>
      </div>
    </div>
  )
}