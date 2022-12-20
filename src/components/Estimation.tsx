import { Accessor, createEffect, createSignal } from 'solid-js';
import zxcvbn from 'zxcvbn';

type EstimationProps = {
  password: Accessor<string>;
}

export default function Estimation({ password }: EstimationProps) {
  const [estimation, setEstimation] = createSignal(0);

  createEffect(() => {
    if (!password().length) { return }

    const zxcvbnEst = zxcvbn(password());
    setEstimation(zxcvbnEst.score * 100 / 4)
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


  return <div class='flex gap-2'>
    <div class={`min-h-[10px] ease-linear duration-200 grow rounded-md ${getColor(25)}`} />
    <div class={`min-h-[10px] ease-linear duration-200 grow rounded-md ${getColor(50)}`} />
    <div class={`min-h-[10px] ease-linear duration-200 grow rounded-md ${getColor(75)}`} />
    <div class={`min-h-[10px] ease-linear duration-200 grow rounded-md ${getColor(100)}`} />
  </div>
}