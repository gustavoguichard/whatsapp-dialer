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
    <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-800">
      <Head>
        <title>
          Whatsapp dialer - Dial and send messages without adding to your
          contacts
        </title>
        <meta
          name="description"
          content="Dial and send messages in whatsapp without adding to your contacts"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-[360px] w-full shadow-lg rounded-lg bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <form className="flex flex-col" onSubmit={handleSubmit}>
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
      </main>
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
