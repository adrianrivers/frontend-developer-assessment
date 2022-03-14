import React, { useState } from 'react'
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { getFieldError, getResponseError } from '../helpers/formValidation'

interface TodoItemInputProps {
  label: string
  name: string
  placeholder: string
  wasSubmitted: boolean
  responseError: string
  clearResponseError: () => void
}

export default function TodoItemInput({
  label,
  name,
  placeholder,
  wasSubmitted,
  responseError,
  clearResponseError,
}: TodoItemInputProps): React.ReactElement {
  const [value, setValue] = useState<string>('')
  const [touched, setTouched] = useState<boolean>(false)
  const isError =
    ((wasSubmitted || touched) && Boolean(getFieldError(value))) || Boolean(getResponseError(responseError))
  const errorMessage = getFieldError(value) || getResponseError(responseError)

  return (
    <FormControl isInvalid={isError} position="relative">
      <FormLabel position="absolute" top="-8">
        {label}:
      </FormLabel>
      <Input
        id={`${name}-input`}
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={(event) => {
          setValue(event.currentTarget.value), clearResponseError()
        }}
        onBlur={() => setTouched(true)}
        pattern="[a-z]{3,10}"
        required
        aria-describedby={isError ? `${name}-error` : undefined}
        focusBorderColor="brand.vividRed"
        borderRadius="0"
      />
      {isError ? (
        <FormErrorMessage position="absolute" bottom="-6" color="brand.vividRed">
          {errorMessage}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  )
}
