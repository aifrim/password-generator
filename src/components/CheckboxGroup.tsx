import { Accessor } from 'solid-js'
import Checkbox from './Checkbox'

type RadioGroupProps<TKey extends string> = {
  title?: string

  value: Partial<Record<TKey, boolean>>
  options: Accessor<{ title: string; key: TKey }[]>

  name: string

  onSelect: (key: TKey, value: boolean) => void
}

export default function RadioGroup<TKey extends string>({
  title,
  value,
  options,
  name,
  onSelect
}: RadioGroupProps<TKey>) {
  return (
    <div>
      {options().map(({ key, title }) => (
        <Checkbox
          checked={!!value[key]}
          title={title}
          onToggle={() => onSelect(key, !value[key])}
        />
      ))}
    </div>
  )
}
