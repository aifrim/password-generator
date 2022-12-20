import classNames from 'classnames'
import { createSignal } from 'solid-js'

type RadioProps = {
  checked: boolean
  value: string

  name: string
  title: string

  onSelect: () => void
}

export default function Radio({
  checked: propChecked,
  value,
  name,
  title,
  onSelect
}: RadioProps) {
  const [checked, setChecked] = createSignal(propChecked)

  const onClick = () => {
    setChecked(!checked())

    onSelect()
  }

  return (
    <div
      class={classNames('flex gap-2', 'hover:cursor-pointer')}
      onClick={onClick}
    >
      <input type='radio' name={name} value={value} checked={checked()} />

      {title}
    </div>
  )
}
