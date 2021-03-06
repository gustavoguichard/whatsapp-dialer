import { cx } from '../lib/helpers'

const PAD_NUMBERS = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]]

type Props = {
  onAdd: (n: number) => void
}

export default function DialPad({ onAdd }: Props) {
  return (
    <fieldset className="flex flex-col gap-4 xs:gap-6 p-3 items-center">
      {PAD_NUMBERS.map((sequence, idx) => (
        <div
          className="grid grid-cols-3 gap-4 xs:gap-6 text-2xl place-items-center"
          key={`seq-${idx}`}
        >
          {sequence.map((i) => (
            <button
              onClick={() => onAdd(i)}
              type="button"
              className={cx(
                'focused rounded-full shadow font-bold w-16 xs:w-20 h-16 xs:h-20 bt',
                i === 0 && 'col-start-2',
              )}
              key={i}
            >
              {i}
            </button>
          ))}
        </div>
      ))}
    </fieldset>
  )
}
