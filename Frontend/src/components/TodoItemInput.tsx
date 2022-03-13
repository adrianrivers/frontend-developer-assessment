import React, { useState } from 'react'
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { getFieldError } from '../helpers/getFieldError'

interface TodoItemInputProps {
  label: string
  name: string
  placeholder: string
  wasSubmitted: boolean
}

export default function TodoItemInput({ label, name, placeholder, wasSubmitted }: TodoItemInputProps) {
  const [value, setValue] = useState<string>('')
  const [touched, setTouched] = useState<boolean>(false)
  const isError = wasSubmitted || touched
  const errorMessage = getFieldError(value)

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
        onChange={(event) => setValue(event.currentTarget.value)}
        onBlur={() => setTouched(true)}
        pattern="[a-z]{3,10}"
        required
        aria-describedby={isError ? `${name}-error` : undefined}
        focusBorderColor="lime"
      />
      {isError ? (
        <FormErrorMessage position="absolute" bottom="-6">
          {errorMessage}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  )
}
