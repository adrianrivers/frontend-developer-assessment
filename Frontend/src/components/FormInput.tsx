import React, { useEffect } from 'react'
import { getFieldError } from '../helpers/getFieldError'

export default function FormInput({
  label,
  name,
  placeholder,
  wasSubmitted,
}: {
  label: string
  name: string
  placeholder: string
  wasSubmitted: boolean
}) {
  const [value, setValue] = React.useState<string>('')
  const [touched, setTouched] = React.useState<boolean>(false)
  const errorMessage = getFieldError(value)
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage

  return (
    <>
      <div className="relative">
        <label htmlFor={`${name}-input`}>{label}:</label>
        <input
          id={`${name}-input`}
          name={name}
          type="text"
          placeholder={placeholder}
          onChange={(event) => setValue(event.currentTarget.value)}
          onBlur={() => setTouched(true)}
          pattern="[a-z]{3,10}"
          required
          aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
        />
        {displayErrorMessage ? (
          <span role="alert" id={`${name}-error`}>
            <span>⚠️</span> {errorMessage}
          </span>
        ) : null}
      </div>
    </>
  )
}
