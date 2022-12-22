import classNames from 'classnames'
import { createEffect, createSignal, Resource } from 'solid-js'
import zxcvbn from 'zxcvbn'

type EstimationProps = {
  password: Resource<string>
}

export default function Estimation({ password }: EstimationProps) {
  const [estimation, setEstimation] = createSignal(0)

  createEffect(() => {
    if (!password()?.length) {
      return
    }

    const zxcvbnEst = zxcvbn(password() || '')
    setEstimation((zxcvbnEst.score * 100) / 4)
  })

  const getColor = (wanted: number) => {
    if (estimation() < wanted) {
      return 'bg-slate-200'
    }

    if (estimation() <= 25) {
      return 'bg-red-400'
    } else if (estimation() <= 50) {
      return 'bg-amber-400'
    } else if (estimation() <= 75) {
      return 'bg-lime-400'
    } else {
      return 'bg-green-400'
    }
  }

  const genericClasses = classNames(
    'min-h-[10px]',
    'ease-linear duration-200',
    'grow rounded-md'
  )

  return (
    <div class='flex gap-2'>
      <div class={classNames(genericClasses, getColor(25))} />
      <div class={classNames(genericClasses, getColor(50))} />
      <div class={classNames(genericClasses, getColor(75))} />
      <div class={classNames(genericClasses, getColor(100))} />
    </div>
  )
}
