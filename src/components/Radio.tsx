import { createEffect } from 'solid-js'

type RadioProps = {
  checked: boolean
  value: string

  name: string
  title: string

  onSelect: () => void
}

export default function Radio({
  checked,
  value,
  name,
  title,
  onSelect
}: RadioProps) {
  return (
    <div
      class='
    flex gap-2
    hover:cursor-pointer
  '
      onClick={onSelect}
      data-checked={checked}
    >
      <input type='radio' name={name} value={value} checked={checked} />

      {title}
    </div>
  )
}
