import React, { useState, FormEvent, useRef } from 'react'
import { Box, Button, HStack } from '@chakra-ui/react'
import TodoItemInput from './TodoItemInput'
import { getFieldError, getResponseError } from '../helpers/formValidation'

interface TodoItemFormProps {
  postTodoItem: (description: string | FormDataEntryValue) => void
  responseError: string
  clearResponseError: () => void
}

export default function TodoItemForm({
  postTodoItem,
  responseError,
  clearResponseError,
}: TodoItemFormProps): React.ReactElement {
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false)
  const form = useRef<HTMLFormElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fieldValues = Object.fromEntries(formData.entries())
    const formIsValid = Object.values(fieldValues).every(
      (value) => typeof value === 'string' && !getFieldError(value) && !getResponseError(responseError)
    )

    if (formIsValid) {
      postTodoItem(fieldValues.description)
      setWasSubmitted(true)
      form.current?.reset()
    }
  }

  return (
    <Box marginBottom={20} paddingX={6}>
      <form noValidate onSubmit={handleSubmit} ref={form}>
        <HStack justifyContent="space-between">
          <TodoItemInput
            label="Add todo item"
            name="description"
            placeholder="Description..."
            wasSubmitted={wasSubmitted}
            responseError={responseError}
            clearResponseError={clearResponseError}
          />
          <Button
            type="submit"
            color="white"
            background="brand.vividOrange"
            borderRadius={0}
            border="1px solid transparent"
            _hover={{
              background: 'transparent',
              color: 'brand.vividOrange',
              borderColor: 'brand.vividOrange',
            }}
          >
            Add item
          </Button>
        </HStack>
      </form>
    </Box>
  )
}
