import { Accessor, JSX } from 'solid-js'

type RangeProps = {
  value: Accessor<number>

  min: number
  max: number

  onChange: (newValue: number) => void
}

export default function Range({ value, min, max, onChange }: RangeProps) {
  const handleOnChange: JSX.EventHandlerUnion<HTMLInputElement, Event> = (
    e
  ) => {
    onChange(parseInt(e.currentTarget.value))
  }

  return (
    <div>
      <input
        type='range'
        value={value()}
        min={min}
        max={max}
        onChange={handleOnChange}
      />{' '}
      {value}
    </div>
  )
}
