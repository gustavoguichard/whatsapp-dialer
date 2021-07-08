import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import Head from 'next/head'

import CountrySelector from '../components/country-selector'
import DeleteSVG from '../components/delete-svg'
import DialPad from '../components/dial-pad'
import NumberInput from '../components/number-input'
import { extractCountryNumber } from '../lib/helpers'

type Props = {
  countryCodes: Record<string, string>
}
export default function Home({ countryCodes }: Props) {
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState<keyof typeof countryCodes>('BR')
  const handleSubmit: FormEventHandler = (ev) => {
    const code = extractCountryNumber(countryCodes[selected])
    ev.preventDefault()
    window.location.href = `https://wa.me/${code}${value}`
  }
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setValue(target.value.replaceAll(/\D/g, ''))
  }
  const addNumber = (number: number) => setValue((val) => `${val}${number}`)
  const handleErase = () => setValue((val) => val.slice(0, -1))
  return (
    <div className="flex items-end md:items-center justify-center min-h-screen bg-gray-50 md:bg-gray-200 dark:bg-gray-900 dark:md:bg-gray-800">
      <Head>
        <title>
          Whatsapp dialer - Dial and send messages without adding to your
          contacts
        </title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      <form
        className="flex flex-col justify-between flex-grow max-w-[380px] w-full h-screen max-h-[680px] md:h-auto md:dark:bg-gray-900 md:bg-gray-50 rounded md:shadow-lg dark:bg-transparent overflow-hidden dark:shadow-none"
        onSubmit={handleSubmit}
      >
        <fieldset className="p-2 flex items-stretch gap-1">
          <CountrySelector {...{ selected, setSelected, countryCodes }} />
          <NumberInput onChange={handleChange} value={value} />
        </fieldset>
        <DialPad onAdd={addNumber} />
        <div className="flex p-2 gap-2">
          <button
            className="bt focused text-xl font-bold p-2"
            type="button"
            onClick={handleErase}
            aria-label="Delete last number"
          >
            <DeleteSVG />
          </button>
          <button
            className="focused bg-primary text-white shadow rounded text-xl font-bold p-2 flex-grow"
            type="submit"
          >
            Go texting!
          </button>
        </div>
      </form>
    </div>
  )
}

export async function getStaticProps() {
  const codesResult = await fetch('http://country.io/phone.json')
  const countryCodes = await codesResult.json()
  return {
    props: { countryCodes },
  }
}
