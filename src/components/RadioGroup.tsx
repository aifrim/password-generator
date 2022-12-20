import classNames from 'classnames'
import { Accessor, createEffect, Setter } from 'solid-js'
import Radio from '../components/Radio'

type RadioGroupProps<T extends string> = {
  name: string
  title?: string

  value: Accessor<T>
  options: { title: string; value: T }[]

  onSelect: Setter<T>
}

export default function CheckboxGroup<T extends string = string>({
  name,
  title,
  value,
  options,
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
      {title ? <h4 class={classNames('font-bold mb-1')}>{title}</h4> : null}

      {options?.map(({ value: v, title }) => (
        <Radio
          checked={value() === v}
          value={v}
          name={name}
          title={title}
          onSelect={() => onSelect(() => v)}
        />
      ))}
    </div>
  )
}
