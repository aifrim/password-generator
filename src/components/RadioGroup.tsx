import { Accessor, createEffect } from 'solid-js'
import Radio from '../components/Radio'

type RadioGroupProps<T extends string> = {
  title: string

  value: Accessor<T>
  values: { title: string; value: T }[]

  name: string

  onSelect: (value: T) => void
}

export default function RadioGroup<T extends string = string>({
  title,
  value,
  values,
  name,
  onSelect
}: RadioGroupProps<T>) {
  let typeGroup!: HTMLDivElement

  createEffect(() => {
    Array.from(
      typeGroup?.querySelectorAll<HTMLInputElement>(`[name='${name}']`)
    ).forEach((el) => {
      el.checked = el.attributes.getNamedItem('value')?.value === value()
    })
  })

  return (
    <div ref={typeGroup}>
      <h4 class='font-bold mb-1'>{title}</h4>

      {values?.map(({ value: v, title }) => (
        <Radio
          checked={value() === v}
          value={v}
          name={name}
          title={title}
          onSelect={() => onSelect(v)}
        />
      ))}
    </div>
  )
}
