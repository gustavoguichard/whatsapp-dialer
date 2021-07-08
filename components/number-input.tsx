import { ChangeEventHandler } from 'react'

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string
}
export default function NumberInput({ onChange, value }: Props) {
  return (
    <input
      className="focused flex-grow rounded p-3 text-2xl shadow-inner border dark:bg-transparent dark:text-white dark:border-green-200"
      type="text"
      value={value}
      onChange={onChange}
    />
  )
}
