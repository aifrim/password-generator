import { createSignal } from 'solid-js'

type CheckboxProps = {
  checked: boolean

  title: string

  onToggle: () => void
}

export default function Checkbox({
  checked: propChecked,
  title,
  onToggle
}: CheckboxProps) {
  const [checked, setChecked] = createSignal(propChecked)

  const onClick = () => {
    setChecked(!checked())

    onToggle()
  }

  return (
    <div
      class='
        flex gap-2
        hover:cursor-pointer
      '
      onClick={onClick}
    >
      <input type='checkbox' checked={checked()} />
      {title}
    </div>
  )
}
