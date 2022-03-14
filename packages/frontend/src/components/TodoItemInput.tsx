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

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.currentTarget.value)
    clearResponseError()
  }

  return (
    <FormControl isInvalid={isError}>
      <FormLabel position="absolute" top="-8">
        {label}:
      </FormLabel>
      <Input
        id={`${name}-input`}
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={handleOnChange}
        onBlur={() => setTouched(true)}
        pattern="[a-z]{3,10}"
        required
        aria-describedby={isError ? `${name}-error` : undefined}
        focusBorderColor="brand.vividRed"
        borderRadius="0"
      />
      {isError ? (
        <FormErrorMessage position="absolute" top={12} color="brand.vividRed">
          {errorMessage}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  )
}
