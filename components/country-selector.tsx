import { Fragment, useMemo } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import map from 'lodash/map'

import { cx, extractCountryNumber, getFlagEmoji, sortObj } from '../lib/helpers'

type Props = {
  countryCodes: Record<string, string>
  selected: string
  setSelected: (s: string) => void
}
export default function NumberInput({
  selected,
  setSelected,
  countryCodes,
}: Props) {
  const allCodes = useMemo(
    () => sortObj(countryCodes),
    [countryCodes],
  ) as Record<string, string>

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative flex">
        <Listbox.Button className="relative p-2 text-lg bg-white dark:bg-transparent dark:border-green-200 dark:text-white border rounded shadow focused">
          {getFlagEmoji(selected)}{' '}
          <span className="">{extractCountryNumber(allCodes[selected])}</span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="focused absolute max-w-[300px] mt-1 overflow-auto bg-white dark:bg-gray-800 dark:text-white rounded shadow-xl max-h-60 sm:text-sm">
            {map(allCodes, (number: string, code) => (
              <Listbox.Option
                key={code}
                className={({ active }) =>
                  cx(
                    active
                      ? 'text-green-700 bg-gray-50 dark:bg-gray-900 dark:text-green-200'
                      : 'text-gray-800 dark:text-current',
                    'p-2',
                  )
                }
                value={code}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={cx(
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      )}
                    >
                      {code} {getFlagEmoji(code)} {extractCountryNumber(number)}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
